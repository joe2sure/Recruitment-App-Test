import mongoose from "mongoose"

const CandidateSchema = new mongoose.Schema(
  {
    user_Id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    favoriteJobs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "JobPost",
      }
    ],

    full_name: {
      type: String,

    },
    gender: {
      type: String,
      enum: ['Female', 'Male'],
      index: true
    },
    location: {
      city: String,
      state: String,
      country: String,
    },
    profile_image: {
      type: String,

    },

    date_of_birth: {
      type: Date,
      required: false, // or `true` if mandatory
    },
    resumeUrl: {
      type: String,
    },

    // Social media handles - only in Candidate model
    social_media: {
      instagram: String,
      twitter: String,
      facebook: String,
      linkedin: String,
      youtube: String,
      website: String,
    },

    parsed_ResumeData: {
      education: [
        {
          institution: String,
          degree: String,
          course: String,
          startDate: Date,
          endDate: Date,
        },
      ],
      experience: [
        {
          jobTitle: String,
          employer: String,
          startDate: Date,
          endDate: Date,
          responsibilities: String,
        },
      ],
      skills: [String],
    },

    credentials: [
      {
        type: {
          type: String,
          required: true,
        },
        issuingAuthority: {
          type: String,
        },
        validUntil: {
          type: Date,
        },
        verified: {
          type: Boolean,
          default: false,
        },
        documentUrl: {
          type: String,
        },
      },
    ],




    profile_Completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Candidate', CandidateSchema);
