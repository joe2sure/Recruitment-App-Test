import express from 'express'; 
import {requestPasswordReset, verifyPasswordResetToken, resetPassword} from "../../controllers/auth/passwordreset_controller.js";


const router = express.Router();

router.post('/requestpassword', requestPasswordReset); 
router.get("/password/:userId/:token", verifyPasswordResetToken);
router.post("/reset-password/:userId/:token", resetPassword);


export default router;