import mongoose from "mongoose";
import Employer from "../model/Employer.js";
import { secureEmployerData } from "../utils/employerSanitizeUtils.js";
// import { uploadToCloudinary } from "../utils/uplaod.js";
import Application from "../model/Application.js";
import Candidate from "../model/Candidate.js";
import JobPost from "../model/JobPost.js";
import JobView from "../model/JobView.js";

/**
 * Create Employer with optional profile image upload
 */

export const getAllEmployers = async (req, res) => {
  try {
    let cleanData;

    // Clone body to avoid mutating req.body
    const body = { ...req.body };

    // Parse JSON strings into objects if they exist
    if (body.contact_Person) {
      try {
        body.contact_Person = JSON.parse(body.contact_Person);
      } catch (e) {
        throw new Error('"contact_Person" is not valid JSON');
      }
    }

    if (body.address) {
      try {
        body.address = JSON.parse(body.address);
      } catch (e) {
        throw new Error('"address" is not valid JSON');
      }
    }

    // If image uploaded, upload to Cloudinary
    if (req.file) {
      const imageUrl = await uploadToCloudinary(
        req.file.buffer,
        req.file.originalname,
        "employer_profiles"
      );
      body.profile_image = imageUrl;
    }

    // Now validate and sanitize data
    cleanData = await secureEmployerData(body);

    // Create employer
    const employer = new Employer(cleanData);
    await employer.save();

    res.status(201).json({
      success: true,
      message: "Employer created successfully",
      data: employer,
    });
  } catch (error) {
    console.error(`[ERROR] createEmployer: ${error.message}`, {
      body: req.body,
    });

    if (error.code === 11000 && error.keyPattern?.user_Id === 1) {
      return res.status(400).json({
        success: false,
        error: "An employer already exists for this user.",
      });
    }

    res.status(400).json({
      success: false,
      error: error.message.includes("Validation failed")
        ? error.message
        : `Validation failed: ${error.message}`,
    });
  }
};
import { uploads, deleteFile } from '../utils/uplaod.js';



export const createEmployer = async (req, res) => {
  try {
    let cleanData;

    // Clone body to avoid mutating req.body
    const body = { ...req.body };

    // Always set user_Id from authenticated user
    body.user_Id = req.user._id.toString();

    // Parse JSON strings into objects if they exist
    if (body.contact_Person) {
      try {
        body.contact_Person = JSON.parse(body.contact_Person);
      } catch (e) {
        throw new Error('"contact_Person" is not valid JSON');
      }
    }

    if (body.address) {
      try {
        body.address = JSON.parse(body.address);
      } catch (e) {
        throw new Error('"address" is not valid JSON');
      }
    }

    if (body.social_media) {
      try {
        body.social_media = JSON.parse(body.social_media);
      } catch (e) {
        throw new Error('"social_media" is not valid JSON');
      }
    }

    if (body.ats_Preferences) {
      try {
        body.ats_Preferences = JSON.parse(body.ats_Preferences);
      } catch (e) {
        throw new Error('"ats_Preferences" is not valid JSON');
      }
    }

    if (body.subscription_Plan) {
      try {
        body.subscription_Plan = JSON.parse(body.subscription_Plan);
      } catch (e) {
        throw new Error('"subscription_Plan" is not valid JSON');
      }
    }

    if (body.billing_Info) {
      try {
        body.billing_Info = JSON.parse(body.billing_Info);
      } catch (e) {
        throw new Error('"billing_Info" is not valid JSON');
      }
    }

    // If image uploaded, upload to Cloudinary
    if (req.file) {
      const imageUrl = await uploads(
        req.file.buffer,
        req.file.originalname,
        "image/employer/profileImage"
      );
      body.profile_image = imageUrl;
    }

    // Now validate and sanitize data
    cleanData = await secureEmployerData(body);

    // Create employer
    const employer = new Employer(cleanData);
    await employer.save();

    res.status(201).json({
      success: true,
      message: "Employer created successfully",
      data: employer,
    });
  } catch (error) {
    console.error(`[ERROR] createEmployer: ${error.message}`, {
      body: req.body,
    });

    if (error.code === 11000 && error.keyPattern?.user_Id === 1) {
      return res.status(400).json({
        success: false,
        error: "An employer already exists for this user.",
      });
    }

    res.status(400).json({
      success: false,
      error: error.message.includes("Validation failed")
        ? error.message
        : `Validation failed: ${error.message}`,
    });
  }
};

// ✅ Get Employer by ID
export const getEmployerById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        error: "Invalid employer ID format",
      });
    }

    const employer = await Employer.findById(id).populate("user_Id");
    if (!employer) {
      return res.status(404).json({
        success: false,
        error: "Employer not found",
      });
    }

    res.json({
      success: true,
      data: employer,
    });
  } catch (error) {
    console.error(`[ERROR] getEmployerById: ${error.message}`, {
      employerId: req.params.id,
    });

    res.status(500).json({
      success: false,
      error: "Failed to fetch employer",
    });
  }
};

