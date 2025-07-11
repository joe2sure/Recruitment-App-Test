import User from "../../model/User.js";
import Candidate from "../../model/Candidate.js";

import { candidateUpdateSchema, secureCandidateData } from "../../utils/candidatesanitizeUtils.js";
import { secureUserData } from "../../utils/uservalidate.js";
import mongoose from "mongoose";
// const { error, value } = validateUserinfo.validate(req.body, {
//   abortEarly: false, // get all errors
//   stripUnknown: true, // remove unknown keys
// });


export const get_All_candidates = async (req, res) => {
  try {
    // Validate the query params (already sanitized by global middleware)
    const { error, value: validatedFilters } = candidateUpdateSchema.validate(req.query, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      return res.status(400).json({
        error: "Invalid query filters",
        details: error.details.map((d) => d.message),
      });
    }

    // Base filter: role must be Candidate
    const filters = {};

    if (validatedFilters.email) filters.email = validatedFilters.email;
    if (validatedFilters.phone_number) filters.phone_number = validatedFilters.phone_number;
    if (validatedFilters.status) filters.status = validatedFilters.status;
    if (typeof validatedFilters.isActive === "boolean") {
      filters.isActive = validatedFilters.isActive;
    }

    // Query candidates with filters
    const candidates = await Candidate.find(filters).sort({createAt:-1}).lean();
    const allcandidates = await Promise.all(
      candidates.map(async (candidate) => {
        const user = await User.findById(candidate.user_Id).select("-activeSessions   -tokenBlacklist  -createdAt").lean();

        return {
          user,
          ...candidate,
        };
      })
    );
    return res.status(200).json(allcandidates);
  } catch (error) {
    console.error("Error fetching candidates:", error);
    return res.status(500).json({ error: error.message });
  }
};




/**
 * Get all cadidate using  user id
 */


export const get_candidate_id = async (req, res) => {
  try {
    const { user_Id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(user_Id)) {
      return res.status(400).json({ status: false, message: "Invalid user ID" });
    }

    if (!user_Id) {
      return res.status(400).json({ error: 'Please provide a user ID' });
    }

    const user = await User.findById(user_Id).exec();

    if (!user) {
      await Candidate.findOneAndDelete({ user_Id });
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.role !== 'Candidate') {
      return res.status(403).json({ error: 'User is not a candidate' });
    }

    const other_detail = await Candidate.findOne({ user_Id }).exec();

    if (!other_detail) {
      return res.status(404).json({
        error: 'Candidate record not found. User may not have completed registration.',
      });
    }

    res.status(200).json({ user, other_detail });
  } catch (error) {
    console.error('Gets Candidate Error:', error);
    res.status(500).json({ error: error.message });
  }
};


/**
 * update cadidate information using  user id
 */

export const update_candidate_data = async (req, res) => {
  try {
    const { user_Id } = req.params;

    // Validate user ID
    if (!mongoose.Types.ObjectId.isValid(user_Id)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    // Check if user exists
    const existingUser = await User.findById(user_Id);
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
