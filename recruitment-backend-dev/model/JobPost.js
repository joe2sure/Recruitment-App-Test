import mongoose from "mongoose";
import fetchTime from "../config/fetchtime.js";

const JobPostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    system_assessment:{
      type: Boolean,
      required: true,
      default: true,
    },
    description: {
      type: String,
      required: true,
    },

    jobDurationType: {
      type: String,
      enum: ["Weekly", "Monthly", "Yearly"],

    },

    isDeleted: {
      type: Boolean,
      default: false
    },

    department: {
      type: String,
    },

    employmentType: {
      type: String,
      enum: ["Full-time", "Part-time", "Contract", "Temporary", "Internship"],
      default: "Full-time",
    },

    location: {
      city: String,
      state: String,
      country: String,
      remote: { type: Boolean, default: false },
    },

    salaryRange: {
      min: Number,
      max: Number,
      currency: { type: String, default: "USD" },
    },

    requiredExperience: {
      minYears: Number,
      maxYears: Number,
    },

    requiredCredentials: [
      {
        name: String, // e.g., RN License, BLS Certificate
        issuingAuthority: String,
        required: { type: Boolean, default: true },
      },
    ],

    skillsRequired: [String], // e.g., ["IV Therapy", "Patient Assessment"]

    shift: {
      type: String,
      enum: ["Day", "Night", "Rotating"],
    },

    employerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employer",
      required: true,
    },

    atsSettings: {
      useCustomATS: { type: Boolean, default: false },
      screeningCriteria: [
        {
          field: String, // e.g., 'experience'
          operator: String, // e.g., '>=', 'equals'
          value: mongoose.Schema.Types.Mixed,
        },
      ],
    },

    status: {
      type: String,
      enum: ["Open", "Closed", "Paused"],
      default: "Open",
    },

    applicationDeadline: {
      type: Date,
    },

    interviewSlots: [
      {
        start: Date,
        end: Date,
      },
    ],

    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },

    isApproved: {
      type: Boolean,
      default: false, // When an employer posts a job, it will be false by default
    },

    notes: {
      type: String,
    },

  },
  { timestamps: true }
);



export default mongoose.model("JobPost", JobPostSchema);
