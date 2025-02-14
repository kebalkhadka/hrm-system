import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "manager" | "hr" | "employee"; // Enum for role validation
}

// Define schema only once
const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["manager", "hr", "employee"], required: true },
});

// Check if the model already exists before defining it
const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
