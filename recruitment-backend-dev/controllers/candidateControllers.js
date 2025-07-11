import Candidate from "../model/Candidate.js"
import mongoose from "mongoose";
import Application from "../model/Application.js"

import User from "../model/User.js";
import { secureUserData } from "../utils/uservalidate.js";
import JobPost from "../model/JobPost.js";
import { calculateMatchScore } from "../utils/atsFilterAndMatchCandidateUtils.js";
import Employer from "../model/Employer.js";

import { uploads, deleteFile } from '../utils/uplaod.js';

import { secureCandidateData } from "../utils/candidatesanitizeUtils.js";
import { getATSConfig } from "../services/atsFilterAndMatchCandidateService.js";
import { validateApplicationInput } from "../utils/applicationSanitizer.js";
import {sendJobApplicationMail} from "../config/jobApplication.js";



export const trackJobView = async (req, res) => {
  try {
    const user_Id = req.user?.id;
    const { jobId } = req.params;

    if (!user_Id) {
      return res.status(400).json({ 
        success: false, 
        error: "User ID is required." 
      });
    }

    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(400).json({ 
        success: false, 
        error: "Invalid job ID." 
      });
    }

    // Find the candidate
    const candidate = await Candidate.findOne({ user_Id });
    if (!candidate) {
      return res.status(404).json({ 
        success: false, 
        error: "Candidate profile not found." 
      });
    }

    // Check if job exists and is viewable
    const job = await JobPost.findById(jobId);
    if (!job) {
      return res.status(404).json({ 
        success: false, 
        error: "Job not found." 
      });
    }

    if (job.isDeleted || !job.isApproved || job.status !== 'Open') {
      return res.status(400).json({ 
        success: false, 
        error: "Job is not available for viewing." 
      });
    }

    // Check if this candidate has already viewed this job today (to prevent spam)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const existingView = await JobView.findOne({
      candidateId: candidate._id,
      jobId: jobId,
      viewedAt: { $gte: today, $lt: tomorrow }
    });

    let isNewView = false;

    if (!existingView) {
      // Create new job view record
      const jobView = new JobView({
        jobId: jobId,
        candidateId: candidate._id,
        employerId: job.employerId,
      });

      await jobView.save();

      // Increment job view count
      job.views = (job.views || 0) + 1;
      await job.save();

      isNewView = true;

      console.log(`[DEBUG] New job view recorded: Job ${jobId} viewed by candidate ${candidate._id}. Total views: ${job.views}`);
    }

    return res.status(200).json({
      success: true,
      message: isNewView ? "Job view tracked successfully." : "Job view already recorded today.",
      data: {
        jobId: job._id,
        jobTitle: job.title,
        totalViews: job.views,
        viewedAt: new Date(),
        isNewView: isNewView
      }
    });

  } catch (error) {
    console.error("[ERROR] trackJobView:", error);
    return res.status(500).json({ 
      success: false, 
      error: "Failed to track job view",
      details: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};


// getting a candidate controller
const getCandidate = async (req, res) => {
  try {
    let userId = req.user.id // get user id 
    if (!mongoose.Types.ObjectId.isValid(req.user.id)) {
      return res.status(400).json({ status: false, message: "Invalid user ID" });
    }

    const candidates = await Candidate.findOne({ user_Id: userId });
    if (!candidates) {
      return res.status(404).json({ status: false, message: "User not found" })
    }
    res.status(200).json({ status: true, data: candidates })

  } catch (error) {
    res.status(404).json({ status: false, error: error.message })
  }
}

// getting applications history controller
const applicationHistory = async (req, res) => {
  try {
    let userId = req.user.id
    if (!mongoose.Types.ObjectId.isValid(req.user.id)) {
      return res.status(400).json({ status: false, message: "Invalid user ID" });
    }


    const candidate = await Candidate.findOne({ user_Id: userId }) //query for the user
    if (!candidate) {
      return res.status(404).json({ status: false, message: "No candidate found" })
    }

    const candidateId = candidate._id // get candidate id
    const applications = await Application.find({ candidateId: candidateId }).sort({ createdAt: -1 }).select('-atsScore -atsScoreDetails');

    if (applications?.length === 0) {
      return res.status(404).json({ status: true, message: "No applicatons found" })
    }

    res.status(200).json({ status: true, data: applications })

  } catch (error) {
    res.status(404).json({ status: true, error: error.message, f: "g" })
  }
}


//Creating an applications
const createApplication = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ status: false, message: "Invalid user ID" });
    }

    const candidate = await Candidate.findOne({ user_Id: userId });
    if (!candidate) {
      return res.status(404).json({ status: false, message: "No candidate found" });
    }

    const { jobId, useProfileResume, coverLetter, notes } = req.body;

    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(400).json({ status: false, message: "Invalid job ID" });
    }

    const jobPost = await JobPost.findById(jobId);
    if (!jobPost) {
      return res.status(404).json({ status: false, message: "No job found" });
    }

    if (jobPost.isApproved === false) {
      return res.status(401).json({ status: false, message: "Job has not been approved by admin, check back later." });
    }

    if (["Closed", "Paused"].includes(jobPost.status)) {
      return res.status(401).json({ status: false, message: `Job is currently ${jobPost.status.toLowerCase()}.` });
    }

    const existingApplication = await Application.findOne({
      candidateId: candidate._id,
      jobId: jobPost._id,
    });

    if (existingApplication) {
      return res.status(400).json({
        status: false,
        message: "You have already applied to this job.",
      });
    }
    const employer = await Employer.findById(jobPost.employerId)


    const atsConfig = await getATSConfig(jobPost.employerId);
    const matchScore = calculateMatchScore(candidate, jobPost, atsConfig);
    const percentScore = (matchScore.totalScore || 0) * 100;

    let resumeUrl;
    if (useProfileResume) {
      if (!candidate.resumeUrl) {
        return res.status(400).json({ status: false, message: "You have not uploaded a resume before." });
      }
      resumeUrl = candidate.resumeUrl;
    } else {
      if (req.files?.resumeUrl?.[0]) {
        resumeUrl = await uploads(
          req.files.resumeUrl[0].buffer,
          req.files.resumeUrl[0].originalname,
          "application/resume"
        );
      } else if (candidate.resumeUrl) {
        resumeUrl = candidate.resumeUrl;
      } else {
        return res.status(400).json({ status: false, message: "Please upload a resume." });
      }
    }

    let coverLetterUrl;
    if (req.files?.coverLetterFileUrl?.[0]) {
      coverLetterUrl = await uploads(
        req.files.coverLetterFileUrl[0].buffer,
        req.files.coverLetterFileUrl[0].originalname,
        "application/coverletter"
      );
    }

    const dataToValidate = {
      jobId,
      useProfileResume,
      coverLetter,
      notes,
      resumeUrl,
    };

    const validationResult = validateApplicationInput.validate(dataToValidate);
    if (validationResult.error) {
      return res.status(400).json({
        status: false,
        message: validationResult.error.details[0].message,
      });
    }

    const newApplication = new Application({
      candidateId: candidate._id,
      jobId: jobPost._id,
      employerId: jobPost.employerId,
      resumeUrl,
      coverLetterUrl,
      notes,
      coverLetter,
      atsScore: percentScore.toFixed(1),
      atsScoreDetails: matchScore,
      currentStage: 'Applied',
    });

    const savedApplication = await newApplication.save();
    const usercandidate = await User.findById(candidate.user_Id);
    const useremployer = await User.findById(employer.user_Id);
    console.log(useremployer, 'ffff');
    // Send thank-you email immediately
    await sendJobApplicationMail(
      'waliuwaheed2021@gmail.com',
      usercandidate.first_Name,
      jobPost.title,
      'Diamond Viva LTD',
      'https://healthbridgecareers.com'
    );
    const name = employer?.company_name ?? useremployer.first_Name;

    await sendmessageToEmploye(
      'waliuwaheed2021@gmail.com',
      name,
      jobPost.title,
      employer.company_name,
      percentScore.toFixed(1),
      'https://healthbridgecareers.com',
    )

    // Schedule shortlist email if ATS score > 70
   if (percentScore > 70) {
  const twoMinutesLater = new Date(Date.now() + 2 * 60 * 1000);
  await PendMessage.create({
    email: candidate.email,
    timeToSend: twoMinutesLater,
    type: 'shortlist',
    applicationId: savedApplication._id,
  });
} else if (percentScore < 50) {
  const twoMinutesLater = new Date(Date.now() + 2 * 60 * 1000);
  await PendMessage.create({
    email: candidate.email,
    timeToSend: twoMinutesLater,
    type: 'reject',
    applicationId: savedApplication._id,
  });
} else if (percentScore >= 50 && percentScore <= 70) {
  const twoMinutesLater = new Date(Date.now() + 2 * 60 * 1000);
  await PendMessage.create({
    email: candidate.email,
    timeToSend: twoMinutesLater,
    type: 'pending',
    applicationId: savedApplication._id,
  });
}

    const twoMinutesLater = new Date(Date.now() + 2 * 60 * 1000);

    const pending = await PendMessage.create({
      email: candidate.email,
      timeToSend: twoMinutesLater,
      type: 'shortlist',
      applicationId: savedApplication._id,
    });
    console.log(pending);

    // if (percentScore < 50) { 
    //   const twoMinutesLater = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes from now
    //   await PendMessage.create({
    //     email: candidate.email,
    //     timetosent: twoMinutesLater,
    //     type:'shortlist',
    //     applicationId: savedApplication._id,
    //   });
    // }

    // res.status(201).json({
    //   status: true,
    //   message: "Candidate application created successfully",
    //   data: {
    //     application: savedApplication,
    //   },
    // });
    return res.status(200).json({
      status: true,
      message: "Application updated successfully",
      data: {
        pending: pending,
      },
    });
  } catch (error) {
    console.error("Error creating application:", error);
    res.status(500).json({ status: false, message: "Something went wrong" });
  }
};



