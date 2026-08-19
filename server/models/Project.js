const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    description: { type: String, default: "", trim: true, maxlength: 500 },
    color: { type: String, default: "#8b5cf6" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
