/**
 * @fileoverview Email Verification System
 * 
 * Implements secure email verification workflow with token
 * generation, email delivery, and status verification.
 * Includes automatic cleanup of expired tokens.
 * 
 * Features:
 * - UUID-based verification tokens
 * - Secure token hashing
 * - Timed token expiration
 * - Email template system
 * 
 * Process Flow:
 * 1. Generate verification token
 * 2. Store hashed token
 * 3. Send verification email
 * 4. Verify token on click
 * 5. Update user status
 * 
 * @module authentication/emailVerification
 */

import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// Internal imports
import User from '../../model/User.js';
import UserVerification from '../../model/UserVerification.js';
import { sendEmail, TEMPLATES } from '../../config/emailService.js';

// Path configuration
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Initiates email verification process by generating secure
 * token and sending verification email with unique link.
 * @param {Object} params - User details
 * @param {string} params._id - User ID
 * @param {string} params.email - User email
 * @returns {Promise<Object>} Success status and message
 * @throws {Error} If email sending fails
 */
const sendVerificationEmail = async ({ _id, email }) => {
    try {
        const uniqueString = uuidv4();
        const hashedUniqueString = await bcrypt.hash(uniqueString, 10);

        await UserVerification.create({
            userId: _id,
            uniqueString: hashedUniqueString,
            expiresAt: new Date(Date.now() + 21600000) // 6 hours
        });

        const verificationUrl = `${process.env.BASE_URL}/api/auth/verify/${_id}/${uniqueString}`;

        await sendEmail({
            to: email,
            templateName: 'VERIFICATION',
            url: verificationUrl
        });

        return {
            success: true,
            message: "Verification email sent successfully"
        };
    } catch (error) {
        console.error('Verification email error:', error);
        throw error;
    }
};

/**
 * Validates email verification token and updates user status.
 * Handles token expiration and cleanup of used tokens.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
const verifyEmail = async (req, res) => {
    const { id, uniqueString } = req.params;

    try {
        const userVerification = await UserVerification.findOne({ userId: id });

        // Check if verification record exists
        if (!userVerification) {
            return res.redirect('/api/auth/verified?status=error&message=' + encodeURIComponent(
                "This verification link is invalid or has already been used."
            ));
        }

        // Check if link has expired
        const currentDate = new Date();
        const expiresAt = new Date(userVerification.expiresAt);

        if (currentDate > expiresAt) {
            await UserVerification.deleteOne({ userId: id });
            return res.redirect('/api/auth/verified?status=error&message=' + encodeURIComponent(
                "Your verification link has expired."
            ));
        }

        // Compare hashed strings
        const isValid = await bcrypt.compare(uniqueString, userVerification.uniqueString);

        if (!isValid) {
            return res.redirect('api/auth/verified?status=error&message=' + encodeURIComponent(
                "Invalid verification code."
            ));
        }

        // Check if user exists
        const user = await User.findById(id);
        if (!user) {
            return res.redirect('/api/auth/verified?status=error&message=' + encodeURIComponent(
                "User account not found."
            ));
        }

        // Check if already verified
        if (user.status === 'Approved') {
            await UserVerification.deleteOne({ userId: id });
            return res.redirect('/api/auth/verified?status=error&message=' + encodeURIComponent(
                "Email already verified."
            ));
        }

        await User.updateOne({ _id: id }, {
            status: 'Approved',
            isEmailVerified: true
        });

        const deleteResult = await UserVerification.deleteOne({ userId: id });

        if (deleteResult.deletedCount === 1) {
            return res.redirect('/api/auth/verified?status=success&message=' + encodeURIComponent(
                "Your email has been successfully verified!"
            ));
        } else {
            throw new Error('Verification record not found');
        }

    } catch (error) {
        console.error('Email verification error:', error);
        return res.redirect('/api/auth/verified?status=error&message=' + encodeURIComponent(
            "Verification failed."
        ));
    }
};

/**
 * Serves the email verification result page
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
const verified = async (req, res) => {
    try {
        // Get verification success template
        const template = TEMPLATES.VERIFICATION_SUCCESS;
        
        // Render template with base URL
        const html = template.template(process.env.BASE_URL);
        
        // Send response
        res.send(html);
    } catch (error) {
        console.error('Error serving verification page:', error);
        res.status(500).send('Error loading verification page');
    }
};

export { 
    sendVerificationEmail, 
    verifyEmail, 
    verified
};