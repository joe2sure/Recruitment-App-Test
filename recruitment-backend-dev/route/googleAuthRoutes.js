/**
 * @fileoverview Routes for Google Authentication
 * Manages routes for Google OAuth2 login, callback, and protected profile access.
 *
 * @module routes/googleAuthRoutes
 */

import express from 'express';
import passport from 'passport';

const router = express.Router();

// Step 1: Trigger Google login
router.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Step 2: Google redirects back to this route
router.get('/auth/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/login',
        successRedirect: '/profile' // Or send a token here for frontend auth
    })
);

// Protected route
router.get('/profile', (req, res) => {
    if (!req.user) return res.redirect('/auth/google');
    res.status(200).json({
        success: true,
        message: `Welcome ${req.user.fullName || req.user.email}`,
        email: req.user.email,
        provider: req.user.authProvider
    });
});

export default router;
