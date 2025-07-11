import User from "../../model/User.js";
import Admin from "../../model/Admin.js";
import Candidate from "../../model/Candidate.js";
import Employer from "../../model/Employer.js";
import JobPost from "../../model/JobPost.js";
import Application from "../../model/Application.js";
import { secureAdminData, adminSchema } from "../../utils/adminsanitizeUtils.js";
import { secureUserData } from "../../utils/uservalidate.js";
// import { uploadToCloudinary, replaceCloudinaryFile } from "../../utils/uplaod.js";
import { uploads, deleteFile } from '../../utils/uplaod.js';



export const registerAdmin = async (req, res) => {
  try {
    const user_Id = req.user?.id;
    console.log("Extracted user_Id:", user_Id);
    
    // ✅ Validate user ID
    if (!user_Id) {
      return res.status(400).json({ error: 'User ID is required.' });
    }

    const user = await User.findById(user_Id);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    console.log("Found user:", user.id);

    // ✅ Check if Admin already exists
    const existingAdmin = await Admin.findOne({ user_Id: user.id });
    if (existingAdmin) {
      return res.status(409).json({ error: 'Admin already registered.' });
    }

    // ✅ Prepare admin body
    const body = { ...req.body };
   body.user_Id = req.user._id.toString();

    // ✅ Parse permissions JSON if needed
    if (body.permissions && typeof body.permissions === 'string') {
      try {
        body.permissions = JSON.parse(body.permissions);
      } catch (e) {
        return res.status(400).json({ error: '"permissions" must be valid JSON.' });
      }
    }

    // ✅ Handle optional image upload
    if (req.file) {
      const imageUrl = await uploads(
        req.file.buffer,
        req.file.originalname,
        "image/admin"
      );
      body.profile_image = imageUrl;
    }

    // ✅ Construct full name
    const full_Name = `${user.first_Name} ${user.middle_Name || ''} ${user.last_Name}`.trim();
   
    // ✅ Clean admin data

 
const cleanData = await secureAdminData({ ...body, full_Name });
console.log(cleanData.user_Id);

    //✅ Create and save Admin
    const admin = new Admin({
      ...body, full_Name
    });
    await admin.save();

    // ✅ Success response
    return res.status(201).json({
      success: true,
      message: 'Admin registered successfully.',
      data: admin,
    });

  } catch (err) {
    console.error('Admin registration error:', err);

    // Prevent double response sending
    if (!res.headersSent) {
      res.status(500).json({ error: 'Internal server error.' });
    }
  }
};

export const updateAdminData = async (req, res) => {
  try {
    const user_Id = req.user?.id;
 
    console.log(user_Id, "user id");
    
    if (!user_Id) {
      return res.status(400).json({ error: 'User ID is required.' });
    }

    const user = await User.findById(user_Id);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ user_Id });
    if (!existingAdmin) {
      return res.status(409).json({ error: 'this user have not complete the rigistration registered.' });
    }

    // Clone req.body to avoid mutation
    const body = { ...req.body };

    // Parse permissions if passed as a JSON string
    if (body.permissions) {
      if (typeof body.permissions === 'string') {
        try {
          body.permissions = JSON.parse(body.permissions);
        } catch (e) {
          return res.status(400).json({ error: '"permissions" must be valid JSON.' });
        }
      }
    }

    // Handle image upload
    if (req.file) {
      if(existingAdmin.profile_image){
        await deleteFile(existingAdmin.profile_image)
      }

          
      const imageUrl = await uploads(
        req.file.buffer,
        req.file.originalname,
        "image/admin"
      );
      body.profile_image = imageUrl;
      console.log(body.profile_image, imageUrl, 'dddd');

    }


    // update and save the new admin
    const { error: userError, value: sanitizedUserData } = await secureUserData(req.body);
    if (userError) {
      return res.status(400).json({ error: "Invalid user data", details: userError });
    }
    const newdatauser = await User.findOneAndUpdate({ _id: user_Id }, sanitizedUserData, {
      new: true,
      runValidators: true,
    });

    const full_Name = `${user.first_Name} ${user.middle_Name} ${user.last_Name}`.trim();
    //update admin detal 
       const cleanData = await secureAdminData({ ...body, user_Id, full_Name });
    const newadmindata = await Admin.findOneAndUpdate({ user_Id }, cleanData, {
      new: true,
      runValidators: true,
    });

    res.status(201).json({
      success: true,
      message: 'Admin successfully updated',
      data: {

        newdatauser,
        newadmindata,
         
      },
    });
  } catch (err) {
    console.error('Admin registration error:', err);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

export const getAdmindetail = async (req, res) => {
  try {
    const user_Id = req.user?.id;
 
    console.log(user_Id, "user id");
    
    if (!user_Id) {
      return res.status(400).json({ error: 'User ID is required.' });
    }

    const user_details = await User.findById(user_Id);
    if (!user_details) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Check if admin already exists
    const admin_details = await Admin.findOne({ user_Id });
    if (!admin_details) {
      return res.status(409).json({ error: 'this user have not complete the registered.' });
    }

 

   

    res.json({
      success: true,
      data: {
        user_details,
        admin_details
      },
    });
  } catch (error) {
    console.error(`[ERROR] getEmployerById: ${error.message}`, {
      employerId: req.params.id,
    });

    res.status(500).json({
      success: false,
      error: "Failed to fetch employer",
    });
  }
};

export const deleteAdminData = async (req,res) => {
    try {
        let user_Id = req.user.id
        if (!mongoose.Types.ObjectId.isValid(req.user.id)) {
            return res.status(400).json({ status: false, message: "Invalid user ID" });
        }

        const deleted = await Admin.findByIdAndDelete(user_Id);
       await User.findByIdAndDelete(user_Id);
        if (!deleted) {
            return res.status(404).json({ status : false, message: "admin not found" });
        }
        res.status(200).json({ status : true, message: "admin deleted successfully" })

    } catch (error) {
        res.status(500).json({ error: error })
    }
}

const total_activate_daily = async () => {
  const now = new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);

  const [registerCount, loginCount, jobPostCount, applicationCount] = await Promise.all([
    User.countDocuments({ createdAt: { $gte: startOfDay, $lt: endOfDay } }),
    JobPost.countDocuments({ createdAt: { $gte: startOfDay, $lt: endOfDay } }),
    Application.countDocuments({ createdAt: { $gte: startOfDay, $lt: endOfDay } }),
  ]);

  const dailyTotals = {
    total_register_daily: registerCount,
    total_login_daily: loginCount,
    total_job_post_daily: jobPostCount,
    total_application_daily: applicationCount
  };

  console.log("Daily Totals:", dailyTotals);
  return dailyTotals;
};


const getJobPostStats = async () => {
  const now = new Date();
  const currentYear = now.getFullYear();

  const stats = [];

  for (let month = 0; month < 7; month++) {
    const startOfMonth = new Date(currentYear, month, 1);
    const endOfMonth = new Date(currentYear, month + 1, 1);

    // Weekly breakdown = posts from the first 7 days of the month
    const weeklyCount = await JobPost.countDocuments({
      updatedAt: {
        $gte: startOfMonth,
        $lt: new Date(currentYear, month, 8),
      },
      frequency: "weekly",
    });

    const monthlyCount = await JobPost.countDocuments({
      updatedAt: {
        $gte: startOfMonth,
        $lt: endOfMonth,
      },
      frequency: "monthly",
    });

    const yearlyCount = await JobPost.countDocuments({
      updatedAt: {
        $gte: new Date(currentYear, 0, 1),
        $lt: new Date(currentYear + 1, 0, 1),
      },
      frequency: "yearly",
    });

    stats.push({
      month: startOfMonth.toLocaleString("default", { month: "short" }), // Jan, Feb, etc.
      weekly: weeklyCount,
      monthly: monthlyCount,
      yearly: yearlyCount,
    });
  }

  console.log(stats);
  return stats;
};


