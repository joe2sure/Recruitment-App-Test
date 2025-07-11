import User from "../../model/User.js";
import Candidate from "../../model/Candidate.js";
import Employer from "../../model/Employer.js";
import Joi from "joi";
import Admin from "../../model/Admin.js";


//validate and sanitize the data


// Define reusable schema for updating user





///User Management

/**
 * Get  all the user in database 
 */
export const get_All_Users = async (req, res) => {
  try {
    const filters = {};

    if (req.query.email) filters.email = req.query.email;
    if (req.query.phone_number) filters.phone_number = req.query.phone_number;
    if (req.query.status) filters.status = req.query.status;
    if (req.query.role) filters.role = req.query.role;
    if (req.query.isActive !== undefined) filters.isActive = req.query.isActive === 'true';

    const allUsers = await User.find(filters);
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


/**
 * get user using  user id
 */
export const get_User_id = async (req, res) => {
  try {
    const { user_Id } = req.params;
    console.log(user_Id);
    
    if (!user_Id) res.status(200).json({ error: 'pls provide id' })
    const user = await User.findById(user_Id).exec();
    if (!user) return res.status(404).json({ error: "user not found" });
    console.log(user.role);
    let other_detail
    if (user.role === "Candidate") {
      const candidate_data = await Candidate.findOne({ user_Id }).exec();
      console.log(candidate_data);
      other_detail = candidate_data
    } else if (user.role === "Employer") {
      const Employer_detail = await Employer.findOne({ user_Id}).exec();
      other_detail = Employer_detail
    } else if(user.role === "Admin") {
        const Admin_detail = await Admin.findOne({ user_Id}).exec();
      other_detail = Admin_detail
    }

    console.log('dddddddd');

    res.json({ user, other_detail });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


/**
 * update user information using  user id
 */
export const update_user_data = async (req, res) => {
  try {


    const { user_Id } = req.params;
    if (!user_Id) res.status(401).json({ error: "id is require" });

    // Update User
    const userFound = await User.findOneAndUpdate({ _id: user_Id }, req.body, {
      new: true,
      runValidators: true,
    });

    if (!userFound) {
      return res.status(401).json({ error: "User not found" });
    }

    let other_detail = null;
    // Update Candidate or Employer details
    if (userFound.role === "Candidate") {
      other_detail = await Candidate.findOneAndUpdate({ user_Id }, req.body, {
        new: true,
        runValidators: true,
      });
      console.log('Candidate', await Employer.findOneAndUpdate({ user_Id }, req.body, {
        new: true,
        runValidators: true,
      }));

    } else if (userFound.role === "Employer") {
      other_detail = await Employer.findOneAndUpdate({ user_Id }, req.body, {
        new: true,
        runValidators: true,
      });
      console.log('employer', await Employer.findOneAndUpdate({ user_Id }, req.body, {
        new: true,
        runValidators: true,
      }));
    }
    else if (userFound.role === "Admin") {
      other_detail = await Admin.findOneAndUpdate({ user_Id }, req.body, {
        new: true,
        runValidators: true,
      });
      console.log('employer', await Employer.findOneAndUpdate({ user_Id }, req.body, {
        new: true,
        runValidators: true,
      }));
    }

    res.json({
      message: "User and role-specific data updated successfully",
      user: userFound,
      details: other_detail,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * delete employeer status using  user id
 */
export const update_user_status = async (req, res) => {
  try {
    const { status, id } = req.body;

    if (!status || !id) {
      return res.status(400).json({ error: "status or _id is required" });
    }

    // Validate status value
    if (!['active', 'suspended', 'pending'].includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    // Find and update user
    const user = await User.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).exec();

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    console.log('Status updated successfully');
    res.status(200).json({ message: "User status updated", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};


export const delete_user = async (req, res) => {
  try {
    const { user_Id } = req.params;
    if (!user_Id) {
      return res.status(400).json({ error: " _id is required" });
    }

    const user = await User.findByIdAndDelete(user_Id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};



export const getNewUsers = async (req, res) => {
  try {
    const { year, month, day, role } = req.query;

 
    const now = new Date();
    const y = parseInt(year) || now.getFullYear();
    const m = parseInt(month) || now.getMonth() + 1; // JS months are 0-based
    const d = parseInt(day) || now.getDate();

    const start = new Date(y, m - 1, d);
    const end = new Date(start);
    end.setDate(start.getDate() + 1);

    let filter = {
      createdAt: {
        $gte: start,
        $lt: end
      }
    };

    if (role) {
      filter.role = role;
    }

    const users = await User.find(filter).sort({ createdAt: -1 });

    res.status(200).json({ count: users.length, users });
  } catch (err) {
    console.error("Error fetching new users:", err);
    res.status(500).json({ error: "Server error" });
  }
};





































//Candidate Management
// export const update_user = async (req,)