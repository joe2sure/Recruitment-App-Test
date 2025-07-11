/**
 * @fileoverview Authentication and authorization middleware implementations.
 * Provides JWT verification, role-based access control, and session management.
 * 
 * @module middleware/authentication
 * @requires jsonwebtoken
 * @requires bcryptjs
 * @requires ../model/User
 * 
 * @author Golor Abraham AjiriOghene
 * @version 1.1.1
 */

import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../model/User.js';

/**
 * @typedef {Object} AuthError
 * @property {boolean} success - Indicates if the operation was successful
 * @property {string} message - Human-readable error message
 */

/**
 * Standardized authentication error responses
 * @readonly
 * @enum {AuthError}
 */
const AUTH_ERRORS = {
    NO_TOKEN: {
        success: false,
        message: 'Access denied. Please login'
    },
    INVALID_TOKEN: {
        success: false,
        message: 'Invalid token'
    },
    USER_NOT_FOUND: {
        success: false,
        message: 'User not found'
    },
    CANDIDATE_NO_COMPLETE_PROFILE: {
        success: false,
        message: 'Candidate as not complete detail'
    },
    ADMIN_ONLY: {
        success: false,
        message: 'Access denied. Admin only'
    },
    EMPLOYER_ONLY: {
        success: false,
        message: 'Access denied. Employer only'
    },
    NO_REFRESH_TOKEN: {
        success: false,
        message: 'Refresh token required'
    },
    INVALID_REFRESH: {
        success: false,
        message: 'Invalid refresh token'
    }
};

/**
 * Verifies JWT and attaches user to request object
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Promise<void>}
 */
const authenticateUser = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json(AUTH_ERRORS.NO_TOKEN);
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId).select('-password');

        if (!user) {
            return res.status(401).json(AUTH_ERRORS.USER_NOT_FOUND);
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('Authentication error:', error);
        res.status(401).json(AUTH_ERRORS.INVALID_TOKEN);
    }
};


const authenticateCandidate = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json(AUTH_ERRORS.NO_TOKEN);
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId).select('-password');

        if (!user) {
            return res.status(401).json(AUTH_ERRORS.USER_NOT_FOUND);
        }

        if (user.profile_Completed == false) {
                 return res.status(401).json(AUTH_ERRORS.CANDIDATE_NO_COMPLETE_PROFILE); 
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('Authentication error:', error);
        res.status(401).json(AUTH_ERRORS.INVALID_TOKEN);
    }
};
/**
 * Verifies user has admin role
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Promise<void>}
 */
const isAdmin = async (req, res, next) => {

    try {
        const refreshToken = req.cookies.refreshToken;


        // if (!refreshToken) {
        //     return res.status(401).json(AUTH_ERRORS.NO_REFRESH_TOKEN);
        // }

        // First get user from access token
        const token = req.cookies.token;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find user with matching active session
        const user = await User.findOne({
            _id: decoded.userId,
            'activeSessions.expiresAt': { $gt: new Date() }
        }).select('+activeSessions');

        if (!user || !user.activeSessions?.length) {
            return res.status(401).json(AUTH_ERRORS.NO_REFRESH_TOKEN);
        }
        console.log(user.role);

        if (user.role !== "Admin") {
            return res.status(403).json(AUTH_ERRORS.ADMIN_ONLY);
        }
        // Find the most recent valid session
        const session = user.activeSessions
            .filter(s => s.expiresAt > new Date())
            .sort((a, b) => b.expiresAt - a.expiresAt)[0];

        if (!session) {
            return res.status(401).json(AUTH_ERRORS.NO_REFRESH_TOKEN);
        }

        const isValid = await bcrypt.compare(refreshToken, session.refreshToken);

        if (!isValid) {
            return res.status(401).json(AUTH_ERRORS.INVALID_REFRESH);
        }

        // Attach session to request for rotation
        req.session = session;

        // Generate new access token
        const newToken = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '15m' }
        );

        res.cookie('token', newToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 15 * 60 * 1000
        });

        req.user = user;
        next();
    } catch (error) {
        console.error('Token validation error:', error);
        res.status(401).json(AUTH_ERRORS.INVALID_REFRESH);
    }

};

/**
 * Employer role verification middleware
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Promise<void>}
 */
const isEmployer = async (req, res, next) => {
    if (req.user.role !== 'Employer') {
        return res.status(403).json(AUTH_ERRORS.EMPLOYER_ONLY);
    }
    next();
};

const isSuperAdmin = (req, res, next) => {
    if (req.admin.roleLevel !== 'SuperAdmin') {
        return res.status(403).json({ error: 'SuperAdmin access only' });
    }
    next();
};

/**
 * Validates refresh token and attaches user to request
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Promise<void>}
 */
const validateRefreshToken = async (req, res, next) => {
    try {
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            return res.status(401).json(AUTH_ERRORS.NO_REFRESH_TOKEN);
        }

        // First get user from access token
        const token = req.cookies.token;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find user with matching active session
        const user = await User.findOne({
            _id: decoded.userId,
            'activeSessions.expiresAt': { $gt: new Date() }
        }).select('+activeSessions');

        if (!user || !user.activeSessions?.length) {
            return res.status(401).json(AUTH_ERRORS.NO_REFRESH_TOKEN);
        }

        // Find the most recent valid session
        const session = user.activeSessions
            .filter(s => s.expiresAt > new Date())
            .sort((a, b) => b.expiresAt - a.expiresAt)[0];

        if (!session) {
            return res.status(401).json(AUTH_ERRORS.NO_REFRESH_TOKEN);
        }

        const isValid = await bcrypt.compare(refreshToken, session.refreshToken);

        if (!isValid) {
            return res.status(401).json(AUTH_ERRORS.INVALID_REFRESH);
        }

        // Attach session to request for rotation
        req.session = session;

        // Generate new access token
        const newToken = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '15m' }
        );

        res.cookie('token', newToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 15 * 60 * 1000
        });

        req.user = user;
        next();
    } catch (error) {
        console.error('Token validation error:', error);
        res.status(401).json(AUTH_ERRORS.INVALID_REFRESH);
    }
};

export {
    authenticateUser,
    isAdmin,
    isEmployer,
    validateRefreshToken,
    authenticateCandidate
};