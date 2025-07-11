// routes/payment.js (ES Modules)
// Author: Developer Uche Victor
// Date: 15-05-2025
// Description: This file defines the routes for payment-related operations.
// Purpose: API endpoints for Stripe billing and payment history

import express from 'express';
const router = express.Router();
import paymentController from '../controllers/paymentController.js';

router.post('/create-checkout-session', paymentController.createCheckoutSession);
router.get('/history/:employerId', paymentController.getPaymentHistory);

export default router;
