import Candidate from "../model/Candidate.js";
import Employer from "../model/Employer.js";
import JobPost from "../model/JobPost.js";
import ATSConfig from "../model/ATSConfig.js";
import {
  filterCandidate,
  calculateMatchScore,
} from "../utils/atsFilterAndMatchCandidateUtils.js";

/**
 * Get ATS configuration for an employer
 * @param {String} employerId - Employer ID
 * @returns {Object} - ATS configuration
 */
export const getATSConfig = async (employerId) => {
  try {
    let atsConfig = await ATSConfig.findOne({ employerId });

    // If no config exists, create a default one
    if (!atsConfig) {
      const employer = await Employer.findById(employerId);

      if (!employer) {
        throw new Error("Employer not found");
      }

      // Create default ATS config based on employer preferences
      const defaultConfig = {
        employerId,
        criteria: [],
        weightings: {
          experience: 2,
          education: 1,
          certifications: 2,
          skills: 3,
          location: 1,
          availability: 1,
        },
        autoRejectRules: [],
        enabled: true,
      };

      // Add default criteria based on employer preferences
      if (employer.ats_Preferences) {
        // Add required skills
        if (employer.ats_Preferences.requiredSkills?.length) {
          defaultConfig.criteria.push({
            field: "skills",
            operator: "in",
            value: employer.ats_Preferences.requiredSkills,
          });
        }

        // Add min experience
        if (employer.ats_Preferences.minExperience) {
          defaultConfig.criteria.push({
            field: "yearsOfExperience",
            operator: ">=",
            value: employer.ats_Preferences.minExperience,
          });
        }

        // Add exclude keywords as auto-reject rules
        if (employer.ats_Preferences.excludeKeywords?.length) {
          // This is simplified - a proper implementation would need to
          // check these keywords against relevant candidate fields
          defaultConfig.autoRejectRules.push({
            field: "skills",
            operator: "contains",
            value: employer.ats_Preferences.excludeKeywords,
          });
        }
      }

      atsConfig = await ATSConfig.create(defaultConfig);
    }

    return atsConfig;
  } catch (error) {
    throw new Error(`Error getting ATS config: ${error.message}`);
  }
};

/**
 * Filter candidates for a job posting
 * @param {String} jobId - Job posting ID
 * @param {Array} candidateIds - Optional array of candidate IDs to filter
 * @returns {Object} - Filtered candidates with pass/fail results
 */
export const filterCandidates = async (jobId, candidateIds = null) => {
  try {
    const jobPost = await JobPost.findById(jobId);

    if (!jobPost) {
      throw new Error("Job posting not found");
    }

    const atsConfig = await getATSConfig(jobPost.employerId);

    if (!atsConfig.enabled) {
      throw new Error("ATS is not enabled for this employer");
    }

    // Query candidates - either by IDs or all
    const candidateQuery = candidateIds
      ? { _id: { $in: candidateIds } }
      : { profile_Completed: true }; // Only consider completed profiles

    const candidates = await Candidate.find(candidateQuery);

    const results = await Promise.all(
      candidates.map(async (candidate) => {
        const filterResult = filterCandidate(candidate, jobPost, atsConfig);

        return {
          candidateId: candidate._id,
          candidateName: candidate.full_name,
          passed: filterResult.passed,
          failedCriteria: filterResult.failedCriteria,
          rejectionRules: filterResult.rejectionRules,
        };
      })
    );

    // Separate passed and failed candidates
    const passedCandidates = results.filter((result) => result.passed);
    const failedCandidates = results.filter((result) => !result.passed);

    return {
      jobId,
      total: results.length,
      passed: passedCandidates.length,
      failed: failedCandidates.length,
      passedCandidates,
      failedCandidates,
    };
  } catch (error) {
    throw new Error(`Error filtering candidates: ${error.message}`);
  }
};

/**
 * Match candidates to a job posting and rank them
 * @param {String} jobId - Job posting ID
 * @param {Array} candidateIds - Optional array of candidate IDs to match
 * @returns {Object} - Matched candidates with scores
 */
