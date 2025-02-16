import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import JobSeeker from "@/models/JobSeeker";

export async function GET() {
    await connectDB();
    const jobSeekers = await JobSeeker.find({});
    return NextResponse.json(jobSeekers, { status: 200 });
}

export async function POST(req: Request) {
    await connectDB();
    const body = await req.json();
    const newJobSeeker = new JobSeeker(body);
    await newJobSeeker.save();
    return NextResponse.json({ message: "Job Seeker Created" }, { status: 201 });
}