// ✅ Update Employer
/**
 * Update Employer with optional profile image upload
 */
export const updateEmployer = async (req, res) => {
  try {
    const userId = req.user._id;

    // Find the employer profile for this user
    const employer = await Employer.findOne({ user_Id: userId });
    if (!employer) {
      return res.status(404).json({
        success: false,
        error: "Employer profile not found for this user",
      });
    }

    let cleanData;
    const body = { ...req.body };
    body.user_Id = userId.toString(); 

    // Parse JSON strings into objects if they exist
    try {
      if (body.contact_Person && typeof body.contact_Person === 'string') {
        body.contact_Person = JSON.parse(body.contact_Person);
      }
    } catch {
      throw new Error('"contact_Person" must be valid JSON');
    }
    
    try {
      if (body.address && typeof body.address === 'string') {
        body.address = JSON.parse(body.address);
      }
    } catch {
      throw new Error('"address" must be valid JSON');
    }

    try {
      if (body.social_media && typeof body.social_media === 'string') {
        body.social_media = JSON.parse(body.social_media);
      }
    } catch {
      throw new Error('"social_media" must be valid JSON');
    }
    
    try {
      if (body.ats_Preferences && typeof body.ats_Preferences === 'string') {
        body.ats_Preferences = JSON.parse(body.ats_Preferences);
      }
    } catch {
      throw new Error('"ats_Preferences" must be valid JSON');
    }

    try {
      if (body.subscription_Plan && typeof body.subscription_Plan === 'string') {
        body.subscription_Plan = JSON.parse(body.subscription_Plan);
      }
    } catch {
      throw new Error('"subscription_Plan" must be valid JSON');
    }

    try {
      if (body.billing_Info && typeof body.billing_Info === 'string') {
        body.billing_Info = JSON.parse(body.billing_Info);
      }
    } catch {
      throw new Error('"billing_Info" must be valid JSON');
    }

    // If image uploaded, process it
    if (req.file) {
      if (employer.profile_image) {
        await deleteFile(employer.profile_image); 
      }
      const imageUrl = await uploads(
        req.file.buffer,
        req.file.originalname,
      "image/employer/profileImage"
      );
      body.profile_image = imageUrl;
    }

    // Now validate and sanitize data
    cleanData = await secureEmployerData(body);

    // Block updating immutable fields
    delete cleanData._id;
    delete cleanData.user_Id;

    // Update the employer document directly
    Object.keys(cleanData).forEach((key) => {
      employer[key] = cleanData[key];
    });

    // Save the updated employer
    const updatedEmployer = await employer.save();

    res.json({
      success: true,
      message: "Employer updated successfully",
      data: updatedEmployer,
    });
  } catch (error) {
    console.error(`[ERROR] updateEmployer: ${error.message}`, {
      employerId: req.user._id,
      body: req.body,
    });

    if (error.code === 11000 && error.keyPattern?.user_Id === 1) {
      return res.status(400).json({
        success: false,
        error: "An employer already exists for this user.",
      });
    }

    res.status(400).json({
      success: false,
      error: error.message.includes("Validation failed")
        ? error.message
        : `Validation failed: ${error.message}`,
    });
  }
};




// ✅ Delete Employer
export const deleteEmployer = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        error: "Invalid employer ID format",
      });
    }

    const employer = await Employer.findByIdAndDelete(id);
    if (!employer) {
      return res.status(404).json({
        success: false,
        error: "Employer not found",
      });
    }

    res.status(204).send(); // No content
  } catch (error) {
    console.error(`[ERROR] deleteEmployer: ${error.message}`, {
      employerId: req.params.id,
    });

    res.status(500).json({
      success: false,
      error: "Failed to delete employer",
    });
  }
};

/**
 * Get all applications for the authenticated employer
 * Returns detailed candidate and job info for each application
 */
// export const getEmployerApplications = async (req, res) => {
//   try {
//     // Find employer by user_Id (from authenticated employer)
//     const employer = await Employer.findOne({ user_Id: req.user._id });
//     if (!employer) {
//       return res.status(404).json({ success: false, error: "Employer not found" });
//     }

//     // Find all applications for this employer
//     const applications = await Application.find({ employerId: employer._id })
//       .populate({
//         path: "candidateId",
//         model: "Candidate",
//         populate: [
//           { path: "applications", model: "Application" }
//         ]
//       })
//       .populate({
//         path: "jobId",
//         model: "JobPost",
//         select: "title"
//       });

