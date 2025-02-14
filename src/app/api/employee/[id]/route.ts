import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import User from "@/app/models/User";
import connectDB from "@/app/lib/mongodb";
import { NextResponse } from "next/server"; // Import NextResponse


export async function GET(req: NextApiRequest, { params }: { params: { id: string } }) {
  
  const { id } = await params;

  if (!id) {
  
    return NextResponse.json({ message: "Employee ID is required" }, { status: 400 });
  }

  await connectDB(); 
  try {
    // Fetch employee details from the database
    const employee = await User.findById(id).select('name email department role');
    
    // Send the employee data as JSON response
    return NextResponse.json(employee);
  } catch (error) {
    console.error("Error fetching employee details:", error);
    // Send error response
    return NextResponse.json({ message: "Error fetching employee details" }, { status: 500 });
  }
}
