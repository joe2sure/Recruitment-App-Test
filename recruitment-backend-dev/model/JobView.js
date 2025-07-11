import mongoose from "mongoose";

const JobViewSchema = new mongoose.Schema(
  {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "JobPost",
      required: true,
    },
    candidateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Candidate",
      required: true,
    },
    employerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employer",
      required: true,
    },
    viewedAt: {
      type: Date,
      default: Date.now,
    }
  },
  { 
    timestamps: true,
    // Create indexes for better query performance
    indexes: [
      { candidateId: 1, jobId: 1 }, // For quick lookups
      { jobId: 1, viewedAt: -1 }, // For job analytics
      { employerId: 1, viewedAt: -1 }, // For employer analytics
    ]
  }
);

export default mongoose.model("JobView", JobViewSchema);