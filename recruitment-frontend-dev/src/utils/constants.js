// Application constants

export const APP_CONFIG = {
  NAME: import.meta.env.VITE_APP_NAME || 'Recruitment Platform',
  VERSION: import.meta.env.VITE_APP_VERSION || '1.0.0',
};

export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api',
  TIMEOUT: parseInt(import.meta.env.VITE_API_TIMEOUT) || 10000,
};

export const AUTH_CONFIG = {
  JWT_SECRET: import.meta.env.VITE_JWT_SECRET,
  JWT_EXPIRES_IN: import.meta.env.VITE_JWT_EXPIRES_IN || '7d',
  GOOGLE_CLIENT_ID: import.meta.env.VITE_GOOGLE_CLIENT_ID,
};

export const ROUTES = {
  HOME: '/',
  AUTH: {
    BASE: '/auth',
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    CHOOSE: '/auth/choose',
  },
  ABOUT: '/about',
  DASHBOARD: {
    TALENT: '/dashboard/talent',
    EMPLOYER: '/dashboard/employer',
  },
};

export const LOCAL_STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_DATA: 'user_data',
  USER_ROLE: 'user_role',
};

export const VALIDATION_RULES = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD: {
    MIN_LENGTH: 8,
    PATTERN: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
  },
  PHONE: /^\+?[\d\s\-()]+$/,
};

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};
