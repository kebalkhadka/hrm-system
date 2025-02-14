import mongoose from "mongoose";

const leaveRequestSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    type: { type: String, enum: ['SICK', 'UNPAID', 'VACATION'], default: 'SICK' },
    subject: { type: String },
    body: { type: String },
    status: { type: String, enum: ['REVIEW', 'APPROVED', 'DECLINED'], default: 'REVIEW' },
    startDate: { type: Date },
    endDate: { type: Date },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const LeaveRequest = mongoose.models.LeaveRequest || mongoose.model("LeaveRequest", leaveRequestSchema);
export default LeaveRequest;
