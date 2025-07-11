import xss from "xss";
import Joi from "joi";

// Define Joi schema for validation
const jobPostSchema = Joi.object({
  title: Joi.string().min(3).max(200).optional(),
  description: Joi.string().max(5000).allow("", null).optional(),
  department: Joi.string().optional().allow(null, ""),
  employmentType: Joi.string()
    .valid("Full-time", "Part-time", "Contract", "Temporary", "Internship")
    .default("Full-time"),
  location: Joi.object({
    city: Joi.string().optional().allow(null, ""),
    state: Joi.string().optional().allow(null, ""),
    country: Joi.string().optional().allow(null, ""),
    remote: Joi.boolean().default(false),
  }).optional(),
  salaryRange: Joi.object({
    min: Joi.number().min(0).optional(),
    max: Joi.number().min(Joi.ref("min")).optional(),
    currency: Joi.string().default("USD"),
  }).optional(),
  requiredExperience: Joi.object({
    minYears: Joi.number().min(0).optional(),
    maxYears: Joi.number().min(Joi.ref("minYears")).optional(),
  }).optional(),
  requiredCredentials: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().optional().allow(null, ""),
        issuingAuthority: Joi.string().optional().allow(null, ""),
        required: Joi.boolean().default(true),
      })
    )
    .optional(),
  skillsRequired: Joi.array().items(Joi.string()).optional(),
  shift: Joi.string().valid("Day", "Night", "Rotating").optional(),
  employerId: Joi.string().allow("", null).optional(),
  atsSettings: Joi.object({
    useCustomATS: Joi.boolean().default(false),
    screeningCriteria: Joi.array().items(
      Joi.object({
        field: Joi.string().valid(
          "experience",
          "education",
          "certifications",
          "location",
          "skills",
          "availability"
        ),
        operator: Joi.string().valid(
          "equals",
          "contains",
          ">=",
          "<=",
          "in",
          "notIn"
        ),
        value: Joi.any().required(),
      })
    ),
  }).optional(),
  status: Joi.string().valid("Open", "Closed", "Paused").default("Open"),
  applicationDeadline: Joi.date().iso().optional(),
  interviewSlots: Joi.array()
    .items(
      Joi.object({
        start: Joi.date().iso().required(),
        end: Joi.date().iso().greater(Joi.ref("start")).required(),
      })
    )
    .optional(),
  postedBy: Joi.string().optional(),
  notes: Joi.string().optional().allow(null, ""),
});

/**
 * Sanitizes and validates job post data before saving to DB
 * @param {Object} data - Raw request body
 * @returns {Object} - Cleaned and validated data
 */
export const secureJobPostData = (data) => {
  // Step 1: Sanitize all string/text inputs
  const sanitizedData = {
    ...data,
    title: typeof data.title === "string" ? xss(data.title.trim()) : undefined,
    description:
      typeof data.description === "string"
        ? xss(data.description.trim())
        : undefined,
    department:
      typeof data.department === "string"
        ? xss(data.department.trim())
        : undefined,
    shift: typeof data.shift === "string" ? xss(data.shift.trim()) : undefined,
    notes: typeof data.notes === "string" ? xss(data.notes.trim()) : undefined,
  };

  // Step 2: Validate with Joi
  const { error, value } = jobPostSchema.validate(sanitizedData, {
    abortEarly: false, // Show all errors at once
    stripUnknown: true, // Remove unknown fields
  });

  if (error) {
    throw new Error(`Validation failed: ${error.message}`);
  }

  return value;
};
