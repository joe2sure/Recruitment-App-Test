import ATSConfig from "../model/ATSConfig.js";

// ✅ Create ATS Config
export const createATSConfig = async (req, res) => {
  try {
    const { employerId } = req.body;

    // Check if employer already has a config
    const existingConfig = await ATSConfig.findOne({ employerId });
    if (existingConfig) {
      return res.status(400).json({
        error: "ATS config already exists for this employer",
      });
    }

    const atsConfig = new ATSConfig(req.body);
    await atsConfig.save();
    res.status(201).json(atsConfig);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ✅ Get ATS Config by Employer ID
export const getATSConfigByEmployerId = async (req, res) => {
  try {
    const { employerId } = req.params;
    const config = await ATSConfig.findOne({ employerId });

    if (!config) {
      return res.status(404).json({ error: "ATS config not found" });
    }

    res.json(config);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ List All ATS Configs
export const getAllATSConfigs = async (req, res) => {
  try {
    const filters = {};

    if (req.query.enabled !== undefined) {
      filters.enabled = req.query.enabled === "true";
    }

    const configs = await ATSConfig.find(filters);
    res.json(configs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Update ATS Config by
export const updateATSConfig = async (req, res) => {
  try {
    const { employerId } = req.params;
//eeeee
    const config = await ATSConfig.findOneAndUpdate({ employerId }, req.body, {
      new: true,
      runValidators: true,
    });

    if (!config) {
      return res.status(404).json({ error: "ATS config not found" });
    }

    res.json(config);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ✅ Delete ATS Config by Employer ID
export const deleteATSConfig = async (req, res) => {
  try {
    const { employerId } = req.params;

    const config = await ATSConfig.findOneAndDelete({ employerId });

    if (!config) {
      return res.status(404).json({ error: "ATS config not found" });
    }

    res.status(204).send(); // No content
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