export const updateApplication = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ status: false, message: "Invalid user ID" });
    }
    console.log(userId);

    const candidate = await Candidate.findOne({ user_Id: userId });
    if (!candidate) {
      return res.status(404).json({ status: false, message: "No candidate found" });
    }

    const { applicationId, coverLetter, notes } = req.body;
    console.log(coverLetter);

    if (!mongoose.Types.ObjectId.isValid(applicationId)) {
      return res.status(400).json({ status: false, message: "Invalid application ID" });
    }

    console.log(applicationId);


    const existingApplication = await Application.findById(applicationId);
    if (!existingApplication) {
      return res.status(404).json({ status: false, message: "Application does not exist" });
    }

    const jobPost = await JobPost.findById(existingApplication.jobId);
    if (!jobPost || jobPost.isDeleted || existingApplication.jobStatus === "deleted") {
      return res.status(410).json({ status: false, message: "Job has been deleted" });
    }

    const atsConfig = await getATSConfig(jobPost.employerId);
    const matchScore = calculateMatchScore(candidate, jobPost, atsConfig);
    const percentScore = (matchScore.totalScore || 0) * 100;

    let resumeUrl = existingApplication.resumeUrl;
    let coverLetterUrl = existingApplication.coverLetterUrl;

    if (req.files) {

      if (req.files?.resumeUrl?.[0]) {
        
        resumeUrl = await uploads(
          req.files.resumeUrl[0].buffer,
          req.files.resumeUrl[0].originalname,
            "application/resume"
        );
      }
      if (req.files?.coverLetterUrl?.[0]) {
        if (existingApplication.coverLetterUrl) {
           await deleteFile(existingApplication.coverLetterUrl);
        }
        coverLetterUrl = await uploads(
          req.files.coverLetterUrl[0].buffer,
          req.files.coverLetterUrl[0].originalname,
          "application/resume"
        );
      }
    }

    // Update fields
    existingApplication.coverLetter = coverLetter;
    existingApplication.notes = notes;
    existingApplication.resumeUrl = resumeUrl;
    existingApplication.coverLetterUrl = coverLetterUrl;
    existingApplication.atsScore = percentScore;
    existingApplication.atsScoreDetails = matchScore;

    const updatedApplication = await existingApplication.save();

    return res.status(200).json({
      status: true,
      message: "Application updated successfully",
      data: {
        application: updatedApplication,
      },
    });

  } catch (error) {
    console.error("Error updating application:", error);
    return res.status(500).json({ status: false, message: "Server error", error: error.message });
  }
};


