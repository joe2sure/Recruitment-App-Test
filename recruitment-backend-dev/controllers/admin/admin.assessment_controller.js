export const createAssessment = async (req, res) => {
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
