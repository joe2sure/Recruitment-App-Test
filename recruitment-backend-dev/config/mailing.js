import nodemailer from 'nodemailer';




const sendEmailNotification = async (email, message, subject) => {
  let pinHtml = ` ${message}`
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'waliuwaheed2021@gmail.com', 
      pass: process.env.EMAIL_PASSkEY
    }
  });

  let mailOptions = {
    from: '"no-reply"info@divaltd.com', 
    to: email, 
    subject: subject, 
   
    html: pinHtml
   };

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
} catch (error) {
    console.log('Error: ', error);
}
 
};
  export default sendEmailNotification;