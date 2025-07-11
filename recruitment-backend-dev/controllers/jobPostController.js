import JobPost from "../model/JobPost.js";
import Employer from "../model/Employer.js";
import mongoose from "mongoose";

// ✅ Create Job Post
// ✅ Create Job Post
export const createJobPost = async (req, res) => {
  try {
    // Find employer by authenticated user's ID
    const employer = await Employer.findOne({ user_Id: req.user._id });
    if (!employer) {
      return res
        .status(404)
        .json({ error: "Employer profile not found for this user" });
    }

    // Remove forbidden fields from body
    const { isApproved, postedBy, ...rest } = req.body;

    // Build job post data, always set employerId from employer._id
    const body = { ...rest, employerId: employer._id };

    const jobPost = new JobPost(body);
    await jobPost.save();

    // Add the job post ID to the employer's job_Postings array
    employer.job_Postings.push(jobPost._id);
    await employer.save();

    res.status(201).json(jobPost);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



// ✅ Update Job Post
export const updateJobPost = async (req, res) => {
  try {
    // Find employer by authenticated user's ID
    const employer = await Employer.findOne({ user_Id: req.user._id });
    if (!employer) {
      return res
        .status(404)
        .json({ error: "Employer profile not found for this user" });
    }

    // First, find the job post to check ownership
    const existingJobPost = await JobPost.findById(req.params.id);
    if (!existingJobPost) {
      return res.status(404).json({ error: "Job post not found" });
    }

    // Check if the authenticated employer owns this job post
    if (existingJobPost.employerId.toString() !== employer._id.toString()) {
      return res.status(403).json({ 
        error: "Access denied. You can only update your own job posts" 
      });
    }

    // Remove forbidden fields from body
    const { isApproved, postedBy, ...rest } = req.body;

    // Always set employerId from the authenticated employer
    const body = { ...rest, employerId: employer._id };

    const jobPost = await JobPost.findByIdAndUpdate(req.params.id, body, {
      new: true,
      runValidators: true,
    });

    res.json(jobPost);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// ✅ Get Job Post by ID
export const getJobPostById = async (req, res) => {
  try {
    // Find employer by authenticated user's ID
    const employer = await Employer.findOne({ user_Id: req.user._id });
    if (!employer) {
      return res
        .status(404)
        .json({ error: "Employer profile not found for this user" });
    }

    // Find the job post
    const jobPost = await JobPost.findById(req.params.id);
    if (!jobPost) {
      return res.status(404).json({ error: "Job post not found" });
    }

    // Check if the authenticated employer owns this job post
    if (jobPost.employerId.toString() !== employer._id.toString()) {
      return res.status(403).json({ 
        error: "Access denied. You can only view your own job posts" 
      });
    }

    res.json(jobPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ List All Job Posts
export const getAllJobPosts = async (req, res) => {
  try {
    // Find employer by authenticated user's ID
    const employer = await Employer.findOne({ user_Id: req.user._id });
    if (!employer) {
      return res
        .status(404)
        .json({ error: "Employer profile not found for this user" });
    }

    // Build filters - always include employerId to restrict to authenticated employer's posts
    const filters = { employerId: employer._id };

    // Add additional filters if provided in query
    if (req.query.status) filters.status = req.query.status;

    const jobPosts = await JobPost.find(filters);
    res.json(jobPosts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/// list job outside
export const getAllJobPostsoutside = async (req, res) => {
  try {
    // Find employer by authenticated user's ID
    
    // Build filters - always include employerId to restrict to authenticated employer's posts
    const filters = {};

    // Add additional filters if provided in query
    if (req.query.status) {
  filters.status = req.query.status;
}

// Filter by isDeleted
if (req.query.isDeleted !== undefined) {
  filters.isDeleted = req.query.isDeleted === 'true';
}

// Filter by title (partial match)
if (req.query.title) {
  filters.title = { $regex: req.query.title, $options: 'i' };
}



// Filter by department
if (req.query.department) {
  filters.department = req.query.department;
}

// Filter by employmentType
if (req.query.employmentType) {
  filters.employmentType = req.query.employmentType;
}

// Filter by location
if (req.query.city) {
  filters['location.city'] = req.query.city;
}
if (req.query.state) {
  filters['location.state'] = req.query.state;
}
if (req.query.country) {
  filters['location.country'] = req.query.country;
}
if (req.query.remote !== undefined) {
  filters['location.remote'] = req.query.remote === 'true';
}

// Filter by salary range (min and max)
if (req.query.salaryMin) {
  filters['salaryRange.min'] = { $gte: Number(req.query.salaryMin) };
}
if (req.query.salaryMax) {
  filters['salaryRange.max'] = { ...(filters['salaryRange.max'] || {}), $lte: Number(req.query.salaryMax) };
}

// Filter by required experience
if (req.query.minExperience) {
  filters['requiredExperience.minYears'] = { $gte: Number(req.query.minExperience) };
}
if (req.query.maxExperience) {
  filters['requiredExperience.maxYears'] = { $lte: Number(req.query.maxExperience) };
}

// Filter by skill (at least one skill matches)
if (req.query.skill) {
  filters.skillsRequired = { $in: [req.query.skill] };
}

// Filter by shift
if (req.query.shift) {
  filters.shift = req.query.shift;
}

// Filter by employerId
if (req.query.employerId) {
  filters.employerId = req.query.employerId;
}



// Filter by jobDurationType
if (req.query.jobDurationType) {
  filters.jobDurationType = req.query.jobDurationType;
}

// Filter by application deadline (before or after today)


    const jobPosts = await JobPost.find(filters).sort({ createdAt: -1 }).select('-atsSettings -isDeleted -employerId');
    res.json(jobPosts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
/// get job by id outside
export const getJobPostByIdoutside = async (req, res) => {
  try {

    // Find the job post
    const jobPost = await JobPost.findById(req.params.id).select('-atsSettings -isDeleted -employerId');
    if (!jobPost) {
      return res.status(404).json({ error: "Job post not found" });
    }

    // Check if the authenticated employer owns this job post
    

    res.json(jobPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// ✅ Delete Job Post
export const deleteJobPost = async (req, res) => {
  try {
    // Find employer by authenticated user's ID
    const employer = await Employer.findOne({ user_Id: req.user._id });
    if (!employer) {
      return res
        .status(404)
        .json({ error: "Employer profile not found for this user" });
    }

    // First, find the job post to check ownership
    const existingJobPost = await JobPost.findById(req.params.id);
    if (!existingJobPost) {
      return res.status(404).json({ error: "Job post not found" });
    }

    // Check if the authenticated employer owns this job post
    if (existingJobPost.employerId.toString() !== employer._id.toString()) {
      return res.status(403).json({ 
        error: "Access denied. You can only delete your own job posts" 
      });
    }

     job.isDeleted = true;
    await job.save();

    // Delete the job post
    await Application.updateMany(
      { jobId: job._id },
      {
        $set: {
          jobStatus: 'deleted',
          jobDeletedAt: new Date(),
        }
      }
    );    
  

    res.status(204).send(); // No content
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Approve or disapprove a job post (Admin only)
export const approveJobPost = async (req, res) => {
  try {
    const { id } = req.params; // id of job post to approve/disapprove
    const { approve } = req.body; // expects { "approve": true } or { "approve": false }

    if (typeof approve !== "boolean") {
      return res.status(400).json({ error: "approve must be a boolean" });
    }

    const jobPost = await JobPost.findById(id);
    if (!jobPost) {
      return res.status(404).json({ error: "Job post not found" });
    }

    jobPost.isApproved = approve;
    jobPost.postedBy = req.user._id; // Set admin's ID

    await jobPost.save();

    res.json({
      success: true,
      message: `Job post has been ${approve ? "approved" : "disapproved"}`,
      jobPost,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