//     // Build response array
//     const result = applications.map(app => ({
//       applicationId: app._id,
//       currentStage: app.currentStage,
//       appliedDate: app.createdAt,
//       interviewSchedule: app.candidateId?.interview_Schedule || [],
//       feedback: app.feedback || [],
//       assessment: app.assessments || [],
//       trainingProgress: app.candidateId?.training_Progress || [],
//       jobTitle: app.jobId?.title || null,
//       resumeUrl: app.candidateId?.resumeUrl || null,
//       candidateResumeData: app.candidateId?.parsed_ResumeData || {},
//       candidateCredentials: app.candidateId?.credentials || [],
//       candidateApplications: app.candidateId?.applications || [],
//       candidateId: app.candidateId?._id,
//       candidateFullName: app.candidateId?.full_name,
//       candidateProfileImage: app.candidateId?.profile_image,
//       candidateLocation: app.candidateId?.location,
//     }));

//     res.json({
//       success: true,
//       totalApplications: applications.length,
//       applications: result,
//     });
//   } catch (error) {
//     console.error("[ERROR] getEmployerApplications:", error);
//     res.status(500).json({ success: false, error: "Failed to fetch applications" });
//   }
// };

/**
 * FUNCTION 1: Get Employer Dashboard Overview with View Analytics
 * Returns dashboard statistics, metrics, and detailed view analytics
 */