export const deleteApplication = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ status: false, message: "Invalid user ID" });
    }

    const candidate = await Candidate.findOne({ user_Id: userId });

    if (!candidate) {
      return res.status(404).json({ status: false, message: "No candidate found" });
    }

    const applicationId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(applicationId)) {
      return res.status(400).json({ status: false, message: "Invalid application ID" });
    }

    const application = await Application.findOne({ _id: applicationId });

    if (!application) {
      return res.status(404).json({ status: false, message: "Application not found" });
    }

    if (String(application.candidateId) !== String(candidate._id)) {
      return res.status(403).json({ status: false, message: "Unauthorized to delete this application" });
    }

    await application.deleteOne(); // or Application.findByIdAndDelete(applicationId)

    return res.status(200).json({ status: true, message: "Application deleted successfully" });

  } catch (err) {
    console.error("Error deleting application:", err.message);
    return res.status(500).json({ status: false, message: "Server error" });
  }
};




// creating a candidate controller
// validation shema



export const registerCandidate = async (req, res) => {
  try {
    const user_Id = req.user?.id;
    console.log("Extracted user_Id:", user_Id);

    if (!user_Id) {
      return res.status(400).json({ error: 'User ID is required.' });
    }

    const user = await User.findById(user_Id);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    const existingCandidate = await Candidate.findOne({ user_Id });
    if (existingCandidate) {
      return res.status(409).json({ error: 'Candidate already registered.' });
    }

    const body = { ...req.body };

    const safeParse = (field) => {
      if (body[field] && typeof body[field] === 'string') {
        try {
          body[field] = JSON.parse(body[field]);
        } catch (e) {
          throw new Error(`${field} must be valid JSON.`);
        }
      }
    };

    try {
      ['parsed_ResumeData', 'credentials', 'social_media', 'location'].forEach(safeParse);
    } catch (parseError) {
      return res.status(400).json({ error: parseError.message });
    }

    if (body.date_of_birth) {
      const dob = new Date(body.date_of_birth);
      if (isNaN(dob.getTime())) {
        return res.status(400).json({ error: 'Invalid date_of_birth format.' });
      }
      body.date_of_birth = dob;
    }

    // ✅ File Uploads to Local
    if (req.files) {
      if (req.files.profile_image?.[0]) {
        const profileImagePath = await uploads(
          req.files.profile_image[0].buffer,
          req.files.profile_image[0].originalname,
          'image/candidate'
        );
        body.profile_image = profileImagePath;
      }

      if (req.files.resume_file?.[0]) {
        const resumePath = await uploads(
          req.files.resume_file[0].buffer,
          req.files.resume_file[0].originalname,
          'resume/candidate'
        );
        body.resumeUrl = resumePath;
      }
    }

    const full_name = `${user.first_Name} ${user.middle_Name || ''} ${user.last_Name}`.trim();

    const allowedFields = [
      'parsed_ResumeData',
      'location',
      'date_of_birth',
      'social_media',
      'profile_image',
      'resumeUrl'
    ];

    const filteredBody = {};
    for (const key of allowedFields) {
      if (body[key] !== undefined) {
        filteredBody[key] = body[key];
      }
    }

    filteredBody.full_name = full_name;

    const cleanData = await secureCandidateData(filteredBody);
    const candidate = new Candidate({ ...cleanData, user_Id });
    await candidate.save();

    const profile = await checkProfileCompleted(candidate);

    return res.status(201).json({
      success: true,
      message: 'Candidate registered successfully.',
      data: candidate,
    });

  } catch (err) {
    console.error('Candidate registration error:', err);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Internal server error.' });
    }
  }
};



