import User from "../../model/User.js";
import Candidate from "../../model/Candidate.js";
import Employer from "../../model/Employer.js";
import JobPost from "../../model/JobPost.js";
import Application from "../../model/Application.js";
import mongoose from "mongoose";
import {validateApplicationInput} from "../../utils/applicationSanitizer.js";

export const get_All_application = async (req, res) => {
  try {
    // Sanitize query parameters using xss
    const {currentStage, atsScore} = req.query

    // Validate using Joi
    const validationResult = validateApplicationInput.validate({currentStage, atsScore });
       if (validationResult.error) {
         return res.status(400).json({
           status: false,
           message: validationResult.error.details[0].message,
         })
        }


    // Build filters based on validated input
    const filters = {};
    if (validationResult.currentStage) filters.currentStage = validationResult.currentStage;
    if (validationResult.atsScore !== undefined) filters.atsScore = validationResult.atsScore;

    const applications = await Application.find(filters).lean();

    const detailedApplications = await Promise.all(
      applications.map(async (application) => {
        const candidate = await Candidate.findById(application.candidateId).select('full_name profile_image');
        const employer = await Employer.findById(application.employerId).select('full_name profile_image');
        console.log(candidate.profile_image);
        
        return {
          ...application,
          candidate,
          employer
        };
      })
    );

    res.json(detailedApplications);
  } catch (error) {
    console.error("Error fetching applications:", error);
    res.status(500).json({ error: error.message });
  }
};


export const get_Application_ById = async (req, res) => {
  try {
    const { application_id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(application_id)) {
            return res.status(400).json({ status: false, message: "Invalid user ID" });
        }
    const application_detail = await Application.findById(application_id).exec();

     const candidate_detail = await Employer.findOne({ _id: application_detail.candidateId }).select('full_name profile_image').lean();
    const employer_detail = await Employer.findOne({ _id: application_detail.employerId }).select('company_name profile_image').lean();

    // const totalNewCandidatesToday = await Candidate.countDocuments({ createdAt: { $gte: startOfDay, $lt: endOfDay }});
    //   if (!other_detail) {
    //   return res.status(404).json({
    //     error: "Employer record not found. User may not have completed registration.",
    //   });
    // }
  
    res.status(200).json({ job_detail, employer_detail, candidate_detail });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



/**
 * update application information using  application id
 */
export const update_application_data = async (req, res) => {
  try {
    const { application_id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(application_id)) {
            return res.status(400).json({ status: false, message: "Invalid user ID" });
        }


    const application_found = await Application.findOneAndUpdate({ _id:application_id}, req.body, {
      new: true,
      runValidators: true,
    });

    if (!application_found) return res.status(404).json({ error: "Application not found" });
    



 

    res.status(200).json({
      success: " Application detail updated successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



/**
 * update Application cirrentStage using  user id
 */
export const update_application_currentStage = async (req, res) => {
  try {
    const { currentStage, id } = req.body;
      if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ status: false, message: "Invalid user ID" });
        }
    if (!currentStage || !id) {
      return res.status(400).json({ error: "currentStage or id is required" });
    }

    // Validate status value
    if (!['Applied', 'Shortlisted', 'Interviewing', 'Offered', 'Rejected', 'Hired'].includes(currentStage)) {
      return res.status(400).json({ error: "Invalid currentStage value" });
    }

    // Find and update user
    const Application = await Application.findByIdAndUpdate(
      id,
      { currentStage },
      { new: true }
    ).exec();

    if (!Application) {
      return res.status(404).json({ error: "Application not found" });
    }

    console.log('Status updated successfully');
    res.status(200).json({ success: "Application status updated", Application });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

/**
 * delete employeer status using  user id
 */
export const delete_application = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ status: false, message: "Invalid user ID" });
        }
 

    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};