export const getEmployerDashboardOverview = async (req, res) => {
  try {
    // Validate user authentication
    if (!req.user || !req.user._id) {
      return res.status(401).json({
        success: false,
        error: "Authentication required.",
      });
    }

    // Find employer with explicit user ID matching
    const employer = await Employer.findOne({ 
      user_Id: req.user._id.toString()
    });
    
    if (!employer) {
      return res.status(404).json({
        success: false,
        error: "Employer profile not found.",
      });
    }

    // Double-check employer ownership
    if (employer.user_Id.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        error: "Access denied. Unauthorized employer access.",
      });
    }

    // Get all jobs for this employer
    const jobs = await JobPost.find({ employerId: employer._id });

    // Directly get applications for this employer using employerId field
    const applications = await Application.find({ 
      employerId: employer._id  // Use the employerId field directly
    });

    console.log(`[DEBUG] Applications found for employer ${employer._id}:`, applications.length);

    // Calculate new candidates to review (Applied status in last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const newCandidatesToReview = await Application.countDocuments({
      employerId: employer._id,  // Use employerId directly instead of jobIds
      currentStage: 'Applied',
      createdAt: { $gte: sevenDaysAgo }
    });

    // Get today's interviews
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
    
    const todayInterviews = await Application.aggregate([
      { $match: { employerId: employer._id } },  // Use employerId directly
      { $unwind: "$interviewSchedule" },
      {
        $match: {
          "interviewSchedule.start": {
            $gte: startOfDay,
            $lt: endOfDay
          }
        }
      },
      { $count: "total" }
    ]);

    const scheduledForToday = todayInterviews[0]?.total || 0;

    // Count open jobs
    const totalJobsOpened = await JobPost.countDocuments({
      employerId: employer._id,
      status: 'Open'
    });

    // Total applications received
    const totalJobsApplied = applications.length;

    // Total unique applicants (same logic as getAllApplicantsSummary)
    const uniqueApplicantIds = [...new Set(applications.map(app => app.candidateId.toString()))];
    const totalApplicants = uniqueApplicantIds.length;

    // Additional metrics
    const totalJobs = jobs.length;
    const activeJobs = jobs.filter(job => job.status === 'Open').length;
    const pausedJobs = jobs.filter(job => job.status === 'Paused').length;
    const closedJobs = jobs.filter(job => job.status === 'Closed').length;

    // Applications by stage (use employerId directly)
    const applicationsByStage = await Application.aggregate([
      { $match: { employerId: employer._id } },  // Use employerId directly
      {
        $group: {
          _id: "$currentStage",
          count: { $sum: 1 }
        }
      }
    ]);

    const stageStats = {};
    applicationsByStage.forEach(stage => {
      stageStats[stage._id] = stage.count;
    });

    // Jobs by employment type
    const jobsByEmploymentType = await JobPost.aggregate([
      { $match: { employerId: employer._id } },
      {
        $group: {
          _id: "$employmentType",
          count: { $sum: 1 }
        }
      }
    ]);

    const employmentTypeStats = {};
    jobsByEmploymentType.forEach(type => {
      employmentTypeStats[type._id] = type.count;
    });

    // ===== VIEW ANALYTICS SECTION =====
    
    // Calculate date range for current week (Monday to Sunday)
    const now = new Date();
    const currentDay = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const mondayOffset = currentDay === 0 ? -6 : 1 - currentDay; // Adjust for Sunday being 0
    
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() + mondayOffset);
    startOfWeek.setHours(0, 0, 0, 0);
    
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    console.log(`[DEBUG] Week range: ${startOfWeek.toISOString()} to ${endOfWeek.toISOString()}`);

    // Get total views from JobView model
    const totalJobViews = await JobView.countDocuments({
      employerId: employer._id
    });

    // Get recent views (last 7 days)
    const recentViews = await JobView.countDocuments({
      employerId: employer._id,
      viewedAt: { $gte: sevenDaysAgo }
    });

    // Get weekly view analytics
    const weeklyViews = await JobView.aggregate([
      {
        $match: {
          employerId: employer._id,
          viewedAt: {
            $gte: startOfWeek,
            $lte: endOfWeek
          }
        }
      },
      {
        $group: {
          _id: {
            dayOfWeek: { $dayOfWeek: "$viewedAt" } // 1 = Sunday, 2 = Monday, etc.
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { "_id.dayOfWeek": 1 }
      }
    ]);

    // Convert MongoDB day numbers to our desired format (Monday = 1, Sunday = 7)
    const dayMapping = {
      1: 'sun', // Sunday
      2: 'mon', // Monday  
      3: 'tue', // Tuesday
      4: 'wed', // Wednesday
      5: 'thu', // Thursday
      6: 'fri', // Friday
      7: 'sat'  // Saturday
    };

    // Initialize weekly view object with all days set to 0
    const weeklyViewsFormatted = {
      mon: 0,
      tue: 0,
      wed: 0,
      thu: 0,
      fri: 0,
      sat: 0,
      sun: 0
    };

    // Populate with actual view counts
    weeklyViews.forEach(dayData => {
      const dayName = dayMapping[dayData._id.dayOfWeek];
      if (dayName) {
        weeklyViewsFormatted[dayName] = dayData.count;
      }
    });

    // Get view analytics per job
    const jobViewAnalytics = await Promise.all(
      jobs.map(async (job) => {
        const jobTotalViews = await JobView.countDocuments({
          jobId: job._id,
          employerId: employer._id
        });

        const jobRecentViews = await JobView.countDocuments({
          jobId: job._id,
          employerId: employer._id,
          viewedAt: { $gte: sevenDaysAgo }
        });

        const jobWeeklyViews = await JobView.aggregate([
          {
            $match: {
              jobId: job._id,
              employerId: employer._id,
              viewedAt: {
                $gte: startOfWeek,
                $lte: endOfWeek
              }
            }
          },
          {
            $group: {
              _id: {
                dayOfWeek: { $dayOfWeek: "$viewedAt" }
              },
              count: { $sum: 1 }
            }
          }
        ]);

        const jobWeeklyFormatted = {
          mon: 0, tue: 0, wed: 0, thu: 0, fri: 0, sat: 0, sun: 0
        };

        jobWeeklyViews.forEach(dayData => {
          const dayName = dayMapping[dayData._id.dayOfWeek];
          if (dayName) {
            jobWeeklyFormatted[dayName] = dayData.count;
          }
        });

        return {
          jobId: job._id,
          jobTitle: job.title,
          totalViews: jobTotalViews,
          recentViews: jobRecentViews,
          weeklyBreakdown: jobWeeklyFormatted
        };
      })
    );

    res.json({
      success: true,
      message: "Dashboard overview with view analytics retrieved successfully",
      data: {
        // Basic metrics
        newCandidatesToReview,
        scheduledForToday,
        totalJobsOpened,
        totalJobsApplied,
        totalApplicants,
        totalJobs,
        activeJobs,
        pausedJobs,
        closedJobs,
        
        // Application stages
        applicationsByStage: {
          Applied: stageStats.Applied || 0,
          Shortlisted: stageStats.Shortlisted || 0,
          Interviewing: stageStats.Interviewing || 0,
          Offered: stageStats.Offered || 0,
          Rejected: stageStats.Rejected || 0,
          Hired: stageStats.Hired || 0,
        },
        
        // Employment types
        jobsByEmploymentType: {
          "Full-time": employmentTypeStats["Full-time"] || 0,
          "Part-time": employmentTypeStats["Part-time"] || 0,
          "Contract": employmentTypeStats["Contract"] || 0,
          "Temporary": employmentTypeStats["Temporary"] || 0,
          "Internship": employmentTypeStats["Internship"] || 0,
        },

        // View Analytics
        viewAnalytics: {
          totalJobViews: totalJobViews,
          recentViews: recentViews, // Last 7 days
          weeklyBreakdown: weeklyViewsFormatted,
          weekRange: {
            start: startOfWeek.toISOString().split('T')[0], // YYYY-MM-DD format
            end: endOfWeek.toISOString().split('T')[0]
          },
          jobViewBreakdown: jobViewAnalytics
        }
      }
    });

  } catch (error) {
    console.error("[ERROR] getEmployerDashboardOverview:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch dashboard overview",
      details: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
};/**
 * FUNCTION 2: Get Detailed Applicant Information
 * Returns comprehensive applicant details including personal, professional, and social info
 */
export const getApplicantDetails = async (req, res) => {
  try {
    const { applicationId } = req.params;

    // Find employer
    const employer = await Employer.findOne({ user_Id: req.user._id });
    if (!employer) {
      return res.status(404).json({
        success: false,
        error: "Employer profile not found.",
      });
    }

    // Find the application and populate candidate details
    const application = await Application.findOne({
      _id: applicationId,
      employerId: employer._id // Direct employer check for better security
    })
      .populate({
        path: 'candidateId',
        populate: {
          path: 'user_Id',
          select: 'email phone_Number' // Removed social_media from user selection
        }
      })
      .populate('jobId', 'title department employerId');

    if (!application) {
      return res.status(404).json({
        success: false,
        error: "Application not found or access denied",
      });
    }

    const candidate = application.candidateId;
    const user = candidate.user_Id;

    // Personal Information
    const personalInfo = {
      fullName: candidate.full_name,
      gender: candidate.gender,
      dateOfBirth: candidate.date_of_birth,
      location: candidate.location,
      profileImage: candidate.profile_image,
      email: user?.email,
      phone: user?.phone_Number,
    };

    // Professional Information
    const professionalInfo = {
      currentJob: candidate.parsed_ResumeData?.experience?.[0]?.jobTitle || null,
      experienceInYears: candidate.parsed_ResumeData?.experience?.length || 0,
      highestQualification: candidate.parsed_ResumeData?.education?.[0]?.degree || null,
      skillSet: candidate.parsed_ResumeData?.skills || [],
      experience: candidate.parsed_ResumeData?.experience || [],
      education: candidate.parsed_ResumeData?.education || [],
      credentials: candidate.credentials || [],
    };

    // Social Handles - Only from Candidate model
    const socialHandles = {
      instagram: candidate.social_media?.instagram || null,
      twitter: candidate.social_media?.twitter || null,
      facebook: candidate.social_media?.facebook || null,
      linkedin: candidate.social_media?.linkedin || null,
      youtube: candidate.social_media?.youtube || null,
      website: candidate.social_media?.website || null,
      email: user?.email, // Keep email and phone from user
      phone: user?.phone_Number,
    };

    // Resume URL
    const resumeUrl = application.resumeUrl || candidate.resumeUrl;

    // Interview Schedule
    const interviewSchedule = application.interviewSchedule?.map(interview => ({
      candidateName: candidate.full_name,
      startDate: interview.start,
      endDate: interview.end,
      interviewer: interview.interviewer,
      status: interview.status,
      notes: interview.notes,
    })) || [];

    res.json({
      success: true,
      message: "Applicant details retrieved successfully",
      data: {
        applicationId: application._id,
        jobTitle: application.jobId?.title,
        personalInfo,
        professionalInfo,
        socialHandles,
        resumeUrl,
        interviewSchedule,
        applicationData: {
          currentStage: application.currentStage,
          appliedDate: application.createdAt,
          atsScore: application.atsScore,
          coverLetter: application.coverLetter,
          feedback: application.feedback,
          assessments: application.assessments,
        }
      }
    });

  } catch (error) {
    console.error("[ERROR] getApplicantDetails:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch applicant details",
      details: error.message,
    });
  }
};

/**
 * FUNCTION 3: Get All Applicants Summary
 * Returns summary list of all applicants with basic info and actions
 */
export const getAllApplicantsSummary = async (req, res) => {
  try {
    // Validate user authentication
    if (!req.user || !req.user._id) {
      return res.status(401).json({
        success: false,
        error: "Authentication required.",
      });
    }

    // Find employer with explicit user ID matching
    const employer = await Employer.findOne({ 
      user_Id: req.user._id.toString()
    });
    
    if (!employer) {
      return res.status(404).json({
        success: false,
        error: "Employer profile not found.",
      });
    }

    // Double-check employer ownership
    if (employer.user_Id.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        error: "Access denied. Unauthorized employer access.",
      });
    }

    // Directly get applications for this employer using employerId field
    const applications = await Application.find({ 
      employerId: employer._id  // Use the employerId field directly
    })
      .populate('candidateId', 'full_name profile_image')
      .populate('jobId', 'title')
      .sort({ createdAt: -1 });

    console.log(`[DEBUG] Applications found for employer ${employer._id}:`, applications.length);

    // Format applicant data
    const applicants = applications.map(application => ({
      applicationId: application._id,
      candidateId: application.candidateId._id,
      fullName: application.candidateId.full_name,
      profileImage: application.candidateId.profile_image,
      hiringStatus: application.currentStage,
      appliedDate: application.createdAt,
      jobRole: application.jobId.title,
      atsScore: application.atsScore,
      action: {
        viewApplication: `/applications/${application._id}`,
        updateStatus: `/applications/${application._id}/status`,
        scheduleInterview: `/applications/${application._id}/interview`,
      }
    }));

    const totalApplicants = applicants.length;

    res.json({
      success: true,
      message: "Applicants summary retrieved successfully",
      data: {
        totalApplicants,
        applicants
      }
    });

  } catch (error) {
    console.error("[ERROR] getAllApplicantsSummary:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch applicants summary",
      details: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
};

/**


 * FUNCTION 4: Get Job Listings with Details (Simplified - No View Analytics)
 * Returns all job listings with comprehensive details and statistics
 */
export const getJobListings = async (req, res) => {
  try {
    // Validate user authentication
    if (!req.user || !req.user._id) {
      return res.status(401).json({
        success: false,
        error: "Authentication required.",
      });
    }

    // Find employer
    const employer = await Employer.findOne({ user_Id: req.user._id });
    if (!employer) {
      return res.status(404).json({
        success: false,
        error: "Employer profile not found.",
      });
    }

    // Double-check employer ownership
    if (employer.user_Id.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        error: "Access denied. Unauthorized employer access.",
      });
    }

    // Get all jobs for this employer
    const jobs = await JobPost.find({ employerId: employer._id })
      .sort({ createdAt: -1 });

    // Get detailed job information with application statistics
    const jobListings = await Promise.all(
      jobs.map(async (job) => {
        // Get application statistics for this job AND this employer (double security)
        const totalApplications = await Application.countDocuments({ 
          jobId: job._id,
          employerId: employer._id  // Add employer authentication
        });
        
        const acceptedApplications = await Application.countDocuments({ 
          jobId: job._id,
          employerId: employer._id,  // Add employer authentication
          currentStage: { $in: ['Offered', 'Hired'] }
        });
        
        const hiredApplications = await Application.countDocuments({ 
          jobId: job._id,
          employerId: employer._id,  // Add employer authentication
          currentStage: 'Hired'
        });

        return {
          jobId: job._id,
          role: job.title,
          department: job.department,
          status: job.status,
          datePosted: job.createdAt,
          dueDate: job.applicationDeadline,
          jobType: job.employmentType,
          location: job.location,
          salaryRange: job.salaryRange,
          requiredExperience: job.requiredExperience,
          skillsRequired: job.skillsRequired,
          totalApplicants: totalApplications,
          totalAccepted: acceptedApplications,
          totalHired: hiredApplications,
          isApproved: job.isApproved,
          shift: job.shift,
          requiredCredentials: job.requiredCredentials,
        };
      })
    );

    // Calculate date range for job listings
    const dateRange = {
      earliest: jobs.length > 0 ? Math.min(...jobs.map(job => new Date(job.createdAt))) : null,
      latest: jobs.length > 0 ? Math.max(...jobs.map(job => new Date(job.createdAt))) : null,
    };

    res.json({
      success: true,
      message: "Job listings retrieved successfully",
      data: {
        totalJobs: jobs.length,
        dateRange: {
          start: dateRange.earliest ? new Date(dateRange.earliest) : null,
          end: dateRange.latest ? new Date(dateRange.latest) : null,
        },
        jobListings
      }
    });

  } catch (error) {
    console.error("[ERROR] getJobListings:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch job listings",
      details: error.message,
    });
  }
};

