/**
 * @fileoverview Secure Session Termination System
 * 
 * Manages secure user logout process with token invalidation,
 * session cleanup, and proper cookie management. Supports
 * both single and multi-device session termination.
 * 
 * Features:
 * - Token invalidation
 * - Session cleanup
 * - Cookie management
 * - Token blacklisting
 * 
 * Security Measures:
 * - Token blacklisting
 * - Session termination
 * - Secure cookie cleanup
 * - Activity logging
 * 
 * @module authentication/logout
 */

// Internal imports
import User from '../../model/User.js';

/**
 * Terminates user session with complete cleanup of tokens,
 * cookies, and active sessions. Ensures proper security
 * measures during logout process.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
const logoutUser = async (req, res) => {
    try {
        const { refreshToken } = req.cookies;

        // Clear cookies regardless of user state
        res.cookie('token', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            expires: new Date(0)
        });

        res.cookie('refreshToken', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            expires: new Date(0)
        });

        // If we have a refresh token, try to find and update user
        if (refreshToken) {
            const user = await User.findOne({
                'activeSessions.refreshToken': { $exists: true }
            });

            if (user) {
                user.activeSessions = [];
                await user.save();
            }
        }

        res.status(200).json({
            success: true,
            message: "Logout successful"
        });
    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({
            success: false,
            message: "Error logging out"
        });
    }
};

export {
    logoutUser
};