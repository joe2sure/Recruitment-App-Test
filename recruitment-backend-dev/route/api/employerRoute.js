import express from "express";
import {
  createEmployer,
  getEmployerById,
  updateEmployer,
  deleteEmployer,
  getEmployerJobs,
  getEmployerDashboardOverview,
  getApplicantDetails,
  getAllApplicantsSummary,
  getJobListings,
  getApplicationsByHiringStage,
} from "../../controllers/employerController.js";
import upload from "../../middleware/upload.js";
import {
  authenticateUser,
  isEmployer,
  isAdmin,
} from "../../middleware/authMiddleware.js";

const router = express.Router();

// Only employers can create or update
router.post(
  "/",
  authenticateUser,
  isEmployer,
  upload.single("profile_image"),
  createEmployer
);
router.put(
  "/update",
  authenticateUser,
  isEmployer,
  upload.single("profile_image"),
  updateEmployer
);

// NEW ROUTES - Split functionality from getEmployerJobs

// Function 1: Dashboard Overview
router.get(
  "/dashboard/overview",
  authenticateUser,
  isEmployer,
  getEmployerDashboardOverview
);

// Function 2: Detailed Applicant Information
router.get(
  "/applications/:applicationId/details",
  authenticateUser,
  isEmployer,
  getApplicantDetails
);

// Function 3: All Applicants Summary
router.get(
  "/applicants/summary",
  authenticateUser,
  isEmployer,
  getAllApplicantsSummary
);

// Function 4: Job Listings with Details
router.get(
  "/jobs/listings",
  authenticateUser,
  isEmployer,
  getJobListings
);

// Function 5: Applications by Hiring Stage
router.get(
  "/applications/by-stage",
  authenticateUser,
  isEmployer,
  getApplicationsByHiringStage
);

// Original route (kept for backward compatibility)
router.get(
  "/jobs",
  authenticateUser,
  isEmployer,
  getEmployerJobs
);

// Other routes (view, delete) can be public or protected differently
router.get("/:id", authenticateUser, isAdmin, getEmployerById);

router.delete("/:id", authenticateUser, isAdmin, deleteEmployer);

export default router;