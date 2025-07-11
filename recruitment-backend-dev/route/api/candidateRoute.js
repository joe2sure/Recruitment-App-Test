import express from 'express'
const router = express.Router()
import { authenticateUser, validateRefreshToken, authenticateCandidate } from "../../middleware/authMiddleware.js"
const app = express()
import upload from '../../middleware/upload.js' // multer middleware function

import {
//candidate controller
  updateCandidate,
  getCandidate,
  registerCandidate,
  deleteCandidateDataController,
  //credient controller
updateCredential,
deleteCredential,

///suggest job
suggestJobs,

//favoriteJob
addJobToFavorites,
getFavoritesjob,
deleteFavoritesjob,

//ppplication controller
  applicationHistory,
  createApplication,
  updateApplication,
deleteApplication

} from "../../controllers/candidateControllers.js"


// candidate controll
// POST route for registering a candidate
router.post(
  "/register",
  validateRefreshToken,
  authenticateUser,
  upload.fields([
    { name: "profile_image", maxCount: 1 },
    { name: "resumeUrl", maxCount: 1 },
  ]),
  registerCandidate
);

// PATCH route for updating candidate details
router.patch(
  "/updateDetail",
  validateRefreshToken,
  authenticateUser,
  upload.fields([
    { name: "profile_image", maxCount: 1 },
    { name: "resumeUrl", maxCount: 1 },
  ]),
  updateCandidate
);

router.get("/", validateRefreshToken, authenticateUser, getCandidate) 
router.delete("/",  validateRefreshToken, authenticateUser, deleteCandidateDataController) 

router.post(
  "/updatecredential",
  validateRefreshToken, 
  authenticateUser,
  upload.single('documentFile'), // expects one file with key 'documentFile'
  updateCredential
);

//suggest job for candidate, use candidate detail
router.get(
  "/suggestJobs",
  validateRefreshToken, 
  authenticateUser,
  
  suggestJobs
);

/// favourite job
router.post(
  "/addfavoritejob/:jobId",
  validateRefreshToken, 
  authenticateUser,
  addJobToFavorites
);

router.get(
  "/favorites/jobs",
  validateRefreshToken, 
  authenticateUser,
  getFavoritesjob 
);

router.delete(
  "/favorites/jobs/:job_Id",
  validateRefreshToken, 
  authenticateUser,
  deleteFavoritesjob 
);

// Track job view - when candidate scrolls and views a job
router.post(
  "/jobs/:jobId/view",
  validateRefreshToken, 
  authenticateUser,
  
);

router.delete(
  "/deletecredential/:id",
  validateRefreshToken, 
  authenticateUser,
  deleteCredential,
);
///application control
router.get("/applications", validateRefreshToken, applicationHistory) 
router.post("/applications", validateRefreshToken,  authenticateCandidate,upload.fields([ { name: "coverLetterFileUrl", maxCount: 1 },{ name: "resumeUrl", maxCount: 1 }]), createApplication) 
router.patch("/updateApplication", authenticateCandidate, authenticateUser, updateApplication) 
router.delete("/applications/:id", authenticateCandidate, authenticateUser, deleteApplication) 


export default router