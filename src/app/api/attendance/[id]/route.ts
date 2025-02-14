import { NextRequest, NextResponse } from "next/server";
import Attendance from "@/app/models/Attendance";
import connectDB from "@/app/lib/mongodb";

// Ensure MongoDB is connected before handling requests
connectDB();

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params; // ✅ Correctly accessing params

    if (!id) {
      return NextResponse.json({ message: "Employee ID is required" }, { status: 400 });
    }

    // ✅ Fetch attendance records for the given user ID
    const attendance = await Attendance.find({ userId: id }).sort({ createdAt: -1 });

    if (!attendance.length) {
      return NextResponse.json({ message: "No attendance records found" }, { status: 404 });
    }

    return NextResponse.json(attendance, { status: 200 });

  } catch (error) {
    console.error("Error fetching attendance:", error);
    return NextResponse.json({ message: "Error fetching attendance data" }, { status: 500 });
  }
}
