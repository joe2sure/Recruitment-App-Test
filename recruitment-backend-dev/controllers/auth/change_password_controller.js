/**
 * @fileoverview Handles password change functionality for authenticated users
 * 
 * Features:
 * - Current password verification
 * - Secure password update using bcrypt
 * - Safe error responses
 * 
 * @module authentication/changePasswordController
 * @requires bcryptjs
 */
import bcrypt from 'bcryptjs'; 
import User from '../../model/User.js'; 
import xss from 'xss'

/**
 * Changes the password for an authenticated user
 * @param {Object} req - Express request object (user must be authenticated)
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
const changePassword = async (req, res) => {
    try {
        const userId = req.user.id 
        const currentPassword = req.body.currentPassword;
        const newPassword = req.body.newPassword;  

        if (!currentPassword || !newPassword){
            return res.status(400).json({
                success: false, 
                message: "Both current and new passwords are required" 
            }); 
        }

        const user = await User.findById(userId).select('+password'); 
        if (!user){
            return res.status(404).json({
                success: false, 
                message: "User not found"
            });
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password); 
        if (!isMatch){
            return res.status(401).json({
                success: false, 
                message: "Current password is incorrect"
            }); 
        }

        const salt = await bcrypt.genSalt(10); 
        const hashedPassword = await bcrypt.hash(newPassword, salt); 

        user.password = hashedPassword; 
        await user.save(); 

        res.status(200).json({
            success: true, 
            message: "Password changed successfully"
        });
    } catch (error) {
        console.log("Change password error:", error); 
        res.status(500).json({
            success: false, 
            message: "Error changing password", 
            error: process.env.NODE_ENV == 'development' ? error.message : undefined
        }); 
    }
}; 

export {changePassword}; 