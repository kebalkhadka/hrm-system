import mongoose from "mongoose";

const salarySchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true },
    amount: { type: Number, required: true },
    tax: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Salary = mongoose.models.Salary || mongoose.model("Salary", salarySchema);
export default Salary;
