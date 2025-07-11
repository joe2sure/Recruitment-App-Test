import xss from "xss";
import Joi from "joi";

function sanitizeInput(obj) {
  if (typeof obj === "string") return xss(obj.trim());
  if (Array.isArray(obj)) return obj.map(sanitizeInput);
  if (typeof obj === "object" && obj !== null) {
    const sanitized = {};
    for (const key in obj) {
      sanitized[key] = sanitizeInput(obj[key]);
    }
    return sanitized;
  }
  return obj;
}

/**
 * Validates and sanitizes input fields from body, query, or params.
 *
 * @param {Object} req - Express request
 * @param {Object} fields - Field config: { fieldName: JoiSchema }
 * @param {'body' | 'query' | 'params'} source - Where to pull data from
 * @returns {Object} - { sanitizedData, error }
 */
export function validateAndSanitizeRequest(req, fields, source = "body") {
  const dataToCheck = req[source] || {};
  const sanitized = {};
  const schemaObj = {};

  for (const key in fields) {
    sanitized[key] = sanitizeInput(dataToCheck[key]);
    schemaObj[key] = fields[key];
  }

  const schema = Joi.object(schemaObj);
  const { error, value } = schema.validate(sanitized, {
    abortEarly: false,
    stripUnknown: true,
  });

  const errorMessages = error
    ? error.details.map((detail) => ({
        field: detail.path.join('.'),
        message: detail.message,
      }))
    : null;

  return { sanitizedData: value, error: errorMessages };
}
