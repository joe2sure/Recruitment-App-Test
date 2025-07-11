import express from "express";
import {
  getEmployerATSConfig,
  updateEmployerATSConfig,
  filterJobCandidates,
  matchJobCandidates,
  getJobRankedCandidates,
  screenCandidate,
  processBatchApplications,
  getEmployerATSStats,
} from "../../controllers/atsFilterAndMatchCandidateController.js";
import { authenticateUser, isEmployer } from "../../middleware/authMiddleware.js";

const router = express.Router();

// Apply to all routes
router.use(authenticateUser, isEmployer);

// ATS Configuration Routes
router
  .route("/config/:employerId")
  .get(getEmployerATSConfig)
  .put(updateEmployerATSConfig);

// Candidate Screening Routes
router.post("/jobs/:jobId/filter", filterJobCandidates);
router.post("/jobs/:jobId/match", matchJobCandidates);
router.get("/jobs/:jobId/ranked", getJobRankedCandidates);
router.post("/jobs/:jobId/screen", screenCandidate);
router.post("/jobs/:jobId/batch", processBatchApplications);

// Stats Routes
router.get("/employers/:employerId/stats", getEmployerATSStats);

export default router;
