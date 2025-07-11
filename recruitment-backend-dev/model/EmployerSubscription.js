// models/EmployerSubscription.js
// Author: Developer Uche Victor
// Date: 15-05-2025
// Description: This file defines the EmployerSubscription model for the database.
// Purpose: Stores employer billing data including plan, credits, and payment history.

import mongoose from 'mongoose';

const EmployerSubscriptionSchema = new mongoose.Schema({
  employerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employer',
    required: true,
  },
  plan: {
    type: String,
    enum: ['basic', 'premium'],
    required: true,
  },
  credits: {
    type: Number,
    default: 0,
  },
  paymentHistory: [
    {
      amount: Number,
      date: Date,
      transactionId: String,
      paymentMethod: String,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('EmployerSubscription', EmployerSubscriptionSchema);
