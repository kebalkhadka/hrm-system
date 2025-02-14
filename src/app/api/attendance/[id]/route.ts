import { NextApiRequest } from "next";
import mongoose from "mongoose";
import Attendance from "@/app/models/Attendance";
import connectDB from "@/app/lib/mongodb";
import { NextResponse } from "next/server"; // Import NextResponse


export async function GET(req: NextApiRequest, { params }: { params: { id: string } }) {
  // Wait for params to resolve
  const { id } = await params;

  if (!id) {
    
    return NextResponse.json({ message: "Employee ID is required" }, { status: 400 });
  }

  await connectDB(); // Make sure MongoDB is connected before querying
  
  try {
    // Fetch attendance data for the employee
    const attendance = await Attendance.find({ userId: id }).sort({ createdAt: -1 });
    
    
    return NextResponse.json(attendance);
  } catch (error) {
    console.error("Error fetching attendance:", error);
  
    return NextResponse.json({ message: "Error fetching attendance data" }, { status: 500 });
  }
}
