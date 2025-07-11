import User from "../../model/User.js";
import Employer from "../../model/Employer.js";
import JobPost from "../../model/JobPost.js";
import Application from "../../model/Application.js";







export const get_All_jobs = async (req, res) => {
  try {
    const filters = {};

    if (req.query.title) filters.title = req.query.title;

    // ✅ Filter by nested location fields
    if (req.query.city) filters['location.city'] = req.query.city;
    if (req.query.state) filters['location.state'] = req.query.state;
    if (req.query.country) filters['location.country'] = req.query.country;
    if (req.query.remote !== undefined) filters['location.remote'] = req.query.remote === 'true';

    // ✅ Filter by status (e.g., active/closed)
    if (req.query.status) filters.status = req.query.status;

    // ✅ Filter by skillsRequired (comma-separated list)
    if (req.query.skillsRequired) {
      const skillsArray = req.query.skillsRequired.split(',').map(skill => skill.trim());
      filters.skillsRequired = { $all: skillsArray }; // Use $in to match any instead of all
    }

    // Get filtered jobs
    const jobposts = await JobPost.find(filters).sort({ createdAt: -1 }).lean();

    // Attach employer info
    const job_details = await Promise.all(
      jobposts.map(async (post) => {
        const employer = await Employer.findById(post.employerId)
          .select('company_name profile_image')
          .lean();

        return {
          ...post,
          employer: employer || null,
        };
      })
    );

    res.status(200).json(job_details);
  } catch (error) {
    console.error("Error fetching job posts:", error);
    res.status(500).json({ error: error.message });
  }
};




export const getJobPostById = async (req, res) => {
  try {
    const { job_id } = req.params;

    if (!job_id) return res.status(400).json({ error: ' Please provide an job id ' });

    const job_detail = await JobPost.findById(job_id).exec();

   

   

    const employer_detail = await Employer.findOne({ _id: job_detail.employerId }).select('company_name profile_image').lean();
    const total_applicant = await Application.countDocuments({ jobId:job_id }).sort({ createdAt: -1 }).exec();
    // const totalNewCandidatesToday = await Candidate.countDocuments({ createdAt: { $gte: startOfDay, $lt: endOfDay }});
    //   if (!other_detail) {
    //   return res.status(404).json({
    //     error: "Employer record not found. User may not have completed registration.",
    //   });
    // }
    console.log(employer_detail, total_applicant);
    
    res.status(200).json({ job_detail, employer_detail, total_applicant });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



export const update_jobpost_data = async (req, res) => {
  try {
    const { job_id } = req.params;

    if (!job_id) return res.status(400).json({ error: " job ID is required" });
    

    const job_found = await JobPost.findOneAndUpdate({ _id:job_id}, req.body, {
      new: true,
      runValidators: true,
    });

    if (!job_found) return res.status(404).json({ error: "job not found" });
    



 

    res.status(200).json({
      success: "job detail updated successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



export const approveJobPost = async (req, res) => {
  try {
    const { job_id } = req.params;

    if (!job_id) {
      return res.status(400).json({ error: "Job ID is required." });
    }

    const { approve } = req.body;

    // ✅ Strict boolean check
    if (typeof approve !== "boolean") {
      return res.status(400).json({ error: "The 'approve' field must be a boolean (true or false)." });
    }

    const jobPost = await JobPost.findById(job_id);
    if (!jobPost) {
      return res.status(404).json({ error: "Job post not found." });
    }

    jobPost.isApproved = approve;
    jobPost.postedBy = req.user._id; // Set admin's ID (ensure req.user is available via middleware)

    await jobPost.save();

    return res.status(200).json({
      success: true,
      message: `Job post has been ${approve ? "approved" : "disapproved"}.`,
      jobPost,
    });

  } catch (error) {
    console.error("Approval Error:", error);
    return res.status(500).json({ error: error.message || "Server error occurred." });
  }
};






export const delete_job = async (req, res) => {
  try {
    const { job_Id } = req.params;

    if (!job_Id) {
      return res.status(400).json({ error: "job id is required" });
    }

    // First, find the user to verify existence and role
    const job = await JobPost.findById(job_Id);
    if (!job) {
      return res.status(404).json({ error: "job not found" });
    }


    // Delete the user
    await JobPost.findByIdAndDelete(job_Id);


    res.status(200).json({ success: "job  details deleted successfully" });
  } catch (err) {
    console.error("Delete Employer Error:", err);
    res.status(500).json({ error: "Server error" });
  }
};



