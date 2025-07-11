// controllers/paymentController.js
// Author: Developer Uche Victor
// Date: 15-05-2025
// Description: This file contains the payment controller for handling Stripe payments.
// Purpose: Handles Stripe logic + billing actions for employer subscriptions

// import Stripe from 'stripe';
// import EmployerSubscription from '../model/EmployerSubscription.js';

// const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const paymentController = {
  // POST /api/payment/create-checkout-session
  createCheckoutSession: async (req, res) => {
    try {
      const { plan, employerId } = req.body;

      const planPricing = {
        basic: 5000,    // in cents: $50.00
        premium: 10000, // in cents: $100.00
      };

      if (!planPricing[plan]) {
        return res.status(400).json({ error: 'Invalid plan selected' });
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
          price_data: {
            currency: 'usd',
            product_data: {
              name: `${plan.charAt(0).toUpperCase() + plan.slice(1)} Plan Subscription`,
            },
            unit_amount: planPricing[plan],
          },
          quantity: 1,
        }],
        mode: 'payment',
        success_url: `http://localhost:3000/payment-success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `http://localhost:3000/payment-cancelled`,
      });

      res.status(200).json({ sessionId: session.id });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // GET /api/payment/history/:employerId
  getPaymentHistory: async (req, res) => {
    try {
      const { employerId } = req.params;
      const subscription = await EmployerSubscription.findOne({ employerId });

      if (!subscription) {
        return res.status(404).json({ message: 'No subscription found' });
      }

      res.status(200).json(subscription.paymentHistory);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Utility: Deduct job credit (called internally)
  deductJobCredit: async (employerId) => {
    const subscription = await EmployerSubscription.findOne({ employerId });
    if (!subscription || subscription.credits <= 0) {
      throw new Error('Insufficient credits');
    }

    subscription.credits -= 1;
    await subscription.save();

    return subscription;
  }
};
 
export default paymentController;
