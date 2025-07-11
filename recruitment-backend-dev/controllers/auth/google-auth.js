/**
 * @fileoverview Handles Google OAuth2 authentication using Passport.js
 * This controller manages user login via Gmail, handles session setup,
 * and user serialization/deserialization for Express sessions.
 *
 * Features:
 * - Google OAuth2 login using email and profile
 * - Integration with Passport.js
 * - Express session management using cookies
 *
 * @module authentication/googleAuthController
 */

import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../../model/User.js'; // Optional: Use if you want to store user in DB

// Configure Google OAuth2 strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
    try {
        // You can store or update the user in your DB here
        const email = profile.emails?.[0]?.value;
        const name = profile.displayName;

        let user = await User.findOne({ email });

        if (!user) {
            // Create new user if not exists
            user = await User.create({
                email,
                fullName: name,
                isEmailVerified: true,
                authProvider: 'google',
                googleId: profile.id
            });
        }

        return done(null, user);
    } catch (error) {
        console.error('Google Auth Error:', error);
        return done(error, null);
    }
}));

// Serialize user to session
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});