export const updateCandidate = async (req, res) => {


  try {
    const user_Id = req.user?.id;
    console.log("Extracted user_Id:", user_Id);

    if (!user_Id) {
      return res.status(400).json({ error: 'User ID is required.' });
    }

    const user = await User.findById(user_Id);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    const existingCandidate = await Candidate.findOne({ user_Id });
    if (!existingCandidate) {
      return res.status(409).json({ error: 'User has not created candidate profile yet.' });
    }

    const body = { ...req.body };

    // Parse JSON fields if they are strings
    const safeParse = (field) => {
      if (body[field] && typeof body[field] === 'string') {
        try {
          body[field] = JSON.parse(body[field]);
        } catch (e) {
          throw new Error(`"${field}" must be valid JSON.`);
        }
      }
    };

    try {
      safeParse('parsed_ResumeData');
      safeParse('credentials');
      safeParse('location');
      safeParse('social_media');
    } catch (parseError) {
      return res.status(400).json({ error: parseError.message });
    }

    // Validate and format date_of_birth
    if (body.date_of_birth) {
      const dob = new Date(body.date_of_birth);
      if (isNaN(dob.getTime())) {
        return res.status(400).json({ error: 'Invalid date_of_birth format.' });
      }
      body.date_of_birth = dob;
    }

    let profile_image;
    let resumeUrl;
    console.log(req.files);

    // Handle file uploads
    if (req.files) {
      console.log('it contain file');

      if (req.files.profile_image?.[0]) {
       
        
        if (existingCandidate.profile_image) {
        await deleteFile(existingCandidate.profile_image); // deletes existing image
      }
        if (req.files.profile_image?.[0]) {
        const profileImagePath = await uploads(
          req.files.profile_image[0].buffer,
          req.files.profile_image[0].originalname,
          'image/candidates/profileImage'
        );
       profile_image = profileImagePath;
       
      }  
      }

       if (req.files.resumeUrl?.[0]) {
        // console.log(existingCandidate);

        if (existingCandidate.resumeUrl) {
         
          console.log(existingCandidate.resumeUrl,'ffff');
          
        await deleteFile(existingCandidate.resumeUrl); // deletes existing image
      }
        if (req.files.resumeUrl?.[0]) {
        const resumePath = await uploads(
          req.files.resumeUrl[0].buffer,
          req.files.resumeUrl[0].originalname,
          'resume/candidates'
        );
        
        resumeUrl = resumePath
      }  
      }
      
    
    }

    const full_name = user.fullName;

    const allowedFields = [
      "first_Name",
      "gender",
      "last_Name",
      "parsed_ResumeData",
      "middle_Name",
      "location",
      "date_of_birth",

    ];
    
    const filteredBody = {};
    for (const key of allowedFields) {
      if (body[key] !== undefined) {
        filteredBody[key] = body[key];
      }
    }

    filteredBody.full_name = full_name;

    // console.log(filteredBody, 'filteredBody');

    // ✅ Sanitize and validate candidate data
    const { value: cleanCandidate_data, error: candidateValidationError } = await secureCandidateData(filteredBody);
    if (candidateValidationError) {
      return res.status(400).json({ error: candidateValidationError });
    }

    // console.log(cleanCandidate_data, "cleanCandidate_data");

    // ✅ Sanitize and validate user data
    const { value: clean_user_data, error: userValidationError } = await secureUserData(filteredBody);
    if (userValidationError) {
      return res.status(400).json({ error: userValidationError });
    }

    const newdatauser = await User.findOneAndUpdate(
      { _id: user_Id },
      clean_user_data,
      { new: true, runValidators: true }
    ).select('first_Name last_Name email role status middle_Name phone_Number');

    // ✅ Merge all update values for Candidate
    const updateFields = {
      ...cleanCandidate_data,
    };

    if (profile_image) {
      updateFields.profile_image = profile_image;
    }

    if (resumeUrl) {
      updateFields.resumeUrl = resumeUrl;
    }
    console.log(req.body, 'sssss');
    
    const candidatedata = await Candidate.findOneAndUpdate(
      { user_Id },
      updateFields,
      { new: true, runValidators: true }
    );

    // console.log(candidatedata, "candidate data");

    const profile = await checkProfileCompleted(candidatedata);
    // console.log(profile);

    return res.status(201).json({
      success: true,
      message: 'Candidate updated successfully.',
      user: newdatauser,
      otherDetails: candidatedata,
    });

  } catch (err) {
    console.error('Candidate update error:', err);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Internal server error.' });
    }
  }
};








// deleting a candidate controller
const deleteCandidateDataController = async (req, res) => {
  try {
    let userId = req.user.id
    if (!mongoose.Types.ObjectId.isValid(req.user.id)) {
      return res.status(400).json({ status: false, message: "Invalid user ID" });
    }
    await deleteFromCloudinary(Candidate.profile_image, "Candidate_Credentials");
    // delete candidate
    const deleted = await Candidate.findByIdAndDelete(userId);
    await Candidate.findByIdAndDelete(userId);
    if (!deleted) {
      return res.status(404).json({ status: false, message: "Candidate not found" });
    }
    res.status(200).json({ status: true, message: "Candidate deleted successfully" })

  } catch (error) {
    res.status(500).json({ error: error })
  }
}






/// crediential upload

export const updateCredentials = async (req, res) => {
  try {
    const user_Id = req.user?.id;
    console.log("Extracted user_Id:", user_Id);

    if (!user_Id) {
      return res.status(400).json({ error: 'User ID is required.' });
    }

    const user = await User.findById(user_Id);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    const existingCandidate = await Candidate.findOne({ user_Id });
    if (!existingCandidate) {
      return res.status(409).json({ error: 'Candidate profile not found.' });
    }

    // Parse credential data (if sent as JSON string from form-data)
    let credentials = req.body.credentials;
    if (typeof credentials === 'string') {
      try {
        credentials = JSON.parse(credentials);
      } catch (e) {
        return res.status(400).json({ error: 'Invalid credential JSON format.' });
      }
    }

    if (!credentials || typeof credentials !== 'object') {
      return res.status(400).json({ error: 'Credential data is required.' });
    }
    if (req.files?.documentFile) {
      return res.status(400).json({ error: 'Credential must be included.' });
    }
    // Upload documentFile if present
    if (req.file) {
      const uploadedDoc = await  uploads(
        req.file.buffer,
        req.file.originalname,
         "credient/candidate"
      );
      credentials.documentUrl = uploadedDoc;
    }
    if (req.file)
      console.log(credentials);

    // Add credential to candidate
    existingCandidate.credentials.push(credentials);

    await existingCandidate.save();
    checkProfileCompleted(existingCandidate.credentials)

    return res.status(201).json({
      success: true,
      message: 'Credential added successfully.',
      existingCandidate,
    });

  } catch (err) {
    console.error('Credential update error:', err);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Internal server error.' });
    }
  }
};

