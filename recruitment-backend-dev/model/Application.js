
import mongoose from 'mongoose'

const ApplicationSchema = new mongoose.Schema(
  {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'JobPost',
      required: true,
    },

    candidateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Candidate',
      required: true,
    },

    employerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employer',
      required: true,
    },
    jobStatus: {
      type: String,
      enum: ['active', 'deleted'],
      default: 'active'
    },
    jobDeletedAt: {
      type: Date
    },

    resumeUrl: {
      type: String,
      required: true
    },

    coverLetter: {
      type: String,
    },
    coverLetterUrl: {
      type: String,
    },

    currentStage: {
      type: String,
      enum: ['Applied', 'Shortlisted', 'Interviewing', 'Offered', 'Rejected', 'Hired'],
      default: 'Applied',
    },

    atsScore: {
      type: Number, // Score from ATS matching (e.g., 0–100 or 0–1)
    },

    atsScoreDetails: {
      type: Object
    },

    feedback: [
      {
        reviewer: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Admin',
        },
        note: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    interviewSchedule: [
      {
        start: Date,
        end: Date,
        interviewer: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Admin',
        },
        status: {
          type: String,
          enum: ['Scheduled', 'Completed', 'Missed'],
        },
        notes: String,
      },
    ],

    assessments: [
      {
        assessmentId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Assessment',
        },
        score: Number,
        completed: Boolean,
      },
    ],

    isWithdrawn: {
      type: Boolean,
      default: false,
    },

    notes: {
      type: String,
    },
  },
  { timestamps: true }
)

export default mongoose.model('Application', ApplicationSchema)
