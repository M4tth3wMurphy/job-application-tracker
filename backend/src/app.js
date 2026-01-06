import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import applicationRoutes from "./routes/applicationRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api/applications", applicationRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "Job Tracker API running" });
});

export default app;
