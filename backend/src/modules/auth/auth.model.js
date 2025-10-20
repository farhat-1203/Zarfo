import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["hotel", "user", "robin", "worker", "admin"],
      default: "user",
    },
    address: {
      houseNo: { type: String },
      suburb: { type: String },
      city: { type: String },
      state: { type: String },
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
