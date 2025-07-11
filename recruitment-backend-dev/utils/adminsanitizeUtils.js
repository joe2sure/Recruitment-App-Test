import Joi from "joi";
import xss from "xss";
import mongoose from "mongoose";
import User from "../model/User.js";

// Main Admin Schema
export const adminSchema = Joi.object({
    user_Id: Joi.string().required().messages({
        "any.required": '"user_Id" is required',
        "string.empty": '"user_Id" cannot be empty',
    }),
    full_Name: Joi.string().min(3).max(100).optional().messages({
        "any.required": '"full name" is required',
        "string.min": '"full name" must be at least 3 characters long',
        "string.max": '"full name" must be less than 100 characters',
    }),
    profile_image: Joi.string().optional().uri({ allowRelative: false }).messages({
        "any.required": '"profile_image" is required',
        "string.uri": '"profile_image" must be a valid URL',
    }),
    roleLevel: Joi.string().valid("SuperAdmin", "Manager", "Support").optional(),
    permissions: Joi.object({
        manageUsers: Joi.boolean().optional(),
        manageJobs: Joi.boolean().optional(),
        manageTraining: Joi.boolean().optional(),
        manageCredentials: Joi.boolean().optional(),
        manageReports: Joi.boolean().optional(),
        fullAccess: Joi.boolean().optional(),
    }).optional(),
    lastAction: Joi.date().iso().optional(),
    notes: Joi.string().optional(),
}).unknown(true); // Allow extra fields but ignore them

/**
 * Sanitizes and validates admin data before saving
 * @param {Object} data - Raw request body
 * @returns {Promise<Object>} - Cleaned and validated data
 */
export const secureAdminData = async (data) => {
    // Clone and sanitize strings
    const sanitized = {
        ...data,
        full_Name:
            typeof data.full_Name === "string" ? xss(data.full_Name.trim()) : undefined,

        profile_image:
            typeof data.profile_image === "string" ? xss(data.profile_image.trim()) : undefined,

        roleLevel:
            typeof data.roleLevel === "string" ? xss(data.roleLevel.trim()) : undefined,

        notes:
            typeof data.notes === "string" ? xss(data.notes.trim()) : undefined,

        permissions: {
            manageUsers: typeof data.permissions?.manageUsers === "boolean" ? data.permissions.manageUsers : false,
            manageJobs: typeof data.permissions?.manageJobs === "boolean" ? data.permissions.manageJobs : false,
            manageTraining: typeof data.permissions?.manageTraining === "boolean" ? data.permissions.manageTraining : false,
            manageCredentials: typeof data.permissions?.manageCredentials === "boolean" ? data.permissions.manageCredentials : false,
            manageReports: typeof data.permissions?.manageReports === "boolean" ? data.permissions.manageReports : false,
            fullAccess: typeof data.permissions?.fullAccess === "boolean" ? data.permissions.fullAccess : false,
        },
    };

    // Validate structure
    const { error, value } = adminSchema.validate(sanitized, {
        abortEarly: false,
        stripUnknown: true,
    });

    if (error) {
        throw new Error(
            `Validation failed: ${error.details.map((d) => d.message).join(", ")}`
        );
    }

    // Validate user_Id exists and is an admin
    if (!mongoose.Types.ObjectId.isValid(value.user_Id)) {
        throw new Error(`Invalid ObjectId for "user_Id": ${value.user_Id}`);
    }

    const userExists = await User.findById(value.user_Id);
    if (!userExists) {
        throw new Error(`User not found for user_Id: ${value.user_Id}`);
    }
    console.log(userExists.role);
    
    if (userExists.role !== "Admin") {
        throw new Error(`User with ID ${value.user_Id} is not an admin`);
    }

    return value;
};
