import Candidate from "../model/Candidate.js"
import mongoose from "mongoose";
import Application from "../model/Application.js"
import Joi from 'joi';
import User from "../model/User.js";
import { secureUserData } from "../utils/uservalidate.js";
import JobPost from "../model/JobPost.js";
import Employer from "../model/Employer.js";
import PendMessage from "../model/PendMessage.js";

import { 
  sendJobShortlistMail,
  notifyEmployerOfRejection,

   sendJobRejectionMail,
   

   
   notifyEmployerAboutShortlist,


   notifyEmployerAssessmentSent,
   notifyCandidateAssessmentSent
    } from "../config/jobApplication.js"

const sendFirstforApplication = async (PendMessageDetail) => {
  console.log('Message check started...');

  // Only proceed if it's time to send the message
  if (new Date(PendMessageDetail.timeToSend) > new Date()) {
    console.log('Not time yet, exiting...');
    return;
  }

  // Find application
  const application = await Application.findById(PendMessageDetail.applicationId);
  if (!application) {
    console.log('Application not found, deleting pending message.');
    await PendMessage.findByIdAndDelete(PendMessageDetail._id);
    return;
  }

  // Cancel if the stage is not 'Applied'
  if (application.currentStage !== 'Applied') {
    console.log('Application stage has changed, deleting pending message.');
    await PendMessage.findByIdAndDelete(PendMessageDetail._id);
    return;
  }

  // Get candidate and related data
  const candidate = await Candidate.findById(application.candidateId);
  if (!candidate) {
    console.log('Candidate not found.');
    return;
  }

  const jobPost = await JobPost.findById(application.jobId);
  if (!jobPost) {
    console.log('Job post not found.');
    return;
  }

  const userCandidateData = await User.findById(candidate.user_Id);
  if (!userCandidateData) {
    console.log('User (candidate) not found.');
    return;
  }

  // NOTE: You were fetching the employer data using candidate.user_Id again (probably a mistake)
  const userEmployerData = await User.findById(application.employerId); // Adjust this line if `employerId` exists
  // If you don't need employer data now, you can remove this
 // userCandidateData.email
  // Send the email
  if (PendMessageDetail.type === "shortlist") {
      await sendJobShortlistMail(
   'waliuwaheed2021@gmail.com',
    userCandidateData.first_Name,
    jobPost.title,
    "DIAMOND VIVA",
    'https://recruitment-backend-pkkq.onrender.com'
  );
  }else if(PendMessageDetail.type === "reject"){
     await sendJobRejectionMail(
   'waliuwaheed2021@gmail.com',
    userCandidateData.first_Name,
    jobPost.title,
    "DIAMOND VIVA",
    'https://recruitment-backend-pkkq.onrender.com'
  );
  }


  console.log(`Shortlist message sent to ${userCandidateData.email}`);

  // Optionally delete the pending message after sending
  await PendMessage.findByIdAndDelete(PendMessageDetail._id);
};



export const startautomessage = async () => {
  try {
    const now = new Date();
    const pendmessages = await PendMessage.find({ isSent: false, timeToSend: { $lte: now }, });
    if (pendmessages.length === 0) {
      console.log('ffff');

      return
    }
    console.log(pendmessages);
    for (const message of pendmessages) {
      if (message.type === 'shortlist' || message.type === "reject") {
        await sendShortlistmessage(message);
      }
    }
  } catch (error) {

  }



}

setInterval(startautomessage, 100000)