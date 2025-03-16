import { NextResponse } from "next/server";
import JobApplicant from "@/models/JobApplicant";
import { connectToDatabase } from "@/lib/db";

// ✅ GET ALL JOB APPLICANTS
export async function GET() {
  try {
    await connectToDatabase();
    const applicants = await JobApplicant.find();
    return NextResponse.json({ success: true, data: applicants }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Failed to fetch applicants" }, { status: 500 });
  }
}

// ✅ CREATE NEW JOB APPLICANT
export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();

    // Check if passport number is provided and not null
    if (!body.passportNumber || body.passportNumber.trim() === '') {
      return NextResponse.json({ success: false, error: "Passport number is required." }, { status: 400 });
    }

    // Check if the passport number already exists
    const existingApplicant = await JobApplicant.findOne({ passportNumber: body.passportNumber });
    if (existingApplicant) {
      return NextResponse.json({ success: false, error: "Applicant with this passport number already exists." }, { status: 400 });
    }

    const newApplicant = new JobApplicant(body);
    await newApplicant.save();

    return NextResponse.json({ success: true, data: newApplicant }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Failed to create applicant" }, { status: 500 });
  }
}
