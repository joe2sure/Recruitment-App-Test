import mongoose from 'mongoose';

const ATSConfigSchema = new mongoose.Schema(
  {
    employerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employer',
      required: true,
      unique: true, // One config per employer
    },

    criteria: [
      {
        field: {
          type: String,
          required: true,
          enum: [
            'yearsOfExperience',
            'educationLevel',
            'certifications',
            'location',
            'skills',
            'availability',
          ],
        },

        operator: {
          type: String,
          required: true,
          enum: ['equals', 'contains', '>=', '<=', 'in', 'notIn'],
        },

        value: mongoose.Schema.Types.Mixed, // Flexible to store any type (number, string, array, etc.)
      },
    ],

    weightings: {
      experience: { type: Number, default: 1 },
      education: { type: Number, default: 1 },
      certifications: { type: Number, default: 1 },
      skills: { type: Number, default: 1 },
      location: { type: Number, default: 1 },
      availability: { type: Number, default: 1 },
    },

    autoRejectRules: [
      {
        field: String,
        operator: String,
        value: mongoose.Schema.Types.Mixed,
      },
    ],

    enabled: {
      type: Boolean,
      default: true,
    },

    notes: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model('ATSConfig', ATSConfigSchema);
