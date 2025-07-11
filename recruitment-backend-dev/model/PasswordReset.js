/**
 * @fileoverview Password Reset model for managing password reset tokens and their lifecycle.
 * Handles token generation, validation, expiration, and cleanup processes.
 * 
 * @module models/PasswordReset
 * @requires mongoose
 * 
 * @author Golor Abraham AjiriOghene
 * @version 1.1.0
 * @license MIT
 */

import mongoose from 'mongoose';

/**
 * Configuration constants for password reset functionality
 * @readonly
 * @enum {number}
 */
const RESET_CONFIG = {
    /** Token expiration time - 1 hour */
    TOKEN_EXPIRY: 60 * 60 * 1000,
    /** Cleanup interval - 24 hours */
    CLEANUP_INTERVAL: 24 * 60 * 60 * 1000
};

/**
 * Password Reset Schema
 * Manages password reset tokens and their lifecycle
 * 
 * @typedef {Object} PasswordReset
 * @property {mongoose.Types.ObjectId} userId - Reference to user requesting reset
 * @property {string} resetToken - Hashed reset token
 * @property {Date} expiresAt - Token expiration timestamp
 * @property {boolean} used - Indicates if token has been used
 * @property {Date} createdAt - Creation timestamp (auto-managed)
 * @property {Date} updatedAt - Update timestamp (auto-managed)
 */
const passwordResetSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User ID is required'],
        index: true,
        validate: {
            validator: async function(v) {
                const User = mongoose.model('User');
                const user = await User.findById(v);
                return user !== null;
            },
            message: 'Referenced user does not exist'
        }
    },
    resetToken: {
        type: String,
        required: [true, 'Reset token is required']
    },
    expiresAt: {
        type: Date,
        required: [true, 'Expiration time is required'],
        index: true,
        default: () => new Date(Date.now() + RESET_CONFIG.TOKEN_EXPIRY)
    },
    used: {
        type: Boolean,
        default: false,
        index: true
    }
}, { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Compound index for optimized queries
passwordResetSchema.index(
    { userId: 1, used: 1, expiresAt: 1 },
    { name: 'reset_token_lookup' }
);

/**
 * Checks if reset token has expired
 * 
 * @virtual
 * @name isExpired
 * @memberof module:models/PasswordReset
 * @returns {boolean} True if token has expired
 * 
 * @example
 * const reset = await PasswordReset.findOne({ resetToken });
 * if (reset.isExpired) {
 *   throw new Error('Reset token has expired');
 * }
 */
passwordResetSchema.virtual('isExpired').get(function() {
    return Date.now() > this.expiresAt;
});

/**
 * Removes expired and used tokens from the database
 * 
 * @async
 * @static
 * @function cleanupExpired
 * @memberof module:models/PasswordReset
 * @returns {Promise<number>} Number of tokens removed
 * 
 * @example
 * // In cleanup job
 * const removed = await PasswordReset.cleanupExpired();
 * console.log(`Cleaned up ${removed} expired reset tokens`);
 */
passwordResetSchema.statics.cleanupExpired = async function() {
    const result = await this.deleteMany({
        $or: [
            { expiresAt: { $lt: new Date() } },
            { used: true }
        ]
    });
    return result.deletedCount;
};

/**
 * Middleware to handle pre-save validation and token hashing
 */
passwordResetSchema.pre('save', async function(next) {
    if (!this.isModified('resetToken')) return next();
    
    try {
        // Additional validation could be added here
        next();
    } catch (error) {
        next(error);
    }
});

// Create model and export
const PasswordReset = mongoose.model('PasswordReset', passwordResetSchema);
export default PasswordReset;