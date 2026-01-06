import express from "express";
import {
  createApplication,
  getApplications,
  getApplicationById,
  updateApplication,
  deleteApplication
} from "../controllers/applicationController.js";
import requireAuth from "../middleware/requireAuth.js";

const router = express.Router();

router.use(requireAuth);

router.post("/", createApplication);
router.get("/", getApplications);
router.get("/:id", getApplicationById);
router.put("/:id", updateApplication);
router.delete("/:id", deleteApplication);

router.post("/:id/notes", async (req, res) => {
  try {
    const application = await Application.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    application.notes.push({ text: req.body.text });

    application.activityLog.push({
      type: "NOTE_ADDED",
      message: "Note added"
    });

    await application.save();

    res.json(application);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


export default router;
