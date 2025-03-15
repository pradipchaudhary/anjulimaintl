import { NextResponse } from "next/server";
import mongoose from "mongoose";
import JobApplicant from "@/models/JobApplicant";
import { connectToDatabase } from "@/lib/db";

// Connect to Database


// ✅ GET ALL JOB APPLICANTS
export async function GET() {
  try {
    await connectToDatabase()
    const applicants = await JobApplicant.find();
    return NextResponse.json({ success: true, data: applicants }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch applicants" }, { status: 500 });
  }
}

// ✅ CREATE NEW JOB APPLICANT
export async function POST(req: Request) {
  try {
    await connectToDatabase()
    const body = await req.json();
    const newApplicant = new JobApplicant(body);
    await newApplicant.save();
    return NextResponse.json({ success: true, data: newApplicant }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to create applicant" }, { status: 400 });
  }
}
