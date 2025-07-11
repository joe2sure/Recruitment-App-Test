import Joi from 'joi'
import mongoose from 'mongoose'

const objectId = (value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.error('any.invalid')
  }
  return value
}

export const validateApplicationInput = Joi.object({
  jobId: Joi.string().custom(objectId).optional(),
  candidateId: Joi.string().custom(objectId).optional(),
  employerId: Joi.string().custom(objectId).optional(),
useProfileResume:Joi.boolean().optional(),
  resumeUrl: Joi.string().optional(),
     coverLetter: Joi.string().optional(),
coverLetterFileUrl: Joi.string().optional(),

  currentStage: Joi.string()
    .valid('Applied', 'Shortlisted', 'Interviewing', 'Offered', 'Rejected', 'Hired')
    .default('Applied'),

  atsScore: Joi.number().min(0).max(100).optional(),

  atsScoreDetails: Joi.object({
    skillsMatched: Joi.array().items(Joi.string()).optional(),
    totalSkillsMatched: Joi.number().optional(),
    experienceMatch: Joi.boolean().optional(),
    credentialMatch: Joi.boolean().optional(),
    customRulesPassed: Joi.boolean().optional(),
  }).optional(),

  feedback: Joi.array()
    .items(
      Joi.object({
        reviewer: Joi.string().custom(objectId),
        note: Joi.string().optional(),
        createdAt: Joi.date().optional(),
      })
    )
    .optional(),

  interviewSchedule: Joi.array()
    .items(
      Joi.object({
        start: Joi.date().required(),
        end: Joi.date().required(),
        interviewer: Joi.string().custom(objectId),
        status: Joi.string().valid('Scheduled', 'Completed', 'Missed'),
        notes: Joi.string().optional(),
      })
    )
    .optional(),

  assessments: Joi.array()
    .items(
      Joi.object({
        assessmentId: Joi.string().custom(objectId),
        score: Joi.number().min(0).max(100).optional(),
        completed: Joi.boolean().optional(),
      })
    )
    .optional(),

  isWithdrawn: Joi.boolean().default(false),
  notes: Joi.string().optional(),
})
