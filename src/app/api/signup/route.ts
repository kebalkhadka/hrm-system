import connectDB from "@/app/lib/mongodb";
import User from "@/app/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  await connectDB();

  try {
    const { name, email, password, role } = await request.json();

    if (!name || !email || !password || !role) {
      return new NextResponse(JSON.stringify({ error: "All fields are required" }), { status: 400 });
    }

    if (!["manager", "hr", "employee"].includes(role)) {
      return new NextResponse(JSON.stringify({ error: "Invalid role" }), { status: 400 });
    }

    // Hash the password before storing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({ name, email, password: hashedPassword, role });
    await user.save();

    return new NextResponse(JSON.stringify({ message: "User successfully created" }), { status: 201 });
  } catch (error) {
    console.error(" Signup error:", error);
    return new NextResponse(JSON.stringify({ error: "Server Error" }), { status: 500 });
  }
}