const total_activate_weekly = async () => {
  const results = [];

  // Loop over the past 7 days
  for (let i = 6; i >= 0; i--) {
    const day = new Date();
    day.setDate(day.getDate() - i);

    const startOfDay = new Date(day.getFullYear(), day.getMonth(), day.getDate());
    const endOfDay = new Date(day.getFullYear(), day.getMonth(), day.getDate() + 1);

    // Count totals for that day
    const [registerCount, CandidateCount, EmployerCount, jobPostCount, applicationCount] = await Promise.all([
      User.countDocuments({ createdAt: { $gte: startOfDay, $lt: endOfDay } }),
      User.countDocuments({ createdAt: { $gte: startOfDay, $lt: endOfDay }, role: 'Candidate' }),
      User.countDocuments({ createdAt: { $gte: startOfDay, $lt: endOfDay }, role: 'Employer' }),
      JobPost.countDocuments({ createdAt: { $gte: startOfDay, $lt: endOfDay } }),
      Application.countDocuments({ createdAt: { $gte: startOfDay, $lt: endOfDay } }),
    ]);

    results.push({
      date: startOfDay.toISOString().split('T')[0], // YYYY-MM-DD
      total_register: registerCount,
      total_candidate: CandidateCount,
      total_activate_daily: EmployerCount,
      total_job_post: jobPostCount,
      total_application: applicationCount
    });
  }

  console.log("Weekly Activity Summary:", results);
  return results;
};





export const getUsersRegisteredToday = async () => {
  try {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    const users = await User.find({
      createdAt: {
        $gte: startOfToday,
        $lte: endOfToday
      }
    });

    console.log(users);

  } catch (err) {
    console.error("Error getting today's registrations:", err);
    res.status(500).json({ error: "Server error" });
  }
};

export const total_job_post_daily = async () => {
  const now = new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  const jobpost = JobPost.find({ createdAt: { $gte: startOfDay, $lt: endOfDay } })

  console.log(jobpost);

}

// Usage


// Usage







export const getDashboardMetrics = async (req, res) => {


  try {
    //    total_activate_weekly().then(data => {
    //   console.table(data); // nicer output in console
    // });
    total_activate_daily()

    getJobPostStats()
    //  total_activate_daily()
    //  total_job_post_daily()
    //   getUsersRegisteredToday()
  } catch (error) {
    console.error("Error fetching today's registered users:", error);
    throw error;
  }

  try {

    total_activate_weekly().then(data => {
      console.table(data); // nicer output in console
    });
    //  total_activate_daily().then(data => {
    //   console.table(data); // nicer output in console
    // });

    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const endOfDay = new Date(startOfDay);
    endOfDay.setDate(startOfDay.getDate() + 1);



    const totalNewCandidatesToday = await Candidate.countDocuments({ createdAt: { $gte: startOfDay, $lt: endOfDay } });
    const totalNewEmployersToday = await Employer.countDocuments({ createdAt: { $gte: startOfDay, $lt: endOfDay } });
    const totalNewUsersToday = await User.countDocuments({ createdAt: { $gte: startOfDay, $lt: endOfDay } });
    const total_Users_Login_Today = await User.countDocuments({ lastLogin: { $gte: startOfDay, $lt: endOfDay } });
    const totalCandidates = await Candidate.countDocuments();
    const totalUser = await User.countDocuments();
    const totalEmployers = await Employer.countDocuments();
    const totalJobsPosted = await JobPost.countDocuments();
    const Applications = await Application.countDocuments();
    const totalAdmin = await Admin.countDocuments();
    const Assessment = await Assessment.countDocuments();
    res.status(200).json({
      totalUser,
      totalAdmin,
      totalCandidates,
      totalEmployers,
      totalJobsPosted,
      Applications,
      interviews:Assessment, 
      totalNewCandidatesToday,
      totalNewEmployersToday,
      totalNewUsersToday,
      total_Users_Login_Today
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching dashboard metrics", error });
  }
};