export const matchCandidates = async (jobId, candidateIds = null) => {
  try {
    const jobPost = await JobPost.findById(jobId);

    if (!jobPost) {
      throw new Error("Job posting not found");
    }

    const atsConfig = await getATSConfig(jobPost.employerId);

    // If candidateIds provided, use them, otherwise get filtered candidates
    let candidates;

    if (candidateIds && candidateIds.length) {
      candidates = await Candidate.find({ _id: { $in: candidateIds } });
    } else {
      // First filter candidates
      const filterResults = await filterCandidates(jobId);

      // Get IDs of passed candidates
      const passedIds = filterResults.passedCandidates.map(
        (c) => c.candidateId
      );

      // Get candidate objects
      candidates = await Candidate.find({ _id: { $in: passedIds } });
    }

    // Calculate match scores for candidates
    const matchResults = await Promise.all(
      candidates.map(async (candidate) => {
        const matchScore = calculateMatchScore(candidate, jobPost, atsConfig);

        return {
          candidateId: candidate._id,
          candidateName: candidate.full_name,
          totalScore: matchScore.totalScore,
          scores: matchScore.scores,
          weightedScores: matchScore.weightedScores,
        };
      })
    );

    // Sort by total score descending
    const sortedResults = matchResults.sort(
      (a, b) => b.totalScore - a.totalScore
    );

    return {
      jobId,
      total: sortedResults.length,
      matches: sortedResults,
    };
  } catch (error) {
    throw new Error(`Error matching candidates: ${error.message}`);
  }
};

/**
 * Update ATS configuration
 * @param {String} employerId - Employer ID
 * @param {Object} configData - New configuration data
 * @returns {Object} - Updated ATS configuration
 */
export const updateATSConfig = async (employerId, configData) => {
  try {
    const atsConfig = await ATSConfig.findOneAndUpdate(
      { employerId },
      configData,
      { new: true, upsert: true }
    );

    return atsConfig;
  } catch (error) {
    throw new Error(`Error updating ATS config: ${error.message}`);
  }
};

/**
 * Get candidates ranked for a job
 * @param {String} jobId - Job posting ID
 * @returns {Object} - Ranked candidates with detailed information
 */
export const getRankedCandidates = async (jobId) => {
  try {
    // First get match results
    const matchResults = await matchCandidates(jobId);

    // Get detailed candidate information
    const candidateDetails = await Promise.all(
      matchResults.matches.map(async (match) => {
        const candidate = await Candidate.findById(match.candidateId);

        if (!candidate) return null;

        // Calculate top skills match
        const jobPost = await JobPost.findById(jobId);
        const candidateSkills = candidate.parsed_ResumeData?.skills || [];
        const jobSkills = jobPost.skillsRequired || [];

        const matchingSkills = candidateSkills.filter((skill) =>
          jobSkills.some(
            (jobSkill) => jobSkill.toLowerCase() === skill.toLowerCase()
          )
        );

        return {
          ...match,
          location: candidate.location,
          experience: candidate.parsed_ResumeData?.experience?.length
            ? `${candidate.parsed_ResumeData.experience.length} positions`
            : "No experience listed",
          education: candidate.parsed_ResumeData?.education?.length
            ? candidate.parsed_ResumeData.education.map(
                (edu) =>
                  `${edu.degree || "Degree"} in ${
                    edu.fieldOfStudy || "Unknown field"
                  }`
              )
            : ["No education listed"],
          topSkills: matchingSkills.slice(0, 5),
          matchPercentage: Math.round(match.totalScore * 100),
        };
      })
    );

    // Filter out null values and sort by score
    const filteredCandidates = candidateDetails
      .filter((candidate) => candidate !== null)
      .sort((a, b) => b.totalScore - a.totalScore);

    return {
      jobId,
      total: filteredCandidates.length,
      rankedCandidates: filteredCandidates,
    };
  } catch (error) {
    throw new Error(`Error getting ranked candidates: ${error.message}`);
  }
};
