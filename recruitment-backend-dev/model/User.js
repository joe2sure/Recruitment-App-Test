

import mongoose from 'mongoose';
import fetchTime from "../config/fetchtime.js";
import bcrypt from 'bcryptjs';



/**
 * @typedef {Object} SessionOptions
 * @property {number} REFRESH_TOKEN_EXPIRY - Refresh token expiration in ms
 * @property {number} BLACKLIST_EXPIRY - Token blacklist expiration in ms
 */
const SESSION_OPTIONS = {
    REFRESH_TOKEN_EXPIRY: 7 * 24 * 60 * 60 * 1000, // 7 days
    BLACKLIST_EXPIRY: 15 * 60 * 1000 // 15 minutes
};

/**
 * Session Schema
 * @typedef {Object} Session
 * @property {string} refreshToken - Refresh token for the session
 * @property {string} deviceInfo - Information about the device
 * @property {Date} lastUsed - Last used timestamp
 * @property {Date} expiresAt - Expiration timestamp
 */
const sessionSchema = new mongoose.Schema({
    refreshToken: {
        type: String,
        required: true
    },
    deviceInfo: String,
    expiresAt: {
        type: Date,
        required: true,
        index: true
    },
    lastUsed: {
        type: Date,
        default: Date.now
    }
});

/**
 * User Schema
 * @typedef {Object} User
 * @property {string} first_Name - User's first name
 * @property {string} last_Name - User's last name
 * @property {string} [middle_Name] - User's middle name (optional)
 * @property {string} email - User's email address (unique)
 * @property {string} [phone_Number] - User's phone number (optional)
 * @property {string} password - Hashed password
 * @property {('local'|'google')} authProvider - Authentication provider
 * @property {('Candidate'|'Employer'|'Admin')} role - User role
 * @property {('Pending'|'Approved'|'Rejected')} status - Account status
 * @property {boolean} isEmailVerified - Email verification status
 * @property {boolean} isActive - Account active status
 * @property {Date} lastLogin - Last login timestamp
 * @property {Date} createdAt - Account creation timestamp
 * @property {Date} updatedAt - Last update timestamp
 * @property {Array<Session>} activeSessions - Active sessions with refresh tokens and device info
 * @property {Array<Object>} tokenBlacklist - Blacklisted tokens
 */
const userSchema = new mongoose.Schema({
    first_Name: {
        type: String,
        required: [true, 'First name is required'],
        trim: true
    },
    last_Name: {
        type: String,
        required: [true, 'Last name is required'],
        trim: true
    },
    middle_Name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    phone_Number: {
        type: String,
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    authProvider: {
        type: String,
        enum: ['local', 'google'],
        default: 'local',
        index: true
    },
    role: {
        type: String,
        enum: ['Candidate', 'Employer', 'Admin'],
        default: 'Candidate',
        index: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending',
        index: true
    },
    isEmailVerified: {
        type: Boolean,
        default: false,
        index: true
    },
    isActive: {
        type: Boolean,
        default: true,
        index: true
    },
    lastLogin: {
        type: Date,
        default: null
    },
    activeSessions: [sessionSchema],
    tokenBlacklist: [{
        token: String,
        expiresAt: Date
    }],

}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Indexes for common queries
userSchema.index({ email: 1, authProvider: 1 });
userSchema.index({ role: 1, status: 1, isActive: 1 });

/**
 * Updates last login timestamp
 * @returns {Promise<void>}
 */
userSchema.pre('save', async function (next) {
    if (this.isModified('lastLogin')) {
        this.lastLogin = await fetchTime();
    }
    next();
});

/**
 * Get user's full name
 * @returns {string} Full name including middle name if present
 */
userSchema.virtual('fullName').get(function () {
    if (this.middle_Name) {
        return `${this.first_Name} ${this.middle_Name} ${this.last_Name}`;
    }
    return `${this.first_Name} ${this.last_Name}`;
});

/**
 * Check if user is an admin
 * @returns {boolean}
 */
userSchema.virtual('isAdmin').get(function () {
    return this.role === 'Admin';
});

/**
 * Check if user is an employer
 * @returns {boolean}
 */
userSchema.virtual('isEmployer').get(function () {
    return this.role === 'Employer';
});

/**
 * Adds refresh token session with device info
 * @param {string} refreshToken - Refresh token to add
 * @param {string} deviceInfo - Information about the device
 * @returns {Promise<void>}
 */
userSchema.methods.addSession = async function (refreshToken, deviceInfo) {
    try {
        const hashedToken = await bcrypt.hash(refreshToken, 10);

        const newSession = {
            refreshToken: hashedToken,
            deviceInfo,
            expiresAt: new Date(Date.now() + SESSION_OPTIONS.REFRESH_TOKEN_EXPIRY)
        };

        // Add to existing sessions (or create new array)
        this.activeSessions = [...(this.activeSessions || []), newSession];
        this.lastLogin = new Date();

        await this.save();
    } catch (error) {
        console.error('Session update error:', error);
        throw error;
    }
};

/**
 * Remove a session
 * @param {string} refreshToken - Refresh token to remove
 * @returns {Promise<void>}
 */
userSchema.methods.removeSession = async function (refreshToken) {
    for (let session of this.activeSessions) {
        if (await bcrypt.compare(refreshToken, session.refreshToken)) {
            this.activeSessions = this.activeSessions.filter(s => s !== session);
            break;
        }
    }
    await this.save();
};

/**
 * Validate refresh token
 * @param {string} refreshToken - Refresh token to validate
 * @returns {Promise<boolean>} True if the token is valid, false otherwise
 */
userSchema.methods.validateRefreshToken = async function (refreshToken) {
    try {
        // Get fresh user data with sessions
        const freshUser = await this.constructor.findById(this._id)
            .select('+activeSessions');

        if (!freshUser?.activeSessions?.length) {
            return false;
        }

        // Find the most recent valid session
        const session = freshUser.activeSessions
            .filter(s => s.expiresAt > new Date())
            .sort((a, b) => b.expiresAt - a.expiresAt)[0];

        if (!session) {
            return false;
        }

        const isValid = await bcrypt.compare(refreshToken, session.refreshToken);

        if (isValid) {
            session.lastUsed = new Date();
            await freshUser.save();
            this.activeSessions = freshUser.activeSessions;
        }

        return isValid;
    } catch (error) {
        console.error('Token validation error:', error);
        return false;
    }
};

/**
 * Blacklist a token
 * @param {string} token - Token to blacklist
 * @returns {Promise<void>}
 */
userSchema.methods.blacklistToken = async function (token) {
    if (!token) return;

    const hashedToken = await bcrypt.hash(token, 10);
    this.tokenBlacklist.push({
        token: hashedToken,
        expiresAt: new Date(Date.now() + SESSION_OPTIONS.BLACKLIST_EXPIRY)
    });

    await this.save();
};

// const truoble = async () => {
//    console.log(await User.find({}).exec()); 
// }
// truoble();

export default mongoose.model('User', userSchema);

;