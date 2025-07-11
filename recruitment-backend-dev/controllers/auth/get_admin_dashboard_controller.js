/**
 * @fileoverview Administrative Dashboard Analytics System
 * 
 * Provides comprehensive administrative insights through
 * aggregated user statistics and recent activity monitoring.
 * Implements efficient database queries for real-time analytics.
 * 
 * Features:
 * - User role distribution analytics
 * - Recent user activity tracking
 * - Performance-optimized aggregation
 * - Filtered sensitive data
 * 
 * Analytics Components:
 * - Role-based user counts
 * - Recent registrations list
 * - User status distribution
 * - Registration trends
 * 
 * @module authentication/adminDashboard
 */

// Internal imports
import User from '../../model/User.js';

/**
 * Generates administrative dashboard statistics and recent user data.
 * Aggregates user counts by role and retrieves recent registrations
 * while ensuring sensitive data is properly filtered.
 */
const getAdminDashboard = async (req, res) => {
    try {
        // Get all users count by role
        const userStats = await User.aggregate([
            {
                $group: {
                    _id: '$role',
                    count: { $sum: 1 }
                }
            }
        ]);

        // Get recent users
        const recentUsers = await User.find()
            .select('-password')
            .sort({ createdAt: -1 })
            .limit(5);

        res.status(200).json({
            success: true,
            data: {
                stats: userStats,
                recentUsers
            }
        });
    } catch (error) {
        console.error('Admin Dashboard error:', error);
        res.status(500).json({
            success: false,
            message: "Error fetching admin dashboard data",
            error: error.message
        });
    }
};

export {
    getAdminDashboard
};