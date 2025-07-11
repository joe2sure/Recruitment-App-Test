/**
 * @fileoverview Email verification token management implementation.
 * Handles verification token generation, validation, and cleanup.
 * 
 * @module models/UserVerification
 * @requires mongoose
 * 
 * @author Golor Abraham AjiriOghene
 * @version 1.1.0
 * @license MIT
 */

import mongoose from 'mongoose';

/**
 * @typedef {Object} VerificationOptions
 * @property {number} TOKEN_EXPIRY - Token expiration time in ms
 * @property {number} CLEANUP_INTERVAL - Cleanup interval in ms
 */
const VERIFICATION_OPTIONS = {
    TOKEN_EXPIRY: 6 * 60 * 60 * 1000, // 6 hours
    CLEANUP_INTERVAL: 24 * 60 * 60 * 1000 // 24 hours
};

/**
 * User Verification Schema
 * @typedef {Object} UserVerification
 * @property {mongoose.Types.ObjectId} userId - Reference to the user being verified
 * @property {string} uniqueString - Hashed verification token
 * @property {Date} createdAt - Creation timestamp
 * @property {Date} expiresAt - Verification expiration timestamp
 */
const userVerificationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    uniqueString: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        index: true
    },
    expiresAt: {
        type: Date,
        required: true,
        index: true
    }
}, {
    timestamps: true
});

// Add compound index for common queries
userVerificationSchema.index({ userId: 1, expiresAt: 1 });

/**
 * Check if verification token has expired
 * @returns {boolean} True if token has expired
 */
userVerificationSchema.virtual('isExpired').get(function() {
    return Date.now() > this.expiresAt;
});

/**
 * Removes expired verification tokens
 * 
 * @async
 * @static
 * @function cleanupExpired
 * @returns {Promise<number>} Number of removed tokens
 * 
 * @example
 * // Cleanup in scheduled job
 * const removed = await UserVerification.cleanupExpired();
 * console.log(`Removed ${removed} expired tokens`);
 */
userVerificationSchema.statics.cleanupExpired = async function() {
    const result = await this.deleteMany({
        expiresAt: { $lt: new Date() }
    });
    return result.deletedCount;
};

// Pre-save middleware to ensure expiresAt is set
userVerificationSchema.pre('save', function(next) {
    if (!this.expiresAt) {
        // Default expiration: 6 hours from creation
        this.expiresAt = new Date(Date.now() + VERIFICATION_OPTIONS.TOKEN_EXPIRY);
    }
    next();
});

export default mongoose.model('UserVerification', userVerificationSchema);

