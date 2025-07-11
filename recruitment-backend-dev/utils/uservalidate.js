import Joi from 'joi';

const validateUserinfo = Joi.object({
  first_Name: Joi.string()
    .trim()
    .optional()
    .messages({
      'string.base': 'First name must be a string',
    }),

  last_Name: Joi.string()
    .trim()
    .optional()
    .messages({
      'string.base': 'Last name must be a string',
    }),

  middle_Name: Joi.string()
    .trim()
    .optional()
    .messages({
      'string.base': 'Middle name must be a string',
    }),

  email: Joi.string()
    .email()
    .lowercase()
    .trim()
    .optional()
    .messages({
      'string.email': 'Email must be a valid email address',
      'string.base': 'Email must be a string',
    }),

  phone_Number: Joi.string()
    .trim()
    .optional()
    .messages({
      'string.base': 'Phone number must be a string',
    }),

  password: Joi.string()
    .min(6)
    .optional()
    .messages({
      'string.min': 'Password must be at least 6 characters long',
      'string.base': 'Password must be a string',
    }),

  authProvider: Joi.string()
    .valid('local', 'google')
    .optional()
    .messages({
      'any.only': 'Auth provider must be either "local" or "google"',
      'string.base': 'Auth provider must be a string',
    }),

  role: Joi.string()
    .valid('Candidate', 'Employer', 'Admin')
    .optional()
    .messages({
      'any.only': 'Role must be one of Candidate, Employer, or Admin',
      'string.base': 'Role must be a string',
    }),

  status: Joi.string()
    .valid('Pending', 'Approved', 'Rejected')
    .optional()
    .messages({
      'any.only': 'Status must be either Pending, Approved, or Rejected',
      'string.base': 'Status must be a string',
    }),


  isEmailVerified: Joi.boolean()
    .optional()
    .messages({
      'boolean.base': 'isEmailVerified must be a boolean value',
    }),

  isActive: Joi.boolean()
    .optional()
    .messages({
      'boolean.base': 'isActive must be a boolean value',
    }),

  lastLogin: Joi.date()
    .optional()
    .messages({
      'date.base': 'Last login must be a valid date',
    }),
});

export const secureUserData = async (data) => {
  const { error, value } = validateUserinfo.validate(data, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    // Return the array of messages to be handled in controller
    return { error: error.details.map((e) => e.message) };
  }

  return { value };
};
