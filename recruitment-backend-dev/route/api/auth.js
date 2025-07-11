/**
 * @fileoverview Authentication and authorization route configurations.
 * Handles user authentication, authorization, email verification,
 * password management, and role-based access control.
 * 
 * @author Golor Abraham AjiriOghene
 * @version 1.1.0
 * @module routes/auth
 */

import express from 'express';

// Middleware imports
import { 
    authenticateUser, 
    isAdmin, 
    isEmployer,
    validateRefreshToken
} from '../../middleware/authMiddleware.js';

/**
 * Authentication controller imports
 * @see {@link controllers/auth/register_controller}
 */
import {
    registerUser
} from '../../controllers/auth/register_controller.js';

/**
 * Email verification controller imports
 * @see {@link controllers/auth/send_verification_email_controller}
 */
import {
    sendVerificationEmail,
    verifyEmail,
    verified
} from '../../controllers/auth/send_verification_email_controller.js';

/**
 * Session management controller imports
 * @see {@link controllers/auth/login_controller}
 */
import {
    loginUser, 
    handleRefreshToken
} from '../../controllers/auth/login_controller.js';

/**
 * Logout controller imports
 * @see {@link controllers/auth/logout_controller}
 */
import {
    logoutUser
} from '../../controllers/auth/logout_controller.js';

/**
 * Password management controller imports
 * @see {@link controllers/auth/forgot_password_controller}
 */
import {
    forgotPassword,
    resetPassword,
    serveResetPasswordPage
} from '../../controllers/auth/forgot_password_controller.js';

import {
    changePassword
} from '../../controllers/auth/change_password_controller.js';

/**
 * User profile controller imports
 * @see {@link controllers/auth/get_user_profile_controller}
 */
import {
    getUserProfile
} from '../../controllers/auth/get_user_profile_controller.js';

/**
 * Employer jobs controller imports
 * @see {@link controllers/auth/get_employer_jobs_controller}
 */
import {
    getEmployerJobs
} from '../../controllers/auth/get_employer_jobs_controller.js';

/**
 * Admin dashboard controller imports
 * @see {@link controllers/auth/get_admin_dashboard_controller}
 */
import {
    getAdminDashboard
} from '../../controllers/auth/get_admin_dashboard_controller.js';

const router = express.Router();

/**
 * Public Authentication Routes
 * These endpoints don't require authentication tokens
 * @group Authentication - User registration and authentication operations
 */
router.post(
    '/register', 
    /**
     * Register a new user
     * @name POST /api/auth/register
     * @function
     * @memberof module:routes/auth
     * @inner
     * @param {string} first_Name - User's first name
     * @param {string} last_Name - User's last name
     * @param {string} email - User's email address
     * @param {string} password - User's password (min 8 chars)
     * @returns {Object} 201 - User created successfully
     * @throws {Error} 400 - Validation error
     */
    registerUser
);

/**
 * Authentication endpoints
 */
router.post('/login', 
    /**
     * User login endpoint
     * @name POST /api/auth/login
     * @function
     * @param {string} email - User's email
     * @param {string} password - User's password
     * @returns {Object} 200 - JWT tokens and user data
     * @throws {Error} 401 - Invalid credentials
     */
    loginUser
);

router.post('/logout',
    /**
     * User logout endpoint
     * @name POST /api/auth/logout
     * @function
     * @returns {Object} 200 - Logout success message
     */
    logoutUser
);

/**
 * Email Verification Routes
 * Handles the email verification workflow
 * @group Verification - Email verification operations
 */
router.post(
    '/send-verification-email',
    /**
     * Send verification email to user
     * @name POST /api/auth/send-verification-email
     * @function
     * @memberof module:routes/auth
     * @inner
     * @param {string} email - User's email address
     * @returns {Object} 200 - Email sent successfully
     * @throws {Error} 404 - User not found
     */
    sendVerificationEmail
);

router.get('/verify/:id/:uniqueString', verifyEmail);
router.get('/verified', verified);

/**
 * Password Management Routes
 * Handles password reset flow
 */
router.post('/forgot-password', forgotPassword);
router.get('/reset-password/:userId/:token', serveResetPasswordPage);
router.post('/reset-password/:userId/:token', resetPassword);

router.post(
    '/change-password', 
    authenticateUser,
    /**
     * Change authenticated user's password
     * 
     * @name POST /api/auth/change-password
     * @function
     * @memberof module:routes/auth
     * @inner
     * @requires authentication
     * @group Password - Password change for logged-in users
     * 
     * @param {string} currentPassword - The user's current password
     * @param {string} newPassword - The user's new desired password (min 8 chars)
     * 
     * @returns {Object} 200 - Password changed successfully
     * @throws {Error} 400 - Missing input fields
     * @throws {Error} 401 - Incorrect current password
     * @throws {Error} 404 - User not found
     * @throws {Error} 500 - Internal server error
     */
    changePassword
);

/**
 * Protected Routes
 * These endpoints require valid authentication tokens
 * @group Protected - Authenticated user operations
 */
router.get(
    '/profile',
    authenticateUser,
    /**
     * Get user profile
     * @name GET /api/auth/profile
     * @function
     * @memberof module:routes/auth
     * @inner
     * @requires authentication
     * @returns {Object} 200 - User profile data
     * @throws {Error} 401 - Unauthorized
     */
    getUserProfile
);

/**
 * Admin Routes
 * @group Admin - Administrative operations
 * @requires authentication
 * @requires admin role
 */
router.get('/admin/dashboard', 
    authenticateUser,
    isAdmin,
    /**
     * Get admin dashboard data
     * @name GET /api/auth/admin/dashboard
     * @function
     * @returns {Object} 200 - Dashboard statistics
     * @throws {Error} 403 - Not an admin
     */
    getAdminDashboard
);

/**
 * Employer Routes
 * @group Employer - Employer-specific operations
 * @requires authentication
 * @requires employer role
 */
router.get('/employer/jobs', 
    authenticateUser,
    isEmployer,
    /**
     * Get employer's job listings
     * @name GET /api/auth/employer/jobs
     * @function
     * @returns {Object} 200 - List of employer's jobs
     * @throws {Error} 403 - Not an employer
     */
    getEmployerJobs
);

/**
 * Token Management Routes
 * Handles JWT refresh operations
 * @group Tokens - Token refresh and management
 */
router.post(
    '/refresh-token',
    validateRefreshToken,
    /**
     * Refresh access token
     * @name POST /api/auth/refresh-token
     * @function
     * @memberof module:routes/auth
     * @inner
     * @param {string} refreshToken - Valid refresh token
     * @returns {Object} 200 - New access token
     * @throws {Error} 401 - Invalid refresh token
     */
    handleRefreshToken
);

export default router;