/**
 * FUNCTION 5: Get Applications by Hiring Stage
 * Returns applicants grouped by hiring stage with detailed information
 */
export const getApplicationsByHiringStage = async (req, res) => {
  try {
    // Validate user authentication
    if (!req.user || !req.user._id) {
      return res.status(401).json({
        success: false,
        error: "Authentication required.",
      });
    }

    // Find employer
    const employer = await Employer.findOne({ user_Id: req.user._id });
    if (!employer) {
      return res.status(404).json({
        success: false,
        error: "Employer profile not found.",
      });
    }

    // Double-check employer ownership
    if (employer.user_Id.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        error: "Access denied. Unauthorized employer access.",
      });
    }

    // Get all applications grouped by hiring stage using employerId directly
    const applicationsByStage = await Application.aggregate([
      { $match: { employerId: employer._id } }, // Use employerId directly for authentication
      {
        $lookup: {
          from: 'candidates',
          localField: 'candidateId',
          foreignField: '_id',
          as: 'candidate'
        }
      },
      {
        $lookup: {
          from: 'jobposts',
          localField: 'jobId',
          foreignField: '_id',
          as: 'job'
        }
      },
      { $unwind: '$candidate' },
      { $unwind: '$job' },
      {
        $group: {
          _id: '$currentStage',
          applications: {
            $push: {
              applicationId: '$_id',
              candidateId: '$candidateId',
              fullName: '$candidate.full_name',
              profileImage: '$candidate.profile_image',
              appliedDate: '$createdAt',
              jobTitle: '$job.title',
              atsScore: '$atsScore',
              resumeUrl: '$resumeUrl',
              coverLetter: '$coverLetter',
              feedback: '$feedback',
              interviewSchedule: '$interviewSchedule',
              isWithdrawn: '$isWithdrawn'
            }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    // Also get applications with populated data for easier access using employerId
    const allApplications = await Application.find({ employerId: employer._id })
      .populate('candidateId', 'full_name profile_image')
      .populate('jobId', 'title')
      .sort({ createdAt: -1 });

    console.log(`[DEBUG] Applications found for employer ${employer._id}:`, allApplications.length);

    // Format the response with hiring stages
    const hiringStages = {
      Applied: { count: 0, applicants: [] },
      Shortlisted: { count: 0, applicants: [] },
      Interviewing: { count: 0, applicants: [] },
      Offered: { count: 0, applicants: [] },
      Rejected: { count: 0, applicants: [] },
      Hired: { count: 0, applicants: [] }
    };

    // Populate hiring stages with data
    applicationsByStage.forEach(stage => {
      if (hiringStages[stage._id]) {
        hiringStages[stage._id] = {
          count: stage.count,
          applicants: stage.applications.map(app => ({
            applicationId: app.applicationId,
            candidateId: app.candidateId,
            fullName: app.fullName,
            profileImage: app.profileImage,
            appliedDate: app.appliedDate,
            jobTitle: app.jobTitle,
            atsScore: app.atsScore,
            action: {
              viewApplication: `/applications/${app.applicationId}`,
              updateStatus: `/applications/${app.applicationId}/status`,
              scheduleInterview: `/applications/${app.applicationId}/interview`,
            }
          }))
        };
      }
    });

    // Calculate totals
    const totalApplicants = allApplications.length;
    const totalByStage = Object.values(hiringStages).reduce((sum, stage) => sum + stage.count, 0);

    // Get stage statistics
    const stageStatistics = Object.keys(hiringStages).map(stageName => ({
      stage: stageName,
      count: hiringStages[stageName].count,
      percentage: totalApplicants > 0 ? ((hiringStages[stageName].count / totalApplicants) * 100).toFixed(2) : 0
    }));

    res.json({
      success: true,
      message: "Applications by hiring stage retrieved successfully",
      data: {
        totalApplicants,
        totalByStage,
        stageStatistics,
        hiringStages,
        // Additional summary for quick access
        summary: {
          newApplications: hiringStages.Applied.count,
          inProgress: hiringStages.Shortlisted.count + hiringStages.Interviewing.count,
          completed: hiringStages.Offered.count + hiringStages.Hired.count + hiringStages.Rejected.count,
          successfulHires: hiringStages.Hired.count
        }
      }
    });

  } catch (error) {
    console.error("[ERROR] getApplicationsByHiringStage:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch applications by hiring stage",
      details: error.message,
    });
  }
};

// Keep the original getEmployerJobs function for backward compatibility (optional)
export const getEmployerJobs = async (req, res) => {
  try {
    // Find employer by user_Id (from authenticated employer)
    const employer = await Employer.findOne({ user_Id: req.user._id });
    if (!employer) {
      return res.status(404).json({
        success: false,
        error:
          "Employer profile not found. Please create an employer profile first.",
      });
    }

    // Find all jobs posted by this employer
    const jobs = await JobPost.find({ employerId: employer._id })
      .populate({
        path: "employerId",
        select: "company_name",
      })
      .sort({ createdAt: -1 }); // Sort by newest first

    // Get application counts and candidate details for each job
    const jobsWithDetails = await Promise.all(
      jobs.map(async (job) => {
        // Get all applications for this job with candidate details
        const applications = await Application.find({ jobId: job._id })
          .populate({
            path: "candidateId",
            model: "Candidate",
            populate: [
              { path: "applications", model: "Application" }
            ]
          })
          .sort({ createdAt: -1 });

        // Count total applications for this job
        const totalApplications = applications.length;

        // Count applications by status
        const applicationsByStatus = await Application.aggregate([
          { $match: { jobId: job._id } },
          {
            $group: {
              _id: "$currentStage",
              count: { $sum: 1 },
            },
          },
        ]);

        // Convert aggregation result to object for easier access
        const statusCounts = {};
        applicationsByStatus.forEach((item) => {
          statusCounts[item._id] = item.count;
        });

        // Build candidate metadata with application details
        const candidatesMetadata = await Promise.all(
          applications.map(async (application) => {
            const candidate = application.candidateId;
            
            // Get total applications count for this candidate across all jobs
            const candidateTotalApplications = await Application.countDocuments({
              candidateId: candidate._id
            });

            return {
              candidateId: candidate._id,
              candidateName: candidate.full_name,
              candidateFullName: candidate.full_name, // Added from getEmployerApplications
              candidateImage: candidate.profile_image || null,
              candidateProfileImage: candidate.profile_image, // Added from getEmployerApplications
              candidateLocation: candidate.location,
              candidateSkills: candidate.parsed_ResumeData?.skills || [],
              candidateExperience: candidate.parsed_ResumeData?.experience || [],
              candidateEducation: candidate.parsed_ResumeData?.education || [],
              candidateCredentials: candidate.credentials || [],
              candidateResumeData: candidate.parsed_ResumeData || {}, // Added from getEmployerApplications
              candidateApplications: candidate.applications || [], // Added from getEmployerApplications
              candidateTotalApplications: candidateTotalApplications,
              resumeUrl: application.resumeUrl || candidate.resumeUrl, // Added from getEmployerApplications (moved to top level)
              applicationData: {
                applicationId: application._id,
                currentStage: application.currentStage,
                appliedDate: application.createdAt,
                atsScore: application.atsScore || null,
                resumeUrl: application.resumeUrl || candidate.resumeUrl,
                coverLetter: application.coverLetter || null,
                feedback: application.feedback || [],
                interviewSchedule: application.interviewSchedule || [],
                assessments: application.assessments || [],
                isWithdrawn: application.isWithdrawn,
                notes: application.notes || null
              },
              // Added from getEmployerApplications - moved to top level for consistency
              interviewSchedule: candidate.interview_Schedule || [],
              feedback: application.feedback || [],
              assessment: application.assessments || [],
              trainingProgress: candidate.training_Progress || [],
              jobTitle: job.title || null // Added from getEmployerApplications
            };
          })
        );

        return {
          jobId: job._id,
          title: job.title,
          department: job.department,
          employmentType: job.employmentType,
          location: job.location,
          salaryRange: job.salaryRange,
          requiredExperience: job.requiredExperience,
          requiredCredentials: job.requiredCredentials,
          skillsRequired: job.skillsRequired,
          shift: job.shift,
          status: job.status,
          applicationDeadline: job.applicationDeadline,
          postedDate: job.createdAt,
          isApproved: job.isApproved,
          notes: job.notes,
          interviewSlots: job.interviewSlots,
          atsSettings: job.atsSettings,
          companyName: job.employerId?.company_name,
          totalApplications: totalApplications,
          applicationsByStatus: {
            Applied: statusCounts.Applied || 0,
            Shortlisted: statusCounts.Shortlisted || 0,
            Interviewing: statusCounts.Interviewing || 0,
            Offered: statusCounts.Offered || 0,
            Rejected: statusCounts.Rejected || 0,
            Hired: statusCounts.Hired || 0,
          },
          // Candidate metadata with images and application details
          candidatesMetadata: candidatesMetadata,
          // Additional metrics
          metrics: {
            daysActive: job.createdAt
              ? Math.floor(
                  (new Date() - new Date(job.createdAt)) / (1000 * 60 * 60 * 24)
                )
              : 0,
            isDeadlinePassed: job.applicationDeadline
              ? new Date() > new Date(job.applicationDeadline)
              : false,
            hasInterviewSlots:
              job.interviewSlots && job.interviewSlots.length > 0,
            isRemote: job.location?.remote || false,
            uniqueCandidatesCount: candidatesMetadata.length,
            averageAtsScore: candidatesMetadata.length > 0 
              ? candidatesMetadata.reduce((sum, candidate) => 
                  sum + (candidate.applicationData.atsScore || 0), 0) / candidatesMetadata.length
              : 0
          },
        };
      })
    );

    // Calculate summary statistics
    const summary = {
      totalJobs: jobs.length,
      activeJobs: jobs.filter((job) => job.status === "Open").length,
      pausedJobs: jobs.filter((job) => job.status === "Paused").length,
      closedJobs: jobs.filter((job) => job.status === "Closed").length,
      approvedJobs: jobs.filter((job) => job.isApproved === true).length,
      pendingApprovalJobs: jobs.filter((job) => job.isApproved === false)
        .length,
      totalApplicationsReceived: jobsWithDetails.reduce(
        (sum, job) => sum + job.totalApplications,
        0
      ),
      totalUniqueCandidates: jobsWithDetails.reduce(
        (sum, job) => sum + job.metrics.uniqueCandidatesCount,
        0
      ),
      jobsWithDeadlines: jobs.filter((job) => job.applicationDeadline).length,
      expiredJobs: jobs.filter(
        (job) =>
          job.applicationDeadline &&
          new Date() > new Date(job.applicationDeadline)
      ).length,
    };

    res.json({
      success: true,
      message: "Jobs retrieved successfully",
      summary: summary,
      jobs: jobsWithDetails,
    });
  } catch (error) {
    console.error("[ERROR] getEmployerJobs:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch employer jobs",
      details: error.message,
    });
  }
};