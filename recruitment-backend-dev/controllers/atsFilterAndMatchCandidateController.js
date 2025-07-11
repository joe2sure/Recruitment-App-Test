import {
  getATSConfig,
  updateATSConfig,
  filterCandidates,
  matchCandidates,
  getRankedCandidates,
} from "../services/atsFilterAndMatchCandidateService.js";

import JobPost from "../model/JobPost.js";

/**
 * Get ATS configuration for an employer
 */
export const getEmployerATSConfig = async (req, res) => {
  try {
    const { employerId } = req.params;

    // Check if employer exists
    // Note: In a real application, you'd check if the requesting user
    // has permission to access this employer's data

    const atsConfig = await getATSConfig(employerId);

    res.status(200).json({
      success: true,
      data: atsConfig,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Update ATS configuration for an employer
 */
export const updateEmployerATSConfig = async (req, res) => {
  try {
    const { employerId } = req.params;
    const configData = req.body;

    // Check if employer exists and user has permission
    // Skipped for brevity

    const updatedConfig = await updateATSConfig(employerId, configData);

    res.status(200).json({
      success: true,
      data: updatedConfig,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Filter candidates for a job posting
 */
export const filterJobCandidates = async (req, res) => {
  try {
    const { jobId } = req.params;
    const { candidateIds } = req.body;

    // Check if job exists and user has permission
    // Skipped for brevity

    const filterResults = await filterCandidates(jobId, candidateIds);

    res.status(200).json({
      success: true,
      data: filterResults,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Match candidates to a job posting
 */
export const matchJobCandidates = async (req, res) => {
  try {
    const { jobId } = req.params;
    const { candidateIds } = req.body;

    // Check if job exists and user has permission
    // Skipped for brevity

    const matchResults = await matchCandidates(jobId, candidateIds);

    res.status(200).json({
      success: true,
      data: matchResults,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Get ranked candidates for a job posting
 */
export const getJobRankedCandidates = async (req, res) => {
  try {
    const { jobId } = req.params;

    // Check if job exists and user has permission
    // Skipped for brevity

    const rankedResults = await getRankedCandidates(jobId);

    res.status(200).json({
      success: true,
      data: rankedResults,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Screen a candidate against a job posting
 */
export const screenCandidate = async (req, res) => {
  try {
    const { jobId } = req.params;
    const { candidateId } = req.body;

    if (!candidateId) {
      return res.status(400).json({
        success: false,
        message: "Candidate ID is required",
      });
    }

    // Filter the candidate
    const filterResult = await filterCandidates(jobId, [candidateId]);

    // Get match score if candidate passed the filter
    let matchScore = null;

    if (filterResult.passed > 0) {
      const matchResult = await matchCandidates(jobId, [candidateId]);
      matchScore = matchResult.matches[0] || null;
    }

    res.status(200).json({
      success: true,
      data: {
        jobId,
        candidateId,
        passed: filterResult.passed > 0,
        failedCriteria:
          filterResult.passedCandidates.length > 0
            ? []
            : filterResult.failedCandidates[0]?.failedCriteria || [],
        rejectionRules:
          filterResult.passedCandidates.length > 0
            ? []
            : filterResult.failedCandidates[0]?.rejectionRules || [],
        matchScore,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Process batch of new applications
 */
export const processBatchApplications = async (req, res) => {
  try {
    const { jobId } = req.params;
    const { candidateIds } = req.body;

    if (
      !candidateIds ||
      !Array.isArray(candidateIds) ||
      candidateIds.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Valid candidate IDs array is required",
      });
    }

    // First filter all candidates
    const filterResult = await filterCandidates(jobId, candidateIds);

    // Then match only passed candidates
    const passedCandidateIds = filterResult.passedCandidates.map(
      (c) => c.candidateId
    );

    let matchResults = { matches: [] };
    if (passedCandidateIds.length > 0) {
      matchResults = await matchCandidates(jobId, passedCandidateIds);
    }

    res.status(200).json({
      success: true,
      data: {
        jobId,
        totalCandidates: candidateIds.length,
        passedFilter: filterResult.passed,
        failedFilter: filterResult.failed,
        rankedCandidates: matchResults.matches,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Get ATS summary statistics for an employer
 */
export const getEmployerATSStats = async (req, res) => {
  try {
    const { employerId } = req.params;

    // Get all jobs for this employer
    const jobs = await JobPost.find({ employerId });

    if (!jobs || jobs.length === 0) {
      return res.status(200).json({
        success: true,
        data: {
          employerId,
          totalJobs: 0,
          totalFiltered: 0,
          totalMatched: 0,
          averagePassRate: 0,
          jobStats: [],
        },
      });
    }

    // Gather stats for each job
    const jobStats = await Promise.all(
      jobs.map(async (job) => {
        try {
          const filterResult = await filterCandidates(job._id);
          const matchResult = await matchCandidates(job._id);

          return {
            jobId: job._id,
            title: job.title,
            totalCandidates: filterResult.total,
            passedFilter: filterResult.passed,
            failedFilter: filterResult.failed,
            matched: matchResult.total,
            passRate:
              filterResult.total > 0
                ? filterResult.passed / filterResult.total
                : 0,
          };
        } catch (error) {
          console.error(`Error processing job ${job._id}: ${error.message}`);
          return null;
        }
      })
    );

    // Filter out null values
    const validJobStats = jobStats.filter((stat) => stat !== null);

    // Calculate summary stats
    const totalFiltered = validJobStats.reduce(
      (sum, job) => sum + job.totalCandidates,
      0
    );
    const totalMatched = validJobStats.reduce(
      (sum, job) => sum + job.matched,
      0
    );
    const avgPassRate =
      validJobStats.length > 0
        ? validJobStats.reduce((sum, job) => sum + job.passRate, 0) /
          validJobStats.length
        : 0;

    res.status(200).json({
      success: true,
      data: {
        employerId,
        totalJobs: validJobStats.length,
        totalFiltered,
        totalMatched,
        averagePassRate: avgPassRate,
        jobStats: validJobStats,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
