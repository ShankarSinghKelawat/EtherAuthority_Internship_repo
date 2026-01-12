const mongoose = require("mongoose");

const internSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    internId: {
      type: Number,
      required: true,
      unique: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    wallet: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: /^0x[a-fA-F0-9]{40}$/
    },

    highestEducation: {
      type: String,
      default: ""
    },

    // 🔑 FIXED ENUM (matches frontend exactly)
    background: {
      type: String,
      enum: ["student", "fresher", "working professional"],
      required: true
    },

    registrationDetails: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Intern", internSchema);
