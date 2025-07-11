import Joi from "joi";
import xss from "xss";

// Define supported operators
const validOperators = ["equals", "contains", ">=", "<=", "in", "notIn"];

// Define valid criterion fields
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

// Define main schema for ATS Config
const atsConfigSchema = Joi.object({
  employerId: Joi.string().required().messages({
    "any.required": `"employerId" is required`,
    "string.empty": `"employerId" cannot be empty`,
  }),
  criteria: Joi.array().items(criterionSchema).optional().default([]),
  weightings: Joi.object({
    experience: Joi.number().min(0).default(1),
    education: Joi.number().min(0).default(1),
    certifications: Joi.number().min(0).default(1),
    skills: Joi.number().min(0).default(1),
    location: Joi.number().min(0).default(1),
    availability: Joi.number().min(0).default(1),
  })
    .optional()
    .default({
      experience: 1,
      education: 1,
      certifications: 1,
      skills: 1,
      location: 1,
      availability: 1,
    }),
  autoRejectRules: Joi.array()
    .items(autoRejectRuleSchema)
    .optional()
    .default([]),
  enabled: Joi.boolean().optional().default(true),
  notes: Joi.string().optional().allow("", null).default(null),
});

/**
 * Sanitize and validate ATS config data before saving
 * @param {Object} data - Raw request body
 * @returns {Object} - Cleaned and validated data
 */
export const secureATSConfigData = (data) => {
  // Clone to avoid mutating original
  const sanitized = {
    ...data,
    notes: typeof data.notes === "string" ? xss(data.notes.trim()) : undefined,
  };

  // Validate with Joi
  const { error, value } = atsConfigSchema.validate(sanitized, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    throw new Error(`Validation failed: ${error.message}`);
  }

  return value;
};
