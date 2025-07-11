import Joi from 'joi';

const objectId = (value, helpers) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.error('any.invalid')
    }
    return value
}
// 🔹 Sub-schema for individual questions
const questionSchema = Joi.object({
    questionText: Joi.string().required(),
    options: Joi.array().items(Joi.string()).min(2).required(),
    correctAnswer: Joi.string().required(),
    explanation: Joi.string().optional().allow(''),
    timeLimit: Joi.number().integer().min(10).default(60),
    isMandatory: Joi.boolean().default(true)
});

// 🔹 Main schema for creating
export const validateQuestionSetCreate = Joi.object({
    title: Joi.string().required(),
    jobTitle: Joi.string().required(),
    difficulty: Joi.string().valid('Easy', 'Medium', 'Hard').default('Medium'),

    rules: Joi.object({
        totalTimeLimit: Joi.number().integer().min(1).default(30),
        maxAttempts: Joi.number().integer().min(1).default(1),
        passScorePercent: Joi.number().min(0).max(100).default(50),
        isRandomized: Joi.boolean().default(true)
    }).default(),

    questions: Joi.array().items(questionSchema).min(1).required(),

    visibility: Joi.string().valid('public', 'private').default('private'),

    createdBy: Joi.string().required().regex(/^[0-9a-fA-F]{24}$/),
    creatorType: Joi.string().valid('Admin', 'Employer').required(),
    isActive: Joi.boolean().default(true)
});

// 🔄 Schema for updating — everything optional
export const validateQuestionSetUpdate = Joi.object({

    title: Joi.string().optional(),
    jobTitle: Joi.string().optional(),
    difficulty: Joi.string().valid('Easy', 'Medium', 'Hard').optional(),
    question_id: Joi.string().optional(),

    questions: Joi.array().items(
        Joi.object({
            _id: Joi.string().optional(), // Optional for editing existing questions
            questionText: Joi.string().optional(),
            options: Joi.array().items(Joi.string()).min(2).optional(),
            correctAnswer: Joi.string().optional(),
            explanation: Joi.string().optional().allow(''),
            timeLimit: Joi.number().integer().min(10).optional(),
            isMandatory: Joi.boolean().optional()
        })
    ).optional(),

    visibility: Joi.string().valid('public', 'private').optional(),
    createdBy: Joi.string().regex(/^[0-9a-fA-F]{24}$/).optional(),
    creatorType: Joi.string().valid('Admin', 'Employer').optional(),
    isActive: Joi.boolean().optional()
}).min(1); // Make sure at least one field is present
