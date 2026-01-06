import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ["Applied", "Interview", "Offer", "Rejected"],
      default: "Applied"
    },
    dateApplied: {
      type: Date,
      default: Date.now
    },
    salaryRange: String,
    notes: String,
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
);

const Application = mongoose.model("Application", applicationSchema);
export default Application;
