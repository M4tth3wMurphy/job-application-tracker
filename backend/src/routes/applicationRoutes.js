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

export default router;
