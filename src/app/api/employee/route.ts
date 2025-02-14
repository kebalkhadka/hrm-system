import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import User from "@/app/models/User";


// Connect to MongoDB (Avoid multiple connections)
const connectDB = async () => {
  if (mongoose.connection.readyState === 1) return;
  await mongoose.connect(process.env.MONGODB_URI as string, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as any);
};

export async function GET(req: NextRequest) {
  try {
    await connectDB(); // Ensure DB is connected

    // Fetch only employees (excluding HR & Manager)
    const employees = await User.find({ role: "employee" }).select("name email department");

    return NextResponse.json(employees, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching employees" }, { status: 500 });
  }
}
