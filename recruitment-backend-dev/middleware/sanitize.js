// middlewares/sanitizeMiddleware.js
import xss from "xss";

/**
 * Recursively sanitize all strings in an object.
 */
function deepSanitize(obj) {
  if (typeof obj === "string") {
    return xss(obj.trim());
  } else if (Array.isArray(obj)) {
    return obj.map(deepSanitize);
  } else if (obj !== null && typeof obj === "object") {
    const sanitizedObj = {};
    for (const key in obj) {
      sanitizedObj[key] = deepSanitize(obj[key]);
    }
    return sanitizedObj;
  }
  return obj;
}

export function sanitizeAllInputs(req, res, next) {
  req.body = deepSanitize(req.body);
  req.query = deepSanitize(req.query);
  req.params = deepSanitize(req.params);
  next();
}
