import express from "express";
import {
  createATSConfig,
  getATSConfigByEmployerId,
  getAllATSConfigs,
  updateATSConfig,
  deleteATSConfig,
} from "../../controllers/ATSConfigController.js";
import { authenticateUser, isEmployer } from "../../middleware/authMiddleware.js";

const router = express.Router();

// Apply to all routes
router.use(authenticateUser, isEmployer);

// RESTful and clean CRUD structure
router
  .route("/ats-configs")
  .post(createATSConfig)       // Create new ATS config
  .get(getAllATSConfigs);      // Get all configs

router
  .route("/ats-configs/:employerId")
  .get(getATSConfigByEmployerId)  // Get config for one employer
  .put(updateATSConfig)           // Update config
  .delete(deleteATSConfig);       // Delete config


export default router;
