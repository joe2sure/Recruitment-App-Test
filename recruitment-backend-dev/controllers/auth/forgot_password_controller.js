/**
 * @fileoverview Manages password reset functionality with secure token handling
 * This controller handles the complete password reset flow including
 * token generation, email delivery, and password updates.
 * 
 * Features:
 * - Secure reset token generation
 * - Previous token invalidation
 * - Email notification
 * - Token expiration (1 hour)
 * - Reset page serving
 * 
 * Security measures:
 * - Token hashing
 * - Limited token lifetime
 * - One-time use tokens
 * - Safe error messages
 * 
 * @module authentication/forgotPasswordController
 * @requires bcryptjs
 * @requires crypto
 */

import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// Internal imports
import User from '../../model/User.js';
import PasswordReset from '../../model/PasswordReset.js';
import { sendEmail } from '../../config/emailService.js';
// Path configuration
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Initiates password reset by generating and sending reset token
 * Creates a time-limited reset token and sends it via email,
 * invalidating any existing unused tokens.
 */
const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required"
            });
        }

        const user = await User.findOne({ email });
        const resetToken = crypto.randomBytes(32).toString('hex');
        const hashedToken = await bcrypt.hash(resetToken, 10);

        if (user) {
            await PasswordReset.updateMany(
                { userId: user._id, used: false },
                { used: true }
            );

            await PasswordReset.create({
                userId: user._id,
                resetToken: hashedToken,
                expiresAt: new Date(Date.now() + 3600000), // 1 hour
                createdAt: new Date()
            });

            const resetUrl = `${process.env.BASE_URL}/api/auth/reset-password/${user._id}/${resetToken}`;

            await sendEmail({
                to: email,
                templateName: 'PASSWORD_RESET',
                url: resetUrl
            });
        }

        return res.status(200).json({
            success: true,
            message: "If an account exists with this email, password reset instructions will be sent."
        });

    } catch (error) {
        console.error('Password reset error:', error);
        return res.status(500).json({
            success: false,
            message: "Error processing password reset request",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

/**
 * Processes password reset request
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
const resetPassword = async (req, res) => {
    try {
        const { userId, token } = req.params;
        const { password } = req.body;

        console.log('Reset attempt:', {
            userId,
            tokenLength: token.length
        });

        // Find the most recent reset record
        const passwordReset = await PasswordReset.findOne({ 
            userId,
            used: false,
            expiresAt: { $gt: new Date() }
        }).sort({ createdAt: -1 });  // Add this sort

        console.log('Found reset record:', passwordReset ? {
            id: passwordReset._id,
            expiresAt: passwordReset.expiresAt,
            used: passwordReset.used
        } : 'No record found');

        if (!passwordReset) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired reset link"
            });
        }

        // Verify token
        const isValid = await bcrypt.compare(token, passwordReset.resetToken);
        if (!isValid) {
            return res.status(400).json({
                success: false,
                message: "Invalid reset token"
            });
        }

        // Update password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        await User.updateOne(
            { _id: userId },
            { password: hashedPassword }
        );

        // Mark reset token as used
        await PasswordReset.updateOne(
            { _id: passwordReset._id },
            { used: true }
        );

        res.status(200).json({
            success: true,
            message: "Password reset successful"
        });

    } catch (error) {
        console.error('Reset password error:', error);
        res.status(500).json({
            success: false,
            message: "Error resetting password",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

/**
 * Serves password reset page
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
const serveResetPasswordPage = async (req, res) => {
    try {
        const { userId, token } = req.params;
        
        // Find reset record
        const passwordReset = await PasswordReset.findOne({ 
            userId,
            used: false,
            expiresAt: { $gt: new Date() }
        });

        if (!passwordReset) {
            return res.redirect('/verified?status=error&message=' + encodeURIComponent(
                "This password reset link is invalid or has expired."
            ));
        }

        // Verify token exists
        const isValid = await bcrypt.compare(token, passwordReset.resetToken);
        if (!isValid) {
            return res.redirect('/verified?status=error&message=' + encodeURIComponent(
                "Invalid reset token."
            ));
        }

        // If valid, serve the reset password page
        const filePath = path.join(__dirname, '..', '..', 'views', 'reset-password.html');
        if (!fs.existsSync(filePath)) {
            console.error('Reset password page not found at:', filePath);
            return res.status(404).send('Reset password page not found');
        }
        
        res.sendFile(filePath);
        
    } catch (error) {
        console.error('Error serving reset password page:', error);
        return res.redirect('/verified?status=error&message=' + encodeURIComponent(
            "Error loading reset password page. Please try again."
        ));
    }
};

export {
    forgotPassword, 
    resetPassword,
    serveResetPasswordPage
};
