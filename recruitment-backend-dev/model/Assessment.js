const mongoose = require('mongoose');

const AssessmentSchema = new mongoose.Schema({
  candidateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Candidate',
    required: true,
  },

  type: {
    type: String,
    enum: ['Technical', 'SoftSkill', 'Compliance', 'Custom'],
    required: true,
  },

  title: {
    type: String,
    required: true,
  },

  questions: [
    {
      questionText: String,
      options: [String],         // For MCQ (optional)
      correctAnswer: String,     // For auto-grading (optional)
      candidateAnswer: String,
      score: Number,             // Points for this question
    }
  ],

  totalScore: {
    type: Number,
    default: 0,
  },

  passed: {
    type: Boolean,
    default: false,
  },

  attemptDate: {
    type: Date,
    default: Date.now,
  },

  notes: {
    type: String,
  },

  reviewedByAdmin: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

module.exports = mongoose.model('Assessment', AssessmentSchema);
