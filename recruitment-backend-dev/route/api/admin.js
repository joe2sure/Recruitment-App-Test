import express from "express";
import { isAdmin } from "../../middleware/authMiddleware.js";
//user Management functions
import {get_All_Users, get_User_id, update_user_status, delete_user, update_user_data, getNewUsers } from "../../controllers/admin/admin_user_controller.js"
import upload from "../../middleware/upload.js";
//Candidate Management functions
import {get_All_candidates, get_candidate_id, update_candidate_data, update_candidate_status, delete_candidate } from "../../controllers/admin/admin_candidates_controller.js"

//EMployers Management functions
import {get_All_employers, get_employer_id, update_employer_data, update_employer_status, delete_employer } from "../../controllers/admin/admin_employers_controller.js"

//Application Management function
import {get_All_application } from "../../controllers/admin/admin_application_controller.js"

//Job Management function
import {get_All_jobs, getJobPostById, update_jobpost_data, approveJobPost, delete_job } from "../../controllers/admin/admin_jobpost_controller.js"
import {registerAdmin, getAdmindetail, getDashboardMetrics, deleteAdminData,   updateAdminData } from "../../controllers/admin/adminController.js"
 


//Question Route 
import {createQuestionSet,  getAllQues, updateQuestionSet  } from "../../controllers/admin/admin_question_controller.js"
 

const router = express.Router();

//Admin Controller
router.post("/register", isAdmin, upload.single("profile_image"), registerAdmin);
router.put("/updateAdmin", isAdmin, upload.single("profile_image"), updateAdminData);
router.get("/getAdmindetail", isAdmin, getAdmindetail);
router.get("/getAdmindetail", isAdmin, deleteAdminData);



///KPI metrics 
router.get("/dashboard",isAdmin, getDashboardMetrics);
import {uploads} from "../../utils/uplaod.js";
router.get("/saa",  uploads)

//User ManageMent 
router.get("/users", get_All_Users);
router.get("/user/:user_Id",  get_User_id);
router.put("/user/:user_Id", update_user_data);
router.delete("/user/:user_Id", delete_user)
router.patch("/user/status", update_user_status) 
router.get("/users/by-date", getNewUsers) 


//candidate ManageMent  getNewUsers
router.get("/candidates", get_All_candidates);
router.get("/candidate/:user_Id",  get_candidate_id);
router.put("/candidate/:user_Id", update_candidate_data);
router.delete("/candidate/:user_Id", isAdmin, delete_candidate)
router.patch("/candidate/status",isAdmin, update_candidate_status)


//Employer ManageMent 
router.get("/employers", get_All_employers);
router.get("/employer/:user_Id", isAdmin, get_employer_id);
router.put("/employer/:user_Id", isAdmin, update_employer_data);
router.delete("/employer/:user_Id", isAdmin,  delete_employer)
router.patch("/employer/status", isAdmin, update_employer_status)



//Job ManageMent 
router.get("/jobs",  get_All_jobs);
router.get("/job/:job_id", getJobPostById);
router.put("/job/:job_id", update_jobpost_data);
router.delete("/job/:job_Id", isAdmin, delete_job)
router.patch("/job/:job_id", isAdmin, approveJobPost) 
// router.get("/users/by-date", getNewUsers) 



//Job ManageMent 
router.get("/application", get_All_application);

router.get("/user/:user_Id", get_User_id);
// router.put("/user/:user_Id", update_user_data);
// router.delete("/user/:user_Id", delete_user)
// router.patch("/users/status", update_user_status) 
// router.get("/users/by-date", getNewUsers) 


router.post("/createquestion", createQuestionSet);
router.put("/updatequestion/:id", updateQuestionSet);
router.get("/getallQuestion", getAllQues);
// router.put("/user/:user_Id", update_user_data);
// router.delete("/user/:user_Id", delete_user)
// router.patch("/users/status", update_user_status) 
// router.get("/users/by-date", getNewUsers) 



createQuestionSet



export default router;