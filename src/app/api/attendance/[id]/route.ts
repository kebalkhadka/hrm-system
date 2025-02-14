import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import Attendance from "@/app/models/Attendance";
import connectDB from "@/app/lib/mongodb";

// Handle the GET request to fetch employee attendance data
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query; // Employee ID from the URL
  
  if (!id) {
    return res.status(400).json({ message: "Employee ID is required" });
  }

  await connectDB(); // Make sure MongoDB is connected before querying
  
  if (req.method === "GET") {
    try {
      // Fetch attendance for the employee
      const attendance = await Attendance.find({ userId: id }).sort({ createdAt: -1 });
      return res.status(200).json(attendance); // Return the attendance data as JSON
    } catch (error) {
      console.error("Error fetching attendance:", error);
      return res.status(500).json({ message: "Error fetching attendance data" });
    }
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
