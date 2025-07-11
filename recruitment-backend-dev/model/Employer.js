// models/Employer.js
import mongoose from "mongoose";
const EmployerSchema = new mongoose.Schema(
  {
    user_Id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    profile_image: {
      type: String,
    },
    company_name: {
      type: String,
    },

    contact_Person: {
      fullName: String,
      phone: String,
      email: String,
    },

    address: {
      street: String,
      city: String,
      state: String,
      country: String,
      zipCode: String,
    },

    social_media: {
      instagram: String,
      Twitter: String,
      Facebook: String,
      LinkedIn: String,
      Youtube: String,
    },
    industry: {
      type: String,
      default: "Healthcare",
    },

    job_Postings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
      },
    ],

    ats_Preferences: {
      autoScreening: Boolean,
      requiredSkills: [String],
      excludeKeywords: [String],
      minExperience: Number,
    },

    subscription_Plan: {
      planType: String, // e.g., 'Free', 'Standard', 'Enterprise'
      validUntil: Date,
    },

    billing_Info: {
      billingEmail: String,
      paymentMethod: String, // Tokenized reference if integrated with Stripe or similar
    },

    onboarding_Completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Employer", EmployerSchema);
