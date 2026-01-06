import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import applicationRoutes from "./routes/applicationRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import companyRoutes from "./routes/companyRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api/applications", applicationRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/companies", companyRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "Job Tracker API running" });
});

export default app;
