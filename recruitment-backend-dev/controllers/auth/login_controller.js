/**
 * @fileoverview Manages user authentication and session handling with refresh token support
 * This controller handles user login, token generation, and session management.
 * It implements a two-token system (access + refresh) for enhanced security.
 * 
 * Features:
 * - Secure password verification
 * - Access token (15m) and Refresh token (7d) generation
 * - Device tracking for multi-device support
 * - Last login timestamp updates
 * - Session management with device info
 * 
 * Security measures:
 * - HTTP-only cookies
 * - Secure cookie flags in production
 * - Same-site cookie policy
 * - Token rotation on refresh
 * 
 * @module authentication/loginController
 * @requires jsonwebtoken
 * @requires bcryptjs
 * @requires crypto
 */

import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

// Internal imports
import User from '../../model/User.js';

/**
 * Authenticates user credentials and establishes a new session
 * Creates both access and refresh tokens, updates last login,
 * and tracks device information for session management.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password || password === 'null') {
            return res.status(400).json({
                success: false,
                message: 'Email and password are required'
            });
        }

        const user = await User.findOne({ email }).select('+password +activeSessions');
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'This email is not registered.'
            });
        }

        if (!(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({
                success: false,
                message: 'Password is incorrect'
            });
        }

        if (!user.isEmailVerified) {
            return res.status(401).json({
                success: false,
                message: 'Email not verified'
            });
        }

        if (!user.isActive) {
            return res.status(401).json({
                success: false,
                message: 'Account is inactive'
            });
        }

        // Generate refresh token
        const refreshToken = crypto.randomBytes(40).toString('hex');

        // Enforce max 3 device logins
        if (user.activeSessions.length >= 3) {
            // Sort by lastUsed ascending and remove the oldest
            user.activeSessions.sort((a, b) => new Date(a.lastUsed) - new Date(b.lastUsed));
            user.activeSessions.shift();
        }

        // Add new session
        await user.addSession(refreshToken, req.get('User-Agent') || 'Unknown');

        // Save user updates (including lastLogin)
        user.lastLogin = new Date();
        await user.save();

        // Set cookies
        const accessToken = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '15m' }
        );

        res.cookie('token', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
            maxAge: 15 * 60 * 1000
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.status(200).json({
            success: true,
            message: `${user._id} Logged in successfully`,
            data: user,
            message: 'Logged in successfully'
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ success: false, message: 'Login failed' });
    }
};

/**
 * Rotates tokens by generating new access and refresh tokens
 * Implements token rotation security pattern by invalidating
 * old tokens and creating new ones with each refresh.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
const handleRefreshToken = async (req, res) => {
    try {
        const user = req.user;
        const oldSession = req.session;

        // Generate new tokens
        const accessToken = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '15m' }
        );

        const refreshToken = crypto.randomBytes(40).toString('hex');

        // Remove old session
        user.activeSessions = user.activeSessions.filter(
            session => session._id.toString() !== oldSession._id.toString()
        );

        // Ensure max of 3 sessions
        if (user.activeSessions.length >= 3) {
            // Sort sessions by lastUsed (oldest first) and remove the oldest
            user.activeSessions.sort((a, b) => new Date(a.lastUsed) - new Date(b.lastUsed));
            user.activeSessions.shift(); // Remove the oldest session
        }

        // Add new session
        await user.addSession(refreshToken, req.get('User-Agent') || 'Unknown Device');
        await user.save();

        // Set cookies
        res.cookie('token', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
            maxAge: 15 * 60 * 1000 // 15 minutes
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        res.status(200).json({
            success: true,
            message: 'Tokens refreshed successfully'
        });
    } catch (error) {
        console.error('Token refresh error:', error);
        res.status(500).json({
            success: false,
            message: 'Error refreshing tokens'
        });
    }
};

export {
    loginUser,
    handleRefreshToken
};