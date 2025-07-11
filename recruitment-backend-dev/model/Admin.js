// models/Admin.js

import mongoose from 'mongoose';

const AdminSchema = new mongoose.Schema(
  {
    user_Id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    full_Name: {
      type: String,
      required: true,
      trim: true,
    },
    profile_image: {
      type: String,
      trim: true,
    },
    roleLevel: {
      type: String,
      enum: ['SuperAdmin', 'Manager', 'Support'],
      default: 'Support',
    },
    permissions: {
      manageUsers: { type: Boolean, default: false },
      manageJobs: { type: Boolean, default: false },
      manageTraining: { type: Boolean, default: false },
      manageCredentials: { type: Boolean, default: false },
      manageReports: { type: Boolean, default: false },
      fullAccess: { type: Boolean, default: false },
    },
    lastAction: {
      type: Date,
    },
    notes: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Admin', AdminSchema);
