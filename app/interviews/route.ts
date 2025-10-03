import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Interview from "@/models/Interview";

export async function GET() {
    try {
        await connectDB();
        const interviews = await Interview.find()
            .populate("candidate", "firstName lastName email")
            .populate("company", "companyName");
        return NextResponse.json(interviews);
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Something went wrong";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const body = await req.json();
        const { candidate, company, interviewDate, interviewer, status, remarks } = body;

        if (!candidate || !company || !interviewDate || !location) {
            return NextResponse.json({ error: "Required fields missing" }, { status: 400 });
        }

        const newInterview = await Interview.create({
            candidate,
            company,
            interviewDate,
            interviewer,
            status,
            remarks,
        });

        return NextResponse.json(
            { message: "Interview created successfully", record: newInterview },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error creating interview:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
