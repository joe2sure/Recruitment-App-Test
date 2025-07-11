import express from "express";
import {
  createJobPost,
  getJobPostById,
  getAllJobPosts,
  updateJobPost,
  deleteJobPost,
  approveJobPost,
  getAllJobPostsoutside,
  getJobPostByIdoutside
} from "../../controllers/jobPostController.js";
import {
  authenticateUser,
  isEmployer,
  isAdmin,
} from "../../middleware/authMiddleware.js";

const router = express.Router();

// Job Post routes
router.post("/", authenticateUser, isEmployer, createJobPost);
router.get("/all", authenticateUser, isEmployer, getAllJobPosts);
router.get("/outside/:id", getJobPostByIdoutside,)
router.get("/all/outside", getAllJobPostsoutside)
router.get("/:id", authenticateUser, isEmployer, getJobPostById);
router.put("/:id", authenticateUser, isEmployer, updateJobPost);
router.delete("/:id", authenticateUser, isEmployer, deleteJobPost);
// Only admin can approve/disapprove job posts
router.patch("/:id/approve", authenticateUser, isAdmin, approveJobPost);

export default router;
