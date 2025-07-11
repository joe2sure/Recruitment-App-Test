/**
 * @fileoverview Secure User Profile Management System
 * 
 * Handles authenticated user profile data retrieval with proper data
 * sanitization and security measures. Ensures sensitive information
 * is filtered before sending responses.
 * 
 * Features:
 * - Secure profile data retrieval
 * - Automatic data sanitization
 * - Session-based authentication
 * - Password field exclusion
 * 
 * Security:
 * - Uses authentication middleware
 * - Filters sensitive data
 * - Validates user session
 * - Proper error handling
 * 
 * @module authentication/userProfile
 */

/**
 * Securely retrieves authenticated user profile data.
 * Filters sensitive information and returns only necessary
 * user details for client consumption. Relies on prior
 * authentication middleware for user validation.
 */
const getUserProfile = async (req, res) => {
    try {
        // req.user is now set by authenticateUser middleware
        const { password, ...filteredUser } = req.user; // Exclude sensitive data
        res.status(200).json({
            success: true,
            data: filteredUser
        });
    } catch (error) {
        console.error('Get Auth User error:', error);
        res.status(500).json({
            success: false,
            message: "Error fetching user",
            error: error.message
        });
    }
};

export {
    getUserProfile
};