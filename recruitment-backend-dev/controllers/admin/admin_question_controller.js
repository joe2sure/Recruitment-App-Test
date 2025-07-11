import User from "../../model/User.js";
import Candidate from "../../model/Candidate.js";

import { candidateUpdateSchema, secureCandidateData } from "../../utils/candidatesanitizeUtils.js";
import { secureUserData } from "../../utils/uservalidate.js";
import mongoose from "mongoose";
import QuestionSet from "../../model/Question.js";
import { validateQuestionSetCreate, validateQuestionSetUpdate } from "../../utils/questionsanitizer.js";

const normalizeJobTitle = (str) => {
    return str.trim().replace(/\s+/g, ' ').toLowerCase(); // Normalize spacing and case
};
// POST /api/question-set
export const createQuestionSet = async (req, res) => {
    try {
        // Basic validations
        const rawJobTitle = req.body.jobTitle;
        const normalizedIncoming = normalizeJobTitle(rawJobTitle);
        console.log("normalizedIncoming", normalizedIncoming);
        // Fetch all question sets to check for duplicates
        const allQuestionSets = await QuestionSet.find();
        console.log(allQuestionSets);
        // Check if any existing jobTitle matches the normalized one
        const duplicate = allQuestionSets.find(qs =>
            normalizeJobTitle(qs.jobTitle) === normalizedIncoming
        );


        if (duplicate) {
            return res.status(409).json({ message: "This job title already has a question set." });
        }





        const { error, value } = validateQuestionSetCreate.validate(req.body, { abortEarly: false });
        if (error) return res.status(400).json({ errors: error.details });

        const questionSet = new QuestionSet(value);

        await questionSet.save();

        res.status(201).json({
            message: 'Question set created successfully',

        });
    } catch (error) {
        console.error('Error creating question set:', error);
        res.status(500).json({ message: 'Server error. Try again later.' });
    }
};


export const updateQuestionSet = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, error: "Invalid Question Set ID format" });
        }

        const questionSet = await QuestionSet.findById(id);
        if (!questionSet) {
            return res.status(404).json({ message: "Question set not found" });
        }

        // Validate the body (optional: if you use Joi, make sure it allows optional fields)

        // Handle updating a question
        if (req.body.question_id) {
            const index = questionSet.questions.findIndex(q => q._id.toString() === req.body.question_id);
            if (index === -1) {
                return res.status(404).json({ message: "Question not found" });
            }

            // Update only the fields passed
            const fieldsToUpdate = ["questionText", "options", "correctAnswer", "explanation", "timeLimit", "isMandatory"];

            if (!Array.isArray(req.body.options) || req.body.options.length < 3) {
                return res.status(400).json({
                    message: "Each question must have at least 3 options."
                });
            }
            fieldsToUpdate.forEach(field => {
                if (req.body[field] !== undefined) {
                    questionSet.questions[index][field] = req.body[field];
                }
            });

        } else if (req.body.questionText && req.body.options && req.body.correctAnswer) {
            if (!Array.isArray(req.body.options) || req.body.options.length < 3) {
                return res.status(400).json({
                    message: "Each question must have at least 3 options."
                });
            }

            if (!req.body.options.includes(req.body.correctAnswer)) {
                return res.status(400).json({
                    message: "Correct answer must be one of the options."
                });
            }
            // Add new question to the set
            questionSet.questions.push({
                questionText: req.body.questionText,
                options: req.body.options,
                correctAnswer: req.body.correctAnswer,
                explanation: req.body.explanation || '',
                timeLimit: req.body.timeLimit || 60,
                isMandatory: req.body.isMandatory !== undefined ? req.body.isMandatory : true
            });
        } else if (Array.isArray(req.body.questions)) {
            for (const q of req.body.questions) {
                if (!q.questionText || !Array.isArray(q.options) || q.options.length < 3 || !q.correctAnswer) {
                    return res.status(400).json({
                        message: "Each question must include at least 3 options, a questionText, and a correctAnswer."
                    });
                }

                if (!q.options.includes(q.correctAnswer)) {
                    return res.status(400).json({
                        message: `Correct answer must be one of the options for question: "${q.questionText}".`
                    });
                }

                questionSet.questions.push({
                    questionText: q.questionText,
                    options: q.options,
                    correctAnswer: q.correctAnswer,
                    explanation: q.explanation || '',
                    timeLimit: q.timeLimit || 60,
                    isMandatory: q.isMandatory !== undefined ? q.isMandatory : true
                });
            }
        }

        if (req.body.title) { questionSet.title = req.body.title };
        if (req.body.jobTitle) { questionSet.jobTitle = req.body.jobTitle };
        if (req.body.difficulty) { questionSet.difficulty = req.body.difficulty }
        if (req.body.visibility) { questionSet.visibility = req.body.visibility };
        await questionSet.save();

        res.status(200).json({
            message: 'Question set updated successfully',
            data: questionSet
        });
    } catch (error) {
        console.error('Error updating question set:', error);
        res.status(500).json({ message: 'Server error. Try again later.' });
    }
};

export const deleteQuestionSet = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, error: "Invalid Question Set ID format" });
        }

        const questionSet = await QuestionSet.findById(id);
        if (!questionSet) {
            return res.status(404).json({ message: "Question set not found" });
        }

        // Validate the body (optional: if you use Joi, make sure it allows optional fields)

        // Handle updating a question
        if (req.body.question_id) {
            const index = questionSet.questions.findIndex(q => q._id.toString() === req.body.question_id);
            if (index === -1) {
                return res.status(404).json({ message: "Question not found" });
            }

            // Update only the fields passed
            const fieldsToUpdate = ["questionText", "options", "correctAnswer", "explanation", "timeLimit", "isMandatory"];

            if (!Array.isArray(req.body.options) || req.body.options.length < 3) {
                return res.status(400).json({
                    message: "Each question must have at least 3 options."
                });
            }
            fieldsToUpdate.forEach(field => {
                if (req.body[field] !== undefined) {
                    questionSet.questions[index][field] = req.body[field];
                }
            });

        } else if (req.body.questionText && req.body.options && req.body.correctAnswer) {
            if (!Array.isArray(req.body.options) || req.body.options.length < 3) {
                return res.status(400).json({
                    message: "Each question must have at least 3 options."
                });
            }

            if (!req.body.options.includes(req.body.correctAnswer)) {
                return res.status(400).json({
                    message: "Correct answer must be one of the options."
                });
            }
            // Add new question to the set
            questionSet.questions.push({
                questionText: req.body.questionText,
                options: req.body.options,
                correctAnswer: req.body.correctAnswer,
                explanation: req.body.explanation || '',
                timeLimit: req.body.timeLimit || 60,
                isMandatory: req.body.isMandatory !== undefined ? req.body.isMandatory : true
            });
        } else if (Array.isArray(req.body.questions)) {
            for (const q of req.body.questions) {
                if (!q.questionText || !Array.isArray(q.options) || q.options.length < 3 || !q.correctAnswer) {
                    return res.status(400).json({
                        message: "Each question must include at least 3 options, a questionText, and a correctAnswer."
                    });
                }

                if (!q.options.includes(q.correctAnswer)) {
                    return res.status(400).json({
                        message: `Correct answer must be one of the options for question: "${q.questionText}".`
                    });
                }

                questionSet.questions.push({
                    questionText: q.questionText,
                    options: q.options,
                    correctAnswer: q.correctAnswer,
                    explanation: q.explanation || '',
                    timeLimit: q.timeLimit || 60,
                    isMandatory: q.isMandatory !== undefined ? q.isMandatory : true
                });
            }
        }

        if (req.body.title) { questionSet.title = req.body.title };
        if (req.body.jobTitle) { questionSet.jobTitle = req.body.jobTitle };
        if (req.body.difficulty) { questionSet.difficulty = req.body.difficulty }
        if (req.body.visibility) { questionSet.visibility = req.body.visibility };
        await questionSet.save();

        res.status(200).json({
            message: 'Question set updated successfully',
            data: questionSet
        });
    } catch (error) {
        console.error('Error updating question set:', error);
        res.status(500).json({ message: 'Server error. Try again later.' });
    }
};




export const getAllQues = async (req, res) => {
    try {
        const filters = {};

        if (req.query.title) filters.title = req.query.title;

        // ✅ Filter by nested location fields
        if (req.query.jobTitle) filters.jobTitle = req.query.jobTitle;
        if (req.query.difficulty) filters.difficulty = req.query.difficulty;
        if (req.query.questionText) filters['questions.questionText'] = req.query.questionText;


        // Get filtered jobs
        const question = await QuestionSet.find(filters).sort({ createdAt: -1 }).lean();

        // Attach employer info
        // const job_details = await Promise.all(
        //   jobposts.map(async (post) => {
        //     const employer = await Employer.findById(post.employerId)
        //       .select('company_name profile_image')
        //       .lean();

        //     return {
        //       ...post,
        //       employer: employer || null,
        //     };
        //   })
        // );

        res.status(200).json(question);
    } catch (error) {
        console.error("Error fetching job posts:", error);
        res.status(500).json({ error: error.message });
    }
}



/**
 * update cadidate information using  user id
 */

export const update_questions = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate user ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid user ID" });
        }

        // Check if user exists
        const existingUser = await User.findById(id);
        if (!existingUser) {
            return res.status(404).json({ error: "User not found" });
        }

        // Check if user is a Candidate
        if (existingUser.role !== "Candidate") {
            return res.status(403).json({ error: "User is not a candidate" });
        }

        // Validate and sanitize user data
        const { error: userError, value: sanitizedUserData } = await secureUserData(req.body);
        if (userError) {
            return res.status(400).json({ error: "Invalid user data", details: userError });
        }

        // Update user
        const updatedUser = await User.findOneAndUpdate(
            { _id: user_Id },
            sanitizedUserData,
            { new: true, runValidators: true }
        );

        // Validate and sanitize candidate data
        const { error: candidateError, value: sanitizedCandidateData } = await secureCandidateData(req.body);
        if (candidateError) {
            return res.status(400).json({ error: "Invalid candidate data", details: candidateError });
        }

        // Update candidate
        const updatedCandidate = await Candidate.findOneAndUpdate(
            { user_Id },
            sanitizedCandidateData,
            { new: true, runValidators: true }
        );

        if (!updatedCandidate) {
            return res.status(404).json({
                error: "Candidate record not found. User may not have completed registration.",
            });
        }

        // Send success response
        return res.status(200).json({
            message: "User and candidate data updated successfully",
            user: updatedUser,
            details: updatedCandidate,
        });

    } catch (error) {
        console.error("Update Candidate Error:", error);
        return res.status(500).json({ error: error.message });
    }
};




/**
 * update cadidate status using  user id
 */

export const update_candidate_status = async (req, res) => {
    try {
        const { status, user_Id } = req.body;

        if (!status || !user_Id) {
            return res.status(400).json({ error: "Status and user ID are required" });
        }
        if (!mongoose.Types.ObjectId.isValid(user_Id)) {
            return res.status(400).json({ error: "Invalid user ID" });
        }

        // Validate allowed status values
        const allowedStatuses = ['active', 'suspended', 'pending'];
        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({ error: "Invalid status value" });
        }

        // Find user first to validate role
        const user = await User.findById(user_Id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        if (user.role !== "Candidate") {
            return res.status(403).json({ error: "User is not a candidate" });
        }

        // Update status
        user.status = status;
        await user.save();

        res.status(200).json({ message: "Candidate status updated", user });

    } catch (err) {
        console.error("Error updating candidate status:", err);
        res.status(500).json({ error: "Server error" });
    }
};


/**
 * delete cadidate status using  user id
 */

export const delete_candidate = async (req, res) => {
    try {
        const { user_Id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(user_Id)) {
            return res.status(400).json({ error: "Invalid user ID" });
        }
        if (!user_Id) {
            return res.status(400).json({ error: "user_Id is required" });
        }

        // Find user first
        const user = await User.findById(user_Id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        if (user.role !== "Candidate") {
            return res.status(403).json({ error: "User is not a Candidate" });
        }

        // Delete candidate detail
        await Candidate.findOneAndDelete({ user_Id });

        // Delete user
        await User.findByIdAndDelete(user_Id);

        res.status(200).json({ message: "Candidate deleted successfully" });
    } catch (err) {
        console.error("Delete Candidate Error:", err);
        res.status(500).json({ error: "Server error" });
    }
};
