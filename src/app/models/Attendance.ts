import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date },
    ipAddress: { type: String },
    imageUrl: { type: String }, // Google Drive image link
    driveFileId: { type: String }, // Google Drive file ID
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Attendance = mongoose.models.Attendance || mongoose.model("Attendance", attendanceSchema);
export default Attendance;
