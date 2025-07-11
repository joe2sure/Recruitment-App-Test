import User from "../../model/User.js";
import Employer from "../../model/Employer.js";




///User Management

/**
 * get all employeer 
 */

export const get_All_employers = async (req, res) => {
  try {
 
         const filters = { role: 'Employer' };
    if (req.query.email) filters.email = req.query.email;
    if (req.query.phone_number) filters.phone_number = req.query.phone_number;
    if (req.query.status) filters.status = req.query.status;
    if (req.query.isActive !== undefined) filters.isActive = req.query.isActive === 'true';

    const allemployers= await User.find(filters);
    
    res.status(200).json(allemployers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * get employeer  using  user id
 */

export const get_employer_id = async (req, res) => {
  try {
    const { user_Id } = req.params;

    if (!user_Id) return res.status(400).json({ error: 'Please provide an ID' });

    const user = await User.findById(user_Id).exec();

    if (!user) {
        await Employer.findOneAndDelete({ user_Id });
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.role !== 'Employer') return res.status(403).json({ error: 'User is not an Employer' })

    const other_detail = await Employer.findOne({ user_Id }).exec();
      if (!other_detail) {
      return res.status(404).json({
        error: "Employer record not found. User may not have completed registration.",
      });
    }
    res.status(200).json({ user, other_detail });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * update employeer information using  user id
 */
export const update_employer_data = async (req, res) => {
  try {
    const { user_Id } = req.params;

    if (!user_Id) return res.status(400).json({ error: "ID is required" });
    

    const userFound = await User.findOneAndUpdate({ _id:user_Id}, req.body, {
      new: true,
      runValidators: true,
    });

    if (!userFound) return res.status(404).json({ error: "User not found" });
    

    if (userFound.role !== "Employer") return res.status(403).json({ error: "User is not a Employer" });
    

    const other_detail = await Employer.findOneAndUpdate(
      {user_Id },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!other_detail) {
      return res.status(404).json({
        error: "Employer record not found. User may not have completed registration.",
      });
    }

    res.status(200).json({
      message: "User and Employer data updated successfully",
      user: userFound,
      details: other_detail,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


/**
 * update  employeer status using  user id
 */
export const update_employer_status = async (req, res) => {
  try {
    const { status, user_Id } = req.body;

    if (!status || !user_Id) {
      return res.status(400).json({ error: "Status and user_Id are required" });
    }

    const allowedStatuses = ["active", "suspended", "pending"];
    if (!allowedStatuses.includes(status.toLowerCase())) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    const user = await User.findByIdAndUpdate(
      user_Id,
      { status: status.toLowerCase() },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "User status updated", user });
  } catch (err) {
    console.error("Update Employer Status Error:", err);
    res.status(500).json({ error: "Server error" });
  }
};


/**
 * delete employeer  using  user id
 */
export const delete_employer = async (req, res) => {
  try {
    const { user_Id } = req.params;

    if (!user_Id) {
      return res.status(400).json({ error: "user_Id is required" });
    }

    // First, find the user to verify existence and role
    const user = await User.findById(user_Id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.role !== "Employer") {
      return res.status(403).json({ error: "User is not an Employer" });
    }

    // Delete the user
    await User.findByIdAndDelete(user_Id);

    // Delete the associated Employer record
    await Employer.findOneAndDelete({ user_Id });

    res.status(200).json({ message: "Employer user and details deleted successfully" });
  } catch (err) {
    console.error("Delete Employer Error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

