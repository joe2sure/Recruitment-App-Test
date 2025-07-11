import express from 'express'; 
import {create_employer, job_history} from "../../controllers/employer_control.js";
i
const router = express.Router();

router.post('/user_to_Employer', create_employer); 
router.post('/job_history', job_history); 



export default router;