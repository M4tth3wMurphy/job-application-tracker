import Application from "../models/Application.js";
import { isValidTransition } from "../utils/statusTransitions.js";

export const createApplication = async (req, res) => {
  try {
    const application = await Application.create({
      ...req.body,
      status: "Applied",
      user: req.user._id,
      activityLog: [
        {
          type: "CREATED",
          message: "Application created"
        }
      ]
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
      .populate({
        path: "company",
        select: "name industry location website contacts"
      })
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
    const application = await Application.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    if (req.body.status && req.body.status !== application.status) {
      if (!isValidTransition(application.status, req.body.status)) {
        return res.status(400).json({
          message: `Invalid status transition from ${application.status} to ${req.body.status}`
        });
      }

      application.activityLog.push({
        type: "STATUS_CHANGE",
        message: `Status changed from ${application.status} to ${req.body.status}`
      });

      application.status = req.body.status;
    }

    const { status, ...updates } = req.body;

    Object.assign(application, updates);

    await application.save();

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
