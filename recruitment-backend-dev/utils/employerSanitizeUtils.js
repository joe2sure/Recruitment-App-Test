import Joi from "joi";
import xss from "xss";
import mongoose from "mongoose";
import User from "../model/User.js";
import JobPost from "../model/JobPost.js";

// Define valid operators and criterion fields (for nested ATS config)
const validOperators = ["equals", "contains", ">=", "<=", "in", "notIn"];
const validCriterionFields = [
  "yearsOfExperience",
  "educationLevel",
  "certifications",
  "location",
  "skills",
  "availability",
];

// Define schema for criterion object
const criterionSchema = Joi.object({
  field: Joi.string()
    .valid(...validCriterionFields)
    .required(),
  operator: Joi.string()
    .valid(...validOperators)
    .required(),
  value: Joi.any().required(),
}).required();

// Define schema for auto-reject rules
const autoRejectRuleSchema = Joi.object({
  field: Joi.string()
    .valid(...validCriterionFields)
    .required(),
  operator: Joi.string()
    .valid(...validOperators)
    .required(),
  value: Joi.any().required(),
}).required();

// Main Employer Schema - Updated to include ALL fields from Employer model
const employerSchema = Joi.object({
  user_Id: Joi.string().required().messages({
    "any.required": '"user_Id" is required',
    "string.empty": '"user_Id" cannot be empty',
  }),

  profile_image: Joi.string()
    .optional()
    .uri({ allowRelative: false })
    .allow('', null)
    .messages({
      "string.uri": '"profile_image" must be a valid URL',
    }),

  company_name: Joi.string().min(2).max(100).optional().messages({
    "string.min": '"company_name" must be at least 2 characters long',
    "string.max": '"company_name" must be less than 100 characters',
  }),

  contact_Person: Joi.object({
    fullName: Joi.string().optional().allow(null, ""),
    phone: Joi.string().optional().allow(null, ""),
    email: Joi.string().email().optional().allow(null, ""),
  }).optional(),

  address: Joi.object({
    street: Joi.string().optional().allow(null, ""),
    city: Joi.string().optional().allow(null, ""),
    state: Joi.string().optional().allow(null, ""),
    country: Joi.string().optional().allow(null, ""),
    zipCode: Joi.string().optional().allow(null, ""),
  }).optional(),

  social_media: Joi.object({
    instagram: Joi.string().optional().uri({ allowRelative: false }).allow('', null),
    Twitter: Joi.string().optional().uri({ allowRelative: false }).allow('', null),
    Facebook: Joi.string().optional().uri({ allowRelative: false }).allow('', null),
    LinkedIn: Joi.string().optional().uri({ allowRelative: false }).allow('', null),
    Youtube: Joi.string().optional().uri({ allowRelative: false }).allow('', null),
  }).optional(),

  industry: Joi.string().optional().default("Healthcare"),

  job_Postings: Joi.array().items(Joi.string()).optional().default([]),

  ats_Preferences: Joi.object({
    autoScreening: Joi.boolean().optional(),
    requiredSkills: Joi.array().items(Joi.string()).optional().default([]),
    excludeKeywords: Joi.array().items(Joi.string()).optional().default([]),
    minExperience: Joi.number().min(0).optional(),
  }).optional(),

  subscription_Plan: Joi.object({
    planType: Joi.string().valid("Free", "Standard", "Enterprise").optional(),
    validUntil: Joi.date().iso().optional(),
  }).optional(),

  billing_Info: Joi.object({
    billingEmail: Joi.string().email().optional().allow('', null),
    paymentMethod: Joi.string().optional().allow(null, ""),
  }).optional(),

  onboarding_Completed: Joi.boolean().optional().default(false),

}).unknown(true); // Allow extra fields but ignore them

/**
 * Sanitizes and validates employer data before saving
 * @param {Object} data - Raw request body
 * @returns {Promise<Object>} - Cleaned and validated data
 */
export const secureEmployerData = async (data) => {
  // Clone and sanitize strings
  const sanitized = {
    ...data,
    company_name:
      typeof data.company_name === "string"
        ? xss(data.company_name.trim())
        : data.company_name,
    
    // Sanitize contact_Person fields
    contact_Person: data.contact_Person ? {
      fullName: typeof data.contact_Person.fullName === "string"
        ? xss(data.contact_Person.fullName.trim())
        : data.contact_Person.fullName,
      phone: typeof data.contact_Person.phone === "string"
        ? data.contact_Person.phone.trim()
        : data.contact_Person.phone,
      email: typeof data.contact_Person.email === "string"
        ? data.contact_Person.email.trim()
        : data.contact_Person.email,
    } : data.contact_Person,

    // Sanitize address fields
    address: data.address ? {
      street: typeof data.address.street === "string"
        ? xss(data.address.street.trim())
        : data.address.street,
      city: typeof data.address.city === "string"
        ? xss(data.address.city.trim())
        : data.address.city,
      state: typeof data.address.state === "string"
        ? xss(data.address.state.trim())
        : data.address.state,
      country: typeof data.address.country === "string"
        ? xss(data.address.country.trim())
        : data.address.country,
      zipCode: typeof data.address.zipCode === "string"
        ? data.address.zipCode.trim()
        : data.address.zipCode,
    } : data.address,

    // Sanitize industry
    industry: typeof data.industry === "string"
      ? xss(data.industry.trim())
      : data.industry,

    // Sanitize billing_Info
    billing_Info: data.billing_Info ? {
      billingEmail: typeof data.billing_Info.billingEmail === "string"
        ? data.billing_Info.billingEmail.trim()
        : data.billing_Info.billingEmail,
      paymentMethod: typeof data.billing_Info.paymentMethod === "string"
        ? xss(data.billing_Info.paymentMethod.trim())
        : data.billing_Info.paymentMethod,
    } : data.billing_Info,

    // Sanitize subscription_Plan
    subscription_Plan: data.subscription_Plan ? {
      planType: typeof data.subscription_Plan.planType === "string"
        ? data.subscription_Plan.planType.trim()
        : data.subscription_Plan.planType,
      validUntil: data.subscription_Plan.validUntil,
    } : data.subscription_Plan,

    // Sanitize ats_Preferences
    ats_Preferences: data.ats_Preferences ? {
      autoScreening: data.ats_Preferences.autoScreening,
      requiredSkills: Array.isArray(data.ats_Preferences.requiredSkills)
        ? data.ats_Preferences.requiredSkills.map(skill => 
            typeof skill === "string" ? xss(skill.trim()) : skill
          )
        : data.ats_Preferences.requiredSkills,
      excludeKeywords: Array.isArray(data.ats_Preferences.excludeKeywords)
        ? data.ats_Preferences.excludeKeywords.map(keyword => 
            typeof keyword === "string" ? xss(keyword.trim()) : keyword
          )
        : data.ats_Preferences.excludeKeywords,
      minExperience: data.ats_Preferences.minExperience,
    } : data.ats_Preferences,
  };

  // Validate structure
  const { error, value } = employerSchema.validate(sanitized, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    throw new Error(
      `Validation failed: ${error.details.map((d) => d.message).join(", ")}`
    );
  }

  // Step 1: Validate user_Id exists
  if (!mongoose.Types.ObjectId.isValid(value.user_Id)) {
    throw new Error(`Invalid ObjectId for "user_Id": ${value.user_Id}`);
  }

  const userExists = await User.findById(value.user_Id);
  if (!userExists) {
    throw new Error(`User not found for user_Id: ${value.user_Id}`);
  }

  if (userExists.role !== "Employer") {
    throw new Error(`User with ID ${value.user_Id} is not an employer`);
  }

  // Step 2: Validate job_Postings array contains real job IDs
  if (Array.isArray(value.job_Postings) && value.job_Postings.length > 0) {
    const invalidIds = [];

    const jobChecks = await Promise.all(
      value.job_Postings.map(async (jobId) => {
        if (!mongoose.Types.ObjectId.isValid(jobId)) {
          invalidIds.push(jobId);
          return false;
        }
        const jobExists = await JobPost.findById(jobId);
        return !!jobExists;
      })
    );

    const missingJobs = value.job_Postings.filter((_, idx) => !jobChecks[idx]);

    if (missingJobs.length > 0) {
      throw new Error(`Some job IDs do not exist: ${missingJobs.join(", ")}`);
    }
  }

  return value;
};