export const updateCredential = async (req, res) => {
  try {
    const user_Id = req.user?.id;
    console.log("Extracted user_Id:", user_Id);

    if (!user_Id) {
      return res.status(400).json({ error: "User ID is required." });
    }

    const user = await User.findById(user_Id);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const existingCandidate = await Candidate.findOne({ user_Id });
    if (!existingCandidate) {
      return res.status(409).json({ error: "Candidate profile not found." });
    }

    // Parse credentials if sent as JSON string
    let credential = req.body.credentials;
    if (typeof credential === "string") {
      try {
        credential = JSON.parse(credential);
      } catch (e) {
        return res.status(400).json({ error: "Invalid credential JSON format." });
      }
    }

    if (!credential || typeof credential !== "object") {
      return res.status(400).json({ error: "Credential data is required." });
    }

    // Extract only allowed fields
    const {
      type,
      issuingAuthority,
      validUntil,
      _id  // custom field name instead of _id to avoid shadowing
    } = credential;

    const sanitizedCredential = {
      type,
      issuingAuthority,
      validUntil,
    };
    const id = credential._id
    console.log(id);
    const idd = req.body.idd
    console.log(idd, 'ass');
    
    // Handle new document file upload
    if (id) {
      console.log('ssss');
      
      // Update existing credential
      const index = existingCandidate.credentials.findIndex(
        (cred) => cred._id.toString() === id.toString()
      );
      
      console.log(
        "Credential _ids in DB:",
        existingCandidate.credentials.map((cred) => cred._id.toString())
      );

      if (index > 3) {
        console.log('fff');

      }
      if (index !== -1) {
        const currentCredential = existingCandidate.credentials[index];
       
        if (currentCredential.documentUrl) {
          console.log(currentCredential.documentUrl);
          console.log('fffggggg');
          
           await deleteFile(currentCredential.documentUrl); 
        }
        // Replace file if new one is uploaded
        if (req.file) {
          
          const replacedFile = await uploads(
            req.file.buffer,
            req.file.originalname,
            "crediential/candidate"
          );
          sanitizedCredential.documentUrl = replacedFile;
        }

        // Merge update
        existingCandidate.credentials[index] = {
          ...currentCredential.toObject(),
          ...sanitizedCredential,
        };
      } else {
        return res.status(404).json({ error: "Credential not found for update." });
      }

    } else {
      // ✅ Check limit
      if (existingCandidate.credentials.length >= 4) {
        return res.status(400).json({ error: "You can only upload up to 4 credentials." });
      }
      // Add new credential
      if (req.file) {
        const uploadedDoc = await uploads(
          req.file.buffer,
          req.file.originalname,
          "crediential/candidate"
        );
        sanitizedCredential.documentUrl = uploadedDoc;
      }

      existingCandidate.credentials.push(sanitizedCredential);
    }

    await existingCandidate.save();
    await checkProfileCompleted(existingCandidate);

    return res.status(201).json({
      success: true,
      message: id ? "Credential updated successfully." : "Credential added successfully.",
      candidate: existingCandidate,
    });

  } catch (err) {
    console.error("Credential update error:", err);
    if (!res.headersSent) {
      res.status(500).json({ error: "Internal server error." });
    }
  }
};
export const deleteCredential = async (req, res) => {
  try {
    const user_Id = req.user?.id;
    const credentialId = req.params.id; // Ensure your route is /api/candidates/deletecredential/:id
    console.log(credentialId);

    if (!user_Id) {
      return res.status(400).json({ error: "User ID is required." });
    }

    const user = await User.findById(user_Id);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const existingCandidate = await Candidate.findOne({ user_Id });
    if (!existingCandidate) {
      return res.status(409).json({ error: "Candidate profile not found." });
    }


    // Find credentlogial by _id
    const index = existingCandidate.credentials.findIndex(
      (cred) => cred._id.toString() === credentialId.toString()
    );

    if (index === -1) {
      return res.status(404).json({ error: "Credential not found." });
    }

    const credentialToDelete = existingCandidate.credentials[index];

    // Optional: Delete file from Cloudinary
    if (credentialToDelete.documentUrl) {
      await deleteFromCloudinary(credentialToDelete.documentUrl, "Candidate_Credentials");
    }

    // Remove the credential from the array
    existingCandidate.credentials.splice(index, 1);

    await existingCandidate.save();
    await checkProfileCompleted(existingCandidate);

    return res.status(200).json({
      success: true,
      message: "Credential deleted successfully.",
      candidate: existingCandidate,
    });

  } catch (err) {
    console.error("Credential delete error:", err);
    if (!res.headersSent) {
      res.status(500).json({ error: "Internal server error." });
    }
  }
};









