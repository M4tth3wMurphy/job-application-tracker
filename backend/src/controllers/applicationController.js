import Application from "../models/Application.js";

export const createApplication = async (req, res) => {
  try {
    const application = await Application.create({
      ...req.body,
      user: req.user._id
    });

    res.status(201).json(application);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getApplications = async (req, res) => {
  try {
    const applications = await Application
      .find({ user: req.user._id })
      .populate("company")
      .sort({ createdAt: -1 });

    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getApplicationById = async (req, res) => {
  try {
    const application = await Application.findOne({
      _id: req.params.id,
      user: req.user._id
    }).populate("company");

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateApplication = async (req, res) => {
  try {
    const application = await Application.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.json(application);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteApplication = async (req, res) => {
  try {
    const application = await Application.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.json({ message: "Application deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
