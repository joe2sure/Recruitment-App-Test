import nodemailer from 'nodemailer';

/**
 * Sends a job application confirmation email to the candidate
 * @param {string} to - Candidate's email
 * @param {string} name - Candidate's name
 * @param {string} jobTitle - Job title applied for
 * @param {string} companyName - Company name
 * @param {string} website - Company website URL
 */

/// send message that someone have apply to employer and semd message to candidate for thanks to use our website and
export const sendJobApplicationMail = async (to, name, jobTitle, companyName, website) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail', // or use SMTP config
    auth: {
      user: process.env.AUTH_EMAIL, // your email
      pass: process.env.AUTH_PASSWORD, // your password or app password
    },
  });

  const currentYear = new Date().getFullYear();

  const htmlMessage = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; background-color: #f4f6f8; margin: 0; padding: 0; }
        .container { max-width: 600px; background-color: #ffffff; margin: 40px auto; padding: 30px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.08); }
        .header { text-align: center; padding-bottom: 20px; border-bottom: 1px solid #eee; }
        .header h1 { color: #2d3748; }
        .content { margin-top: 30px; color: #4a5568; line-height: 1.6; }
        .footer { margin-top: 40px; text-align: center; font-size: 13px; color: #a0aec0; }
        .highlight { color: #2b6cb0; font-weight: bold; }
        .btn { display: inline-block; margin-top: 20px; padding: 10px 20px; background-color: #2b6cb0; color: white; text-decoration: none; border-radius: 4px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header"><h1>Application Received</h1></div>
        <div class="content">
          <p>Dear <span class="highlight">${name}</span>,</p>
          <p>Thank you for applying for the <span class="highlight">${jobTitle}</span> position at <strong>${companyName}</strong>.</p>
          <p>We have received your application and appreciate your interest. Our team is reviewing applications and will contact you if selected.</p>
          <p>You can visit our website for more info.</p>
       <a href="${website}" style="color: white;" class="btn">Visit Our Website</a>
          <p style="margin-top: 40px;">Warm regards,<br/><strong>${companyName} Recruitment Team</strong></p>
        </div>
        <div class="footer">&copy; ${currentYear} ${companyName} | All rights reserved</div>
      </div>
    </body>
    </html>
  `;

  const mailOptions = {
    from: `"${companyName} Careers" <${process.env.EMAIL_USER}>`,
    to,
    subject: `Thanks for applying for ${jobTitle} at ${companyName}`,
    html: htmlMessage,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Confirmation email sent to ${to}`);
  } catch (err) {
    console.error('Error sending email:', err.message);
  }
};
export const sendmessageToEmploye = async (to, name, jobTitle, companyName, percentageScoreAts, website) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.AUTH_EMAIL,
      pass: process.env.AUTH_PASSWORD,
    },
  });

  const currentYear = new Date().getFullYear();

  // Determine dynamic message based on ATS score
  let atsMessage = '';
  if (percentageScoreAts < 50) {
    atsMessage = `
      <p>The candidate's application scored <strong>${percentageScoreAts}%</strong> based on our internal ATS screening.</p>
      <p>Unfortunately, this score falls below our threshold for proceeding. Please review and confirm the candidate's status. If no action is taken, the candidate will be automatically marked as <strong>Rejected</strong> within 1hours.</p>
    `;
  } else if (percentageScoreAts >= 50 && percentageScoreAts < 70) {
    atsMessage = `
      <p>The candidate's application scored <strong>${percentageScoreAts}%</strong> in our initial evaluation.</p>
      <p>Please review the candidate's profile and respond within <strong>30 minutes</strong> if you'd like us to send change application to shortlist. If approved, you can leave it will will not notice you about the assesment sending we will change it after 3hours <strong>Shortlisted</strong>. Otherwise, update to <strong>Rejected</strong>.</p>
    `;
  } else {
    atsMessage = `
      <p>The candidate's application scored <strong>${percentageScoreAts}%</strong>, which meets the threshold for shortlisting.</p>
      <p>We will proceed to send the assessment unless you indicate otherwise. You can still review the candidate’s profile and take further actions if needed.</p>
    `;
  }

  const htmlMessage = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; background-color: #f4f6f8; margin: 0; padding: 0; }
        .container { max-width: 600px; background-color: #ffffff; margin: 40px auto; padding: 30px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.08); }
        .header { text-align: center; padding-bottom: 20px; border-bottom: 1px solid #eee; }
        .header h1 { color: #2d3748; }
        .content { margin-top: 30px; color: #4a5568; line-height: 1.6; }
        .footer { margin-top: 40px; text-align: center; font-size: 13px; color: #a0aec0; }
        .highlight { color: #2b6cb0; font-weight: bold; }
        .btn { display: inline-block; margin-top: 20px; padding: 10px 20px; background-color: #2b6cb0; color: white; text-decoration: none; border-radius: 4px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header"><h1>Application Update</h1></div>
        <div class="content">
          <p>Dear <span class="highlight">${name}</span>,</p>
          <p>A new candidate has applied for the <strong>${jobTitle}</strong> position.</p>
          ${atsMessage}
          <p>You can visit our platform to view more details and take action.</p>
         <a href="${website}" style="color: white;" class="btn">Visit Our Website</a>
          <p style="margin-top: 40px;">Best regards,<br/><strong>${companyName} Recruitment Team</strong></p>
        </div>
        <div class="footer">&copy; ${currentYear} ${companyName} | All rights reserved</div>
      </div>
    </body>
    </html>
  `;

  const mailOptions = {
    from: `"${companyName}" <${process.env.EMAIL_USER}>`,
    to,
    subject: `Candidate Application Review for ${jobTitle} – ${companyName}`,
    html: htmlMessage,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Message sent to employer ${to}`);
  } catch (err) {
    console.error('Error sending email:', err.message);
  }
};



/// send reject message to Candidate and Employer
export const sendJobRejectionMail = async (to, name, jobTitle, companyName, website) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.AUTH_EMAIL,
      pass: process.env.AUTH_PASSWORD,
    },
  });

  const currentYear = new Date().getFullYear();

  const htmlMessage = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; background-color: #f4f6f8; margin: 0; padding: 0; }
        .container { max-width: 600px; background-color: #ffffff; margin: 40px auto; padding: 30px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.08); }
        .header { text-align: center; padding-bottom: 20px; border-bottom: 1px solid #eee; }
        .header h1 { color: #e53e3e; }
        .content { margin-top: 30px; color: #4a5568; line-height: 1.6; }
        .footer { margin-top: 40px; text-align: center; font-size: 13px; color: #a0aec0; }
        .highlight { color: #2b6cb0; font-weight: bold; }
        .btn { display: inline-block; margin-top: 20px; padding: 10px 20px; background-color: #2b6cb0; color: white; text-decoration: none; border-radius: 4px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header"><h1>Application Update</h1></div>
        <div class="content">
          <p>Dear <span class="highlight">${name}</span>,</p>
          <p>Thank you for applying for the <span class="highlight">${jobTitle}</span> position at <strong>${companyName}</strong>.</p>
          <p>We’re sorry to inform you that after careful consideration, we will not be moving forward with your application at this time.</p>
          <p>This decision does not reflect negatively on your qualifications or experience. We received a large number of applications and had to make some difficult choices.</p>
          <p>We sincerely appreciate your interest in joining <strong>${companyName}</strong> and encourage you to apply for future openings that match your skills and experience.</p>
          <p>You can visit our website for future opportunities and updates.</p>
         <a href="${website}" style="color: white;" class="btn">Visit Our Website</a>
          <p style="margin-top: 40px;">We wish you the very best in your career journey.<br/><strong>${companyName} Recruitment Team</strong></p>
        </div>
        <div class="footer">&copy; ${currentYear} ${companyName} | All rights reserved</div>
      </div>
    </body>
    </html>
  `;

  const mailOptions = {
    from: `"${companyName} Careers" <${process.env.EMAIL_USER}>`,
    to,
    subject: `Your application for ${jobTitle} at ${companyName}`,
    html: htmlMessage,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Rejection email sent to ${to}`);
  } catch (err) {
    console.error('Error sending email:', err.message);
  }
};
export const notifyEmployerOfRejection = async (employerEmail, candidateName, jobTitle, companyName) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.AUTH_EMAIL,
      pass: process.env.AUTH_PASSWORD,
    },
  });

  const currentYear = new Date().getFullYear();

  const htmlMessage = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; background-color: #f4f6f8; margin: 0; padding: 0; }
        .container { max-width: 600px; background-color: #ffffff; margin: 40px auto; padding: 30px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.08); }
        .header { text-align: center; padding-bottom: 20px; border-bottom: 1px solid #eee; }
        .header h1 { color: #2d3748; }
        .content { margin-top: 30px; color: #4a5568; line-height: 1.6; }
        .footer { margin-top: 40px; text-align: center; font-size: 13px; color: #a0aec0; }
        .highlight { color: #2b6cb0; font-weight: bold; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header"><h1>Candidate Update</h1></div>
        <div class="content">
          <p>Hello,</p>
          <p>This is to inform you that a rejection email has been sent to <span class="highlight">${candidateName}</span> regarding their application for the position of <span class="highlight">${jobTitle}</span> at <strong>${companyName}</strong>.</p>
          <p>This status has been updated in the system as <span class="highlight">Rejected</span>.</p>
          <p>No further action is required at this time.</p>
        </div>
        <div class="footer">&copy; ${currentYear} ${companyName} | Recruitment System Notification</div>
      </div>
    </body>
    </html>
  `;

  const mailOptions = {
    from: `"${companyName} Notification" <${process.env.EMAIL_USER}>`,
    to: employerEmail,
    subject: `Rejection sent to ${candidateName} for ${jobTitle}`,
    html: htmlMessage,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Notification email sent to employer: ${employerEmail}`);
  } catch (err) {
    console.error('Error sending employer notification:', err.message);
  }
};





export const sendassessmentnotification = async (
  to,
  name,
  jobTitle,
  companyName,
  website,
  assessmentStartTime,
  assessmentEndTime
) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.AUTH_EMAIL,
      pass: process.env.AUTH_PASSWORD,
    },
  });

  const currentYear = new Date().getFullYear();

  const htmlMessage = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; background-color: #f4f6f8; margin: 0; padding: 0; }
        .container { max-width: 600px; background-color: #ffffff; margin: 40px auto; padding: 30px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.08); }
        .header { text-align: center; padding-bottom: 20px; border-bottom: 1px solid #eee; }
        .header h1 { color: #2d3748; }
        .content { margin-top: 30px; color: #4a5568; line-height: 1.6; }
        .footer { margin-top: 40px; text-align: center; font-size: 13px; color: #a0aec0; }
        .highlight { color: #2b6cb0; font-weight: bold; }
        .btn { display: inline-block; margin-top: 20px; padding: 10px 20px; background-color: #2b6cb0; color: white; text-decoration: none; border-radius: 4px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header"><h1>Next Steps: Online Assessment</h1></div>
        <div class="content">
          <p>Dear <span class="highlight">${name}</span>,</p>
          <p>Thank you for applying for the <strong>${jobTitle}</strong> position at <strong>${companyName}</strong>.</p>
          <p>We're pleased to inform you that you've been shortlisted for the next stage of the recruitment process.</p>
          <p>An online assessment/quiz has been scheduled for you to complete.</p>
          <p><strong>Assessment Period:</strong><br/>
          <span class="highlight">${assessmentStartTime}</span> to <span class="highlight">${assessmentEndTime}</span></p>
          <p>Please ensure that you complete the assessment within the given timeframe. Failure to do so may affect your application status.</p>
          <p>For more information or assistance, visit our website below:</p>
          <a href="${website}" class="btn">Visit Our Website</a>
          <p style="margin-top: 40px;">Best wishes,<br/><strong>${companyName} Recruitment Team</strong></p>
        </div>
        <div class="footer">&copy; ${currentYear} ${companyName} | All rights reserved</div>
      </div>
    </body>
    </html>
  `;

  const mailOptions = {
    from: `"${companyName} Careers" <${process.env.EMAIL_USER}>`,
    to,
    subject: `Assessment Instructions for ${jobTitle} at ${companyName}`,
    html: htmlMessage,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Assessment email sent to ${to}`);
  } catch (err) {
    console.error('Error sending assessment email:', err.message);
  }
};
/// send message to message shortlist that candidate have been shortlist and to enployer is that we have change the application status
export const sendJobShortlistMail = async (to, name, jobTitle, companyName, website) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.AUTH_EMAIL,
      pass: process.env.AUTH_PASSWORD,
    },
  });

  const currentYear = new Date().getFullYear();

  const htmlMessage = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; background-color: #f4f6f8; margin: 0; padding: 0; }
        .container { max-width: 600px; background-color: #ffffff; margin: 40px auto; padding: 30px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.08); }
        .header { text-align: center; padding-bottom: 20px; border-bottom: 1px solid #eee; }
        .header h1 { color: #2f855a; }
        .content { margin-top: 30px; color: #4a5568; line-height: 1.6; }
        .footer { margin-top: 40px; text-align: center; font-size: 13px; color: #a0aec0; }
        .highlight { color: #2b6cb0; font-weight: bold; }
        .btn { display: inline-block; margin-top: 20px; padding: 10px 20px; background-color: #2b6cb0; color: white; text-decoration: none; border-radius: 4px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header"><h1>You've Been Shortlisted!</h1></div>
        <div class="content">
          <p>Dear <span class="highlight">${name}</span>,</p>
          <p>Thank you for applying for the <span class="highlight">${jobTitle}</span> role at <strong>${companyName}</strong>.</p>
          <p>We're excited to inform you that you've been <strong>shortlisted</strong> for the next phase of the hiring process.</p>
          <p>Our team was impressed with your qualifications, and we believe you could be a strong fit for the role. We’ll be reaching out shortly with the next steps, which may include an online assessment, interview, or additional documentation.</p>
          <p>In the meantime, you can visit our website for more information and updates.</p>
          <a href="${website}" class="btn">Visit Our Website</a>
          <p style="margin-top: 40px;">Best regards,<br/><strong>${companyName} Recruitment Team</strong></p>
        </div>
        <div class="footer">&copy; ${currentYear} ${companyName} | All rights reserved</div>
      </div>
    </body>
    </html>
  `;

  const mailOptions = {
    from: `"${companyName} Careers" <${process.env.EMAIL_USER}>`,
    to,
    subject: `You've been shortlisted for ${jobTitle} at ${companyName}`,
    html: htmlMessage,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Shortlist email sent to ${to}`);
  } catch (err) {
    console.error('Error sending email:', err.message);
  }
};
export const notifyEmployerAboutShortlist = async (to, employerName, candidateName, jobTitle, companyName, dashboardUrl) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.AUTH_EMAIL,
      pass: process.env.AUTH_PASSWORD,
    },
  });

  const currentYear = new Date().getFullYear();

  const htmlMessage = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; background-color: #f4f6f8; margin: 0; padding: 0; }
        .container { max-width: 600px; background-color: #ffffff; margin: 40px auto; padding: 30px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.08); }
        .header { text-align: center; padding-bottom: 20px; border-bottom: 1px solid #eee; }
        .header h1 { color: #2f855a; }
        .content { margin-top: 30px; color: #4a5568; line-height: 1.6; }
        .footer { margin-top: 40px; text-align: center; font-size: 13px; color: #a0aec0; }
        .highlight { color: #2b6cb0; font-weight: bold; }
        .btn { display: inline-block; margin-top: 20px; padding: 10px 20px; background-color: #2b6cb0; color: white; text-decoration: none; border-radius: 4px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header"><h1>Candidate Shortlisted Automatically</h1></div>
        <div class="content">
          <p>Dear <span class="highlight">${employerName}</span>,</p>
          <p>The candidate <span class="highlight">${candidateName}</span> who applied for the <span class="highlight">${jobTitle}</span> role at <strong>${companyName}</strong> has been <strong>automatically shortlisted</strong> based on their performance.</p>
          <p>Unless updated manually, an assessment message will be sent to the candidate within <strong>24 hours</strong>.</p>
          <p>If you would like to review or change the application status, please do so by visiting your dashboard:</p>
          <a href="${dashboardUrl}" class="btn">Go to Dashboard</a>
          <p style="margin-top: 40px;">Thank you for using our platform.<br/><strong>${companyName} Recruitment Team</strong></p>
        </div>
        <div class="footer">&copy; ${currentYear} ${companyName} | All rights reserved</div>
      </div>
    </body>
    </html>
  `;

  const mailOptions = {
    from: `"${companyName} Notification" <${process.env.EMAIL_USER}>`,
    to,
    subject: `Candidate ${candidateName} shortlisted for ${jobTitle}`,
    html: htmlMessage,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Shortlist notification sent to employer ${to}`);
  } catch (err) {
    console.error('Error sending employer notification:', err.message);
  }
};


/// message to employer and candidate for assessment to send 
export const notifyEmployerAssessmentSent = async (to, employerName, candidateName, jobTitle, companyName, dashboardUrl) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.AUTH_EMAIL,
      pass: process.env.AUTH_PASSWORD,
    },
  });

  const currentYear = new Date().getFullYear();

  const htmlMessage = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; background-color: #f4f6f8; margin: 0; padding: 0; }
        .container { max-width: 600px; background-color: #ffffff; margin: 40px auto; padding: 30px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.08); }
        .header { text-align: center; padding-bottom: 20px; border-bottom: 1px solid #eee; }
        .header h1 { color: #2f855a; }
        .content { margin-top: 30px; color: #4a5568; line-height: 1.6; }
        .footer { margin-top: 40px; text-align: center; font-size: 13px; color: #a0aec0; }
        .highlight { color: #2b6cb0; font-weight: bold; }
        .btn { display: inline-block; margin-top: 20px; padding: 10px 20px; background-color: #2b6cb0; color: white; text-decoration: none; border-radius: 4px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header"><h1>Assessment Sent to Candidate</h1></div>
        <div class="content">
          <p>Dear <span class="highlight">${employerName}</span>,</p>
          <p>The candidate <span class="highlight">${candidateName}</span> who applied for the <span class="highlight">${jobTitle}</span> role at <strong>${companyName}</strong> has now received an assessment message.</p>
          <p>They have been instructed to complete the assessment between <strong>Thursday, June 30, 2025</strong> and <strong>Thursday, July 3, 2025</strong>.</p>
          <p><strong>Important:</strong> If the candidate does not complete the assessment within this timeframe, they may be automatically disqualified from the hiring process.</p>
          <p>If you wish to intervene or update their application status, you can do so from your dashboard:</p>
          <a href="${dashboardUrl}" class="btn">Go to Dashboard</a>
          <p style="margin-top: 40px;">Thank you for using our recruitment platform.<br/><strong>${companyName} Recruitment Team</strong></p>
        </div>
        <div class="footer">&copy; ${currentYear} ${companyName} | All rights reserved</div>
      </div>
    </body>
    </html>
  `;

  const mailOptions = {
    from: `"${companyName} Notification" <${process.env.EMAIL_USER}>`,
    to,
    subject: `Assessment sent to ${candidateName} for ${jobTitle}`,
    html: htmlMessage,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Assessment notification sent to employer ${to}`);
  } catch (err) {
    console.error('Error sending assessment email to employer:', err.message);
  }
};

export const notifyCandidateAssessmentSent = async (to, candidateName, jobTitle, companyName, assessmentLink) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.AUTH_EMAIL,
      pass: process.env.AUTH_PASSWORD,
    },
  });

  const currentYear = new Date().getFullYear();

  const htmlMessage = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; background-color: #f4f6f8; margin: 0; padding: 0; }
        .container { max-width: 600px; background-color: #ffffff; margin: 40px auto; padding: 30px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.08); }
        .header { text-align: center; padding-bottom: 20px; border-bottom: 1px solid #eee; }
        .header h1 { color: #2b6cb0; }
        .content { margin-top: 30px; color: #4a5568; line-height: 1.6; }
        .footer { margin-top: 40px; text-align: center; font-size: 13px; color: #a0aec0; }
        .highlight { color: #2f855a; font-weight: bold; }
        .btn { display: inline-block; margin-top: 20px; padding: 10px 20px; background-color: #2f855a; color: white; text-decoration: none; border-radius: 4px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header"><h1>Action Required: Complete Your Assessment</h1></div>
        <div class="content">
          <p>Dear <span class="highlight">${candidateName}</span>,</p>
          <p>Thank you again for applying for the <span class="highlight">${jobTitle}</span> role at <strong>${companyName}</strong>.</p>
          <p>You have been <strong>shortlisted</strong>, and we are excited to proceed with the next step in the hiring process.</p>
          <p>Please complete the assessment provided below between <strong>Thursday, June 30, 2025</strong> and <strong>Thursday, July 3, 2025</strong>.</p>
          <p><strong>Important:</strong> Failure to complete the assessment within this timeframe may lead to automatic disqualification.</p>
          <a href="${assessmentLink}" class="btn">Start Assessment</a>
          <p style="margin-top: 40px;">Best wishes,<br/><strong>${companyName} Recruitment Team</strong></p>
        </div>
        <div class="footer">&copy; ${currentYear} ${companyName} | All rights reserved</div>
      </div>
    </body>
    </html>
  `;

  const mailOptions = {
    from: `"${companyName} Careers" <${process.env.EMAIL_USER}>`,
    to,
    subject: `Assessment Instructions for ${jobTitle} Role at ${companyName}`,
    html: htmlMessage,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Assessment email sent to candidate ${to}`);
  } catch (err) {
    console.error('Error sending assessment email to candidate:', err.message);
  }
};


//