//// job sugestion


export const suggestJobs = async (req, res) => {
  try {
    const user_Id = req.user?.id;

    if (!user_Id) {
      return res.status(400).json({ error: "User ID is required." });
    }

    const candidate = await Candidate.findOne({ user_Id });
    if (!candidate) {
      return res.status(404).json({ error: "Candidate not found." });
    }

    const candidateSkills = candidate.parsed_ResumeData?.skills || [];
    const candidateExperience = candidate.parsed_ResumeData?.experience || [];

    // Calculate total years of experience
    const totalExperienceYears = candidateExperience.reduce((acc, exp) => {
      const start = new Date(exp.startDate);
      const end = new Date(exp.endDate || Date.now());
      const years = (end - start) / (1000 * 60 * 60 * 24 * 365); // years
      return acc + (isNaN(years) ? 0 : years);
    }, 0);

    // Fetch only open and approved jobs
    const allJobs = await JobPost.find({ status: "Open", isApproved: true });

    const suggested = allJobs.map((job) => {
      const matchedSkills = job.skillsRequired?.filter(skill =>
        candidateSkills.includes(skill)
      ) || [];

      const experienceMatch = !job.requiredExperience?.minYears || totalExperienceYears >= job.requiredExperience.minYears;
      const jobTypeMatch = candidate.credentials.some(cred =>
        job.requiredCredentials?.some(req =>
          req.name === cred.type && req.issuingAuthority === cred.issuingAuthority
        )
      );

      // Score based on match criteria
      let score = 0;
      if (matchedSkills.length > 0) score += matchedSkills.length;
      if (experienceMatch) score += 2;
      if (jobTypeMatch) score += 1;

      return {
        job,
        score,
        matchedSkills,
        experienceMatch,
        jobTypeMatch,
      };
    });

    // Only return jobs with score > 0 (optional)
    const suggestions = suggested
      .filter(j => j.score > 0) // remove this line to include all open jobs
      .sort((a, b) => b.score - a.score);

    return res.status(200).json({
      success: true,
      message: "Job suggestions based on your profile.",
      suggestions,
    });

  } catch (err) {
    console.error("Job suggestion error:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
};

///favorate jobpost 
export const addJobToFavorites = async (req, res) => {
  try {
    const user_Id = req.user?.id;
    const { jobId } = req.params;

    if (!user_Id || !jobId) {
      return res.status(400).json({ error: "User ID and job ID are required." });
    }

    const candidate = await Candidate.findOne({ user_Id });
    if (!candidate) {
      return res.status(400).json({ error: "Candidate not complete is profile." });
    }
    const jobExist = await JobPost.findOne({ _id: jobId });
    if (!jobExist) {
      return res.status(400).json({ error: " no job fund by id." });
    }

    if (!candidate.favoriteJobs.includes(jobExist._id)) {
      candidate.favoriteJobs.push(jobId);
      await candidate.save();
    }

    res.status(200).json({ success: true, message: "Job added to favorites." });

  } catch (err) {
    console.error("Add to favorites error:", err);
    res.status(500).json({ error: "Internal server error." });
  }
};

export const getFavoritesjob = async (req, res) => {
  const user_Id = req.user?.id;

  if (!user_Id) {
    return res.status(400).json({ error: "User ID is required." });
  }

  const candidate = await Candidate.findOne({ user_Id });

  if (!candidate) {
    return res.status(400).json({ error: "Candidate has not completed their profile." });
  }

  if (!candidate.favoriteJobs || candidate.favoriteJobs.length === 0) {
    return res.status(404).json({ error: "No favorite jobs found." });
  }

  let updated = false;

  const jobs = await Promise.all(
    candidate.favoriteJobs.map(async (jobId) => {
      const job = await JobPost.findById(jobId);
      if (job && job.status === 'Closed') {
        console.log(`Removing closed job: ${job.title}`);
        // Remove from favorites
        candidate.favoriteJobs = candidate.favoriteJobs.filter(
          (id) => id.toString() !== jobId.toString()
        );
        updated = true;
        return null;
      }
      return job;
    })
  );

  // Save candidate only if updates were made
  if (updated) {
    await candidate.save();
  }

  // Filter out removed jobs
  const validJobs = jobs.filter((job) => job !== null);

  res.status(200).json({
    success: true,
    favoriteJobs: validJobs,
  });

}

export const deleteFavoritesjob = async (req, res) => {
  try {
    const user_Id = req.user?.id;
    const { job_Id } = req.params;

    if (!user_Id || !job_Id) {
      return res.status(400).json({ error: "User ID and Job ID are required." });
    }

    const candidate = await Candidate.findOne({ user_Id });

    if (!candidate) {
      return res.status(404).json({ error: "Candidate has not completed their profile." });
    }

    const favoriteJobs = candidate.favoriteJobs || [];

    if (favoriteJobs.length === 0) {
      return res.status(404).json({ error: "No favorite jobs found." });
    }

    const updatedJobs = favoriteJobs.filter(
      (jobId) => jobId.toString() !== job_Id.toString()
    );

    if (updatedJobs.length === favoriteJobs.length) {
      return res.status(404).json({ error: "Job not found in favorites." });
    }

    candidate.favoriteJobs = updatedJobs;
    await candidate.save();

    return res.status(200).json({
      success: true,
      message: "Job removed from favorites.",
      favoriteJobs: updatedJobs,
    });

  } catch (err) {
    console.error("Error deleting favorite job:", err);
    res.status(500).json({ error: "Internal server error." });
  }
};







export { deleteCandidateDataController, getCandidate, applicationHistory, createApplication }


// function for checking if if candidate profile is complete
const checkProfileCompleted = async (candidateProfile) => {
  const {
    full_name,
    location,
    resumeUrl,
    parsed_ResumeData = {},
    credentials = [],
    user_Id
  } = candidateProfile;

  // Track missing fields
  const missingFields = [];

  // Check personal info
  if (!full_name) missingFields.push("full_name");

  if (!location?.city) missingFields.push("location.city");
  if (!location?.state) missingFields.push("location.state");
  if (!location?.country) missingFields.push("location.country");

  // Check resume details
  if (!resumeUrl) missingFields.push("resumeUrl");

  if (!Array.isArray(parsed_ResumeData.skills) || parsed_ResumeData.skills.length === 0)
    missingFields.push("parsed_ResumeData.skills");

  if (!Array.isArray(parsed_ResumeData.education) || parsed_ResumeData.education.length === 0)
    missingFields.push("parsed_ResumeData.education");

  if (!Array.isArray(parsed_ResumeData.experience) || parsed_ResumeData.experience.length === 0)
    missingFields.push("parsed_ResumeData.experience");

  if (!Array.isArray(credentials) || credentials.length === 0)
    missingFields.push("credentials");

  const profileCompleted = missingFields.length === 0;

  if (profileCompleted) {
    console.log("✅ Profile is complete!");
  } else {
    console.log("⚠️ Profile incomplete. Missing fields:", missingFields.join(", "));
  }
  console.log(profileCompleted);

  const updatedCandidate = await Candidate.findOneAndUpdate(
    { user_Id },
    { profile_Completed: profileCompleted },
    { new: true }
  );

  return updatedCandidate;
};


