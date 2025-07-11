/**
 * @fileoverview Handles new user registration with email verification
 * This controller manages user account creation with automatic
 * role assignment and email verification initiation.
 * 
 * Features:
 * - Duplicate email checking
 * - Password hashing
 * - Role assignment
 * - Email verification
 * - Initial session creation
 * 
 * Security measures:
 * - Password hashing with salt
 * - Email verification requirement
 * - Default role assignment
 * - Secure cookie configuration
 * 
 * @module authentication/registerController
 * @requires jsonwebtoken
 * @requires bcryptjs
 */

import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Internal imports
import User from '../../model/User.js';
import { sendVerificationEmail } from '../auth/send_verification_email_controller.js';

// Constants
const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
};

/**
 * Creates new user account and initiates email verification
 * Handles password hashing, role assignment, and sends
 * verification email to complete registration.
 */
const registerUser = async (req, res) => {
    try {
        const { first_Name, last_Name, middle_Name, email, phone_Number, password, role } = req.body;

        // Check if user already exists
        const duplicate_email = await User.findOne({ email });
        const duplicate_Phone_no = await User.findOne({ phone_Number});
        console.log(duplicate_Phone_no);
        
        if(duplicate_Phone_no)return  res.status(400).json({
                success: false,
                message: "User already exists with this phone number"
            });
        if (duplicate_email) {
            return res.status(400).json({
                success: false,
                message: "User already exists with this email"
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const user = await User.create({
            first_Name,
            last_Name,
            middle_Name,
            email,
            phone_Number,
            password: hashedPassword,
            role: role || 'Candidate' // Default to Candidate if no role specified
        });

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        // Set cookie
        res.cookie('token', token, COOKIE_OPTIONS);

        // Remove password from response
        const userResponse = user.toObject();
        delete userResponse.password;

        // Send verification email
        try {
            await sendVerificationEmail(userResponse);

            res.status(201).json({
                success: true,
                message: "User registered successfully. Please check your email for verification.",
                data: { user: userResponse }
            });
        } catch (error) {
            // If email sending fails, still create user but inform about email issue
            res.status(201).json({
                success: true,
                message: "User registered successfully but verification email could not be sent. Please contact support.",
                data: { user: userResponse }
            });
        }

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            success: false,
            message: "Error registering user",
            error: error.message
        });
    }
};

export { registerUser };
