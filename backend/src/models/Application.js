import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["CREATED", "STATUS_CHANGE", "NOTE_ADDED"],
      required: true
    },
    message: {
      type: String,
      required: true
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  },
  { _id: false }
);

const noteSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  { _id: false }
);

const applicationSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: true,
      trim: true
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

    salaryRange: {
      type: String,
      trim: true
    },

    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    notes: [noteSchema],

    activityLog: [activitySchema]
  },
  {
    timestamps: true
  }
);

const Application = mongoose.model("Application", applicationSchema);
export default Application;
