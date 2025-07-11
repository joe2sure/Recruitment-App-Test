import mongoose from 'mongoose'

const QuestionSetSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  jobTitle: {
    type: String,
    required: true,
  },

  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    default: 'Medium',
  },



  questions: [
    {
      questionText: { type: String, required: true },
      options: { type: [String], required: true },
      correctAnswer: { type: String, required: true },
      explanation: { type: String },
      timeLimit: { type: Number, default: 60 },
      isMandatory: { type: Boolean, default: true },
    }
  ],

  visibility: {
    type: String,
    enum: ['public', 'private'],
    default: 'private',
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'creatorType',
    required: true,
  },

  creatorType: {
    type: String,
    enum: ['Admin', 'Employer'],
    required: true,
  },

  isActive: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

export default mongoose.model('QuestionSet', QuestionSetSchema);
