/**
 * @fileoverview Email service configuration and templated email sending utility
 * @author Golor
 * @version 1.1.0
 */
import dotenv from "dotenv";
dotenv.config(); 

import nodemailer from 'nodemailer';

const { AUTH_EMAIL, AUTH_PASSWORD } = process.env;
  console.log(AUTH_EMAIL, AUTH_PASSWORD);
  
// Attempt to create transporter only if credentials exist
let transporter = null;
if (AUTH_EMAIL && AUTH_PASSWORD) {
  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: AUTH_EMAIL, pass: AUTH_PASSWORD },
    tls: { rejectUnauthorized: false }
  });

  transporter.verify((err) => {
    if (err) {
      console.error('Email transport verification failed:', err);
      transporter = null;
    } else {
      console.log('✅ Email transport ready');
    }
  });
} else {
  console.warn('⚠️  Skipping email setup: AUTH_EMAIL or AUTH_PASSWORD is missing');
}

// Email templates
const TEMPLATES = {
  VERIFICATION: {
    subject: 'Welcome to Diva LTD - Email Verification Required',
    template: (url) => `
      <!-- your HTML here -->
      <a href="${url}">Verify Email Address</a>
    `
  },
  PASSWORD_RESET: {
    subject: 'Password Reset Request - Diva LTD',
    template: (url) => `
      <!-- your HTML here -->
      <a href="${url}">Reset Password</a>
    `
  },
  VERIFICATION_SUCCESS: {
    subject: 'Email Verification Successful - Diva LTD',
    template: (baseUrl) => `
      <!-- your HTML here -->
      <a href="${baseUrl}/api/auth/login">Continue to Login</a>
    `
  }
};

/**
 * Sends an email using the specified template
 */
const sendEmail = async ({ to, templateName, url }) => {
  if (!transporter) {
    console.warn(`✉️  Email skipped (${templateName}) — transporter not configured`);
    return { success: false, skipped: true };
  }

  const tpl = TEMPLATES[templateName];
  if (!tpl) {
    throw new Error(`Email template '${templateName}' not found`);
  }

  const mailOptions = {
    from: AUTH_EMAIL,
    to,
    subject: tpl.subject,
    html: tpl.template(url)
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return { success: true, messageId: info.messageId };
  } catch (err) {
    console.error('Email sending error:', err);
    return { success: false, error: err };
  }
};

export { sendEmail, TEMPLATES };
