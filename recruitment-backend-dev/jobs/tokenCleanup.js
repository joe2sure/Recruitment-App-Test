/**
 * @fileoverview Scheduled job to clean up expired tokens and sessions.
 * Handles cleanup of expired sessions, blacklisted tokens, password reset tokens,
 * and email verification tokens to maintain database efficiency.
 * 
 * @module jobs/tokenCleanup
 * @requires ../model/User
 * @requires ../model/PasswordReset
 * @requires ../model/UserVerification
 * 
 * @author Golor Abraham AjiriOghene
 * @version 1.1.0
 * @license MIT
 */

import User from '../model/User.js';
import PasswordReset from '../model/PasswordReset.js';
import UserVerification from '../model/UserVerification.js';

/**
 * Configuration for cleanup operations
 * @readonly
 * @enum {Object}
 */
const CLEANUP_CONFIG = {
    /** Maximum batch size for cleanup operations */
    BATCH_SIZE: 1000,
    /** Timeout for cleanup operations in milliseconds */
    TIMEOUT: 30000
};

/**
 * Cleans up expired tokens and sessions across all authentication-related collections
 * 
 * @async
 * @function cleanupTokens
 * @throws {Error} If database operations fail
 * @returns {Promise<void>}
 * 
 * @example
 * // In a scheduled job
 * try {
 *   await cleanupTokens();
 *   console.log('Cleanup successful');
 * } catch (error) {
 *   console.error('Cleanup failed:', error);
 * }
 */
export const cleanupTokens = async () => {
    const startTime = Date.now();
    const now = new Date();
    
    try {
        // Clean up expired sessions and blacklisted tokens
        const userCleanup = await User.updateMany(
            {
                $or: [
                    { 'activeSessions.expiresAt': { $lt: now } },
                    { 'tokenBlacklist.expiresAt': { $lt: now } }
                ]
            },
            {
                $pull: {
                    activeSessions: { expiresAt: { $lt: now } },
                    tokenBlacklist: { expiresAt: { $lt: now } }
                }
            },
            { 
                maxTimeMS: CLEANUP_CONFIG.TIMEOUT,
                writeConcern: { w: 'majority' }
            }
        );

        // Clean up expired password reset tokens
        const passwordResetCleanup = await PasswordReset.deleteMany(
            {
                $or: [
                    { expiresAt: { $lt: now } },
                    { used: true }
                ]
            },
            { maxTimeMS: CLEANUP_CONFIG.TIMEOUT }
        );

        // Clean up expired verification tokens
        const verificationCleanup = await UserVerification.deleteMany(
            { expiresAt: { $lt: now } },
            { maxTimeMS: CLEANUP_CONFIG.TIMEOUT }
        );

        const duration = Date.now() - startTime;
        console.log('Token cleanup completed:', {
            duration: `${duration}ms`,
            usersUpdated: userCleanup.modifiedCount,
            resetTokensRemoved: passwordResetCleanup.deletedCount,
            verificationTokensRemoved: verificationCleanup.deletedCount,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('Token cleanup error:', {
            error: error.message,
            stack: error.stack,
            timestamp: new Date().toISOString()
        });
        throw error; // Re-throw for handling by job scheduler
    }
};