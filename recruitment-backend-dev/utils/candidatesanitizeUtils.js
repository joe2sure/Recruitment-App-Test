// /validators/candidateValidator.js
import Joi from "joi";

export const candidateUpdateSchema = Joi.object({
  full_name: Joi.string().min(3).max(100),

  location: Joi.object({
    city: Joi.string().optional(),
    state: Joi.string().optional(),
    country: Joi.string().optional(),
  }).optional(),

  profile_image: Joi.string().uri(),

  resumeUrl: Joi.string().uri(),
  gender: Joi.string()
    .valid('Female', 'Male')
    .optional()
    .messages({
      'gender': 'gender must be one of Male, Female',
      'string.base': 'gender must be a string',
    }),

  date_of_birth: Joi.date()
    .iso() // Ensures format like '1995-04-15'
    .less('now') // Ensures it's a date in the past
    .messages({
      'date.base': `"date_of_birth" must be a valid date`,
      'date.format': `"date_of_birth" must be in ISO format (YYYY-MM-DD)`,
      'date.less': `"date_of_birth" must be a past date`,
    }),

  parsed_ResumeData: Joi.object({
    education: Joi.array().items(
      Joi.object({
        institution: Joi.string(),
        degree: Joi.string(),
        fieldOfStudy: Joi.string(),
        startDate: Joi.date().iso(),
        endDate: Joi.date().iso(),
      })
    ),
    experience: Joi.array().items(
      Joi.object({
        jobTitle: Joi.string(),
        employer: Joi.string(),
        startDate: Joi.date().iso(),
        endDate: Joi.date().iso(),
        responsibilities: Joi.string(),
      })
    ),
    skills: Joi.array().items(Joi.string()),
  }).optional(),

  credentials: Joi.array().items(
    Joi.object({
      type: Joi.string().required(),
      issuingAuthority: Joi.string().optional(),
      validUntil: Joi.date().iso().optional(),
      documentUrl: Joi.string().uri().optional(),
    })
  ).optional(),

  applications: Joi.array().items(Joi.string().hex().length(24)).optional(),

  training_Progress: Joi.array().items(
    Joi.object({
      trainingModuleId: Joi.string().hex().length(24),
      status: Joi.string().valid("Not Started", "In Progress", "Completed"),
      completedAt: Joi.date().iso(),
      certificateUrl: Joi.string().uri(),
    })
  ).optional(),

  interview_Schedule: Joi.array().items(
    Joi.object({
      jobId: Joi.string().hex().length(24),
      date: Joi.date().iso(),
      status: Joi.string().valid("Scheduled", "Completed", "Cancelled"),
      feedback: Joi.string(),
    })
  ).optional(),

  profile_Completed: Joi.boolean(),
});


export const secureCandidateData = async (data) => {
  const { error, value } = candidateUpdateSchema.validate(data, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    // Return the array of messages to be handled in controller
    return { error: error.details.map((e) => e.message) };
  }

  return { value };
};