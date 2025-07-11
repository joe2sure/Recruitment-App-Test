/**
 * ATS Utilities for filtering and matching candidates
 */

/**
 * Get years of experience from candidate experience array
 * @param {Array} experiences - Array of candidate experiences
 * @returns {Number} - Total years of experience
 */
export const calculateYearsOfExperience = (experiences) => {
  if (!experiences || !experiences.length) return 0;

  return experiences.reduce((total, exp) => {
    const startDate = exp.startDate ? new Date(exp.startDate) : null;
    const endDate = exp.endDate ? new Date(exp.endDate) : new Date();

    if (!startDate) return total;

    const years =
      endDate.getFullYear() -
      startDate.getFullYear() +
      (endDate.getMonth() - startDate.getMonth()) / 12;

    return total + Math.max(0, years);
  }, 0);
};

/**
 * Map education level to numerical value
 * @param {Array} education - Array of education objects
 * @returns {Number} - Education level score
 */
export const getEducationLevel = (education) => {
  if (!education || !education.length) return 0;

  const educationLevels = {
    "high school": 2,
    associate: 3,
    bachelor: 4,
    master: 5,
    phd: 6,
    doctorate: 6,
  };

  let highestLevel = 0;

  education.forEach((edu) => {
    if (!edu.degree) return;

    // Check degree text for level indicators
    const degree = edu.degree.toLowerCase();

    for (const [key, value] of Object.entries(educationLevels)) {
      if (degree.includes(key) && value > highestLevel) {
        highestLevel = value;
      }
    }
  });

  return highestLevel;
};

/**
 * Check if candidate has required certifications
 * @param {Array} candidateCreds - Candidate credentials
 * @param {Array} requiredCreds - Required credentials
 * @returns {Object} - Match information
 */
export const matchCertifications = (candidateCreds, requiredCreds) => {
  if (!requiredCreds || !requiredCreds.length) {
    return { matches: 0, required: 0, score: 1 };
  }

  if (!candidateCreds || !candidateCreds.length) {
    return { matches: 0, required: requiredCreds.length, score: 0 };
  }

  // Filter for only required credentials
  const required = requiredCreds.filter((cred) => cred.required);

  if (!required.length) {
    return { matches: 0, required: 0, score: 1 };
  }

  let matches = 0;

  required.forEach((reqCred) => {
    const found = candidateCreds.some(
      (candCred) =>
        candCred.type.toLowerCase() === reqCred.name.toLowerCase() &&
        (!reqCred.issuingAuthority ||
          (candCred.issuingAuthority &&
            candCred.issuingAuthority.toLowerCase() ===
              reqCred.issuingAuthority.toLowerCase()))
    );

    if (found) matches++;
  });

  return {
    matches,
    required: required.length,
    score: required.length > 0 ? matches / required.length : 1,
  };
};

/**
 * Match candidate's location with job location
 * @param {Object} candidateLocation - Candidate's location
 * @param {Object} jobLocation - Job's location
 * @returns {Number} - Location match score (0 or 1)
 */
export const matchLocation = (candidateLocation, jobLocation) => {
  if (!jobLocation) return 1;
  if (jobLocation.remote) return 1;
  if (!candidateLocation) return 0;

  // Check for exact match
  const cityMatch =
    !jobLocation.city ||
    (candidateLocation.city &&
      candidateLocation.city.toLowerCase() === jobLocation.city.toLowerCase());

  const stateMatch =
    !jobLocation.state ||
    (candidateLocation.state &&
      candidateLocation.state.toLowerCase() ===
        jobLocation.state.toLowerCase());

  const countryMatch =
    !jobLocation.country ||
    (candidateLocation.country &&
      candidateLocation.country.toLowerCase() ===
        jobLocation.country.toLowerCase());

  return cityMatch && stateMatch && countryMatch ? 1 : 0;
};

/**
 * Match candidate's skills with job required skills
 * @param {Array} candidateSkills - Candidate's skills
 * @param {Array} jobSkills - Job's required skills
 * @returns {Object} - Match information
 */
export const matchSkills = (candidateSkills, jobSkills) => {
  if (!jobSkills || !jobSkills.length) {
    return { matches: 0, required: 0, score: 1 };
  }

  if (!candidateSkills || !candidateSkills.length) {
    return { matches: 0, required: jobSkills.length, score: 0 };
  }

  const lowerCaseJobSkills = jobSkills.map((skill) => skill.toLowerCase());
  const lowerCaseCandidateSkills = candidateSkills.map((skill) =>
    skill.toLowerCase()
  );

  const matches = lowerCaseJobSkills.filter((skill) =>
    lowerCaseCandidateSkills.includes(skill)
  ).length;

  return {
    matches,
    required: jobSkills.length,
    score: jobSkills.length > 0 ? matches / jobSkills.length : 1,
  };
};

/**
 * Evaluate a criterion against a candidate
 * @param {Object} criterion - Filter criterion
 * @param {Object} candidate - Candidate object
 * @param {Object} jobPost - Job post object
 * @returns {Boolean} - Whether the candidate passes the criterion
 */
export const evaluateCriterion = (criterion, candidate, jobPost) => {
  const { field, operator, value } = criterion;

  switch (field) {
    case "yearsOfExperience": {
      const years = calculateYearsOfExperience(
        candidate.parsed_ResumeData?.experience
      );

      switch (operator) {
        case ">=":
          return years >= value;
        case "<=":
          return years <= value;
        case "equals":
          return years === value;
        default:
          return false;
      }
    }

    case "educationLevel": {
      const level = getEducationLevel(candidate.parsed_ResumeData?.education);

      switch (operator) {
        case ">=":
          return level >= value;
        case "<=":
          return level <= value;
        case "equals":
          return level === value;
        default:
          return false;
      }
    }

    case "certifications": {
      const candidateCerts = candidate.credentials || [];

      switch (operator) {
        case "in": {
          // All values must be in candidate certs
          if (!Array.isArray(value)) return false;

          return value.every((cert) =>
            candidateCerts.some(
              (c) =>
                c.type.toLowerCase() === cert.name.toLowerCase() &&
                (!cert.issuingAuthority ||
                  (c.issuingAuthority &&
                    c.issuingAuthority.toLowerCase() ===
                      cert.issuingAuthority.toLowerCase()))
            )
          );
        }
        case "contains": {
          // At least one value must be in candidate certs
          if (!Array.isArray(value)) return false;

          return value.some((cert) =>
            candidateCerts.some(
              (c) =>
                c.type.toLowerCase() === cert.name.toLowerCase() &&
                (!cert.issuingAuthority ||
                  (c.issuingAuthority &&
                    c.issuingAuthority.toLowerCase() ===
                      cert.issuingAuthority.toLowerCase()))
            )
          );
        }
        case "notIn": {
          // No values should be in candidate certs
          if (!Array.isArray(value)) return true;

          return !value.some((cert) =>
            candidateCerts.some(
              (c) =>
                c.type.toLowerCase() === cert.name.toLowerCase() &&
                (!cert.issuingAuthority ||
                  (c.issuingAuthority &&
                    c.issuingAuthority.toLowerCase() ===
                      cert.issuingAuthority.toLowerCase()))
            )
          );
        }
        default:
          return false;
      }
    }

    case "location": {
      const candidateLocation = candidate.location;
      const jobLocation = jobPost.location;

      if (jobLocation.remote) return true;
      if (!candidateLocation) return false;

      switch (operator) {
        case "equals": {
          return (
            candidateLocation.city?.toLowerCase() ===
              value.city?.toLowerCase() &&
            candidateLocation.state?.toLowerCase() ===
              value.state?.toLowerCase() &&
            candidateLocation.country?.toLowerCase() ===
              value.country?.toLowerCase()
          );
        }
        case "in": {
          if (!Array.isArray(value)) return false;

          return value.some(
            (loc) =>
              candidateLocation.city?.toLowerCase() ===
                loc.city?.toLowerCase() &&
              candidateLocation.state?.toLowerCase() ===
                loc.state?.toLowerCase() &&
              candidateLocation.country?.toLowerCase() ===
                loc.country?.toLowerCase()
          );
        }
        default:
          return false;
      }
    }

    case "skills": {
      const candidateSkills = candidate.parsed_ResumeData?.skills || [];

      switch (operator) {
        case "in": {
          // All values must be in candidate skills
          if (!Array.isArray(value)) return false;

          return value.every((skill) =>
            candidateSkills.some((s) => s.toLowerCase() === skill.toLowerCase())
          );
        }
        case "contains": {
          // At least one value must be in candidate skills
          if (!Array.isArray(value)) return false;

          return value.some((skill) =>
            candidateSkills.some((s) => s.toLowerCase() === skill.toLowerCase())
          );
        }
        case "notIn": {
          // No values should be in candidate skills
          if (!Array.isArray(value)) return true;

          return !value.some((skill) =>
            candidateSkills.some((s) => s.toLowerCase() === skill.toLowerCase())
          );
        }
        default:
          return false;
      }
    }

    case "availability":
      // For now, assume all candidates who have applied are available
      return true;

    default:
      return false;
  }
};

/**
 * Calculate candidate match score for a job
 * @param {Object} candidate - Candidate object
 * @param {Object} jobPost - Job post object
 * @param {Object} atsConfig - ATS configuration
 * @returns {Object} - Match score details
 */
export const calculateMatchScore = (candidate, jobPost, atsConfig) => {
  const weightings = atsConfig.weightings || {
    experience: 1,
    education: 1,
    certifications: 1,
    skills: 1,
    location: 1,
    availability: 1,
  };

  // Calculate individual scores
  const scores = {};

  // Experience score
  const candidateExp = calculateYearsOfExperience(
    candidate.parsed_ResumeData?.experience
  );
  const minExp = jobPost.requiredExperience?.minYears || 0;
  const maxExp = jobPost.requiredExperience?.maxYears || minExp + 5;

  if (candidateExp < minExp) {
    scores.experience = 0;
  } else if (candidateExp >= maxExp) {
    scores.experience = 1;
  } else {
    scores.experience = (candidateExp - minExp) / (maxExp - minExp);
  }

  // Education score
  const eduLevel = getEducationLevel(candidate.parsed_ResumeData?.education);
  const minEduCriterion = (atsConfig.criteria || []).find(
    (c) => c.field === "educationLevel" && c.operator === ">="
  );
  const minEdu = minEduCriterion ? minEduCriterion.value : 0;

  scores.education = eduLevel >= minEdu ? 1 : 0;

  // Certifications score
  const certResult = matchCertifications(
    candidate.credentials,
    jobPost.requiredCredentials
  );
  scores.certifications = certResult.score;

  // Skills score
  const skillResult = matchSkills(
    candidate.parsed_ResumeData?.skills,
    jobPost.skillsRequired
  );
  scores.skills = skillResult.score;

  // Location score
  scores.location = matchLocation(candidate.location, jobPost.location);

  // Availability score (assume all candidates are available)
  scores.availability = 1;

  // Calculate weighted total
  let totalWeight = 0;
  let weightedTotal = 0;

  for (const [field, score] of Object.entries(scores)) {
    if (weightings[field]) {
      totalWeight += weightings[field];
      weightedTotal += score * weightings[field];
    }
  }

  const totalScore = totalWeight > 0 ? weightedTotal / totalWeight : 0;

  return {
    scores,
    weightedScores: Object.entries(scores).reduce((result, [field, score]) => {
      result[field] = score * (weightings[field] || 0);
      return result;
    }, {}),
    totalScore: parseFloat(totalScore.toFixed(4)),
    maxPossibleScore: 1,
  };
};

/**
 * Filter a candidate based on ATS criteria
 * @param {Object} candidate - Candidate object
 * @param {Object} jobPost - Job post object
 * @param {Object} atsConfig - ATS configuration
 * @returns {Object} - Filter result with pass/fail and reasons
 */
export const filterCandidate = (candidate, jobPost, atsConfig) => {
  // Determine which criteria to use
  const useCriteria = jobPost.atsSettings?.useCustomATS
    ? jobPost.atsSettings.screeningCriteria || []
    : atsConfig.criteria || [];

  // Always apply auto-reject rules
  const autoRejectRules = atsConfig.autoRejectRules || [];

  const failedCriteria = [];
  const rejectionRules = [];

  // Check each criterion
  for (const criterion of useCriteria) {
    if (!evaluateCriterion(criterion, candidate, jobPost)) {
      failedCriteria.push(criterion);
    }
  }

  // Check auto-reject rules
  for (const rule of autoRejectRules) {
    if (evaluateCriterion(rule, candidate, jobPost)) {
      rejectionRules.push(rule);
    }
  }

  // Candidate passes if no failed criteria and no triggered rejection rules
  const passed = failedCriteria.length === 0 && rejectionRules.length === 0;

  return {
    passed,
    failedCriteria,
    rejectionRules,
  };
};
