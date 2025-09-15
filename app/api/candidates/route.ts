import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Candidate from "@/models/Candidate";

// ===============================
// GET all candidates
// ===============================
export async function GET() {
    try {
        await connectDB();
        const candidates = await Candidate.find()
            // .populate("company") // ✅ populate company reference
            .sort({ createdAt: -1 });

        return NextResponse.json(candidates);
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Something went wrong";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}

// ===============================
// POST create a new candidate
// ===============================
export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const body = await req.json();

        const {
            firstName,
            lastName,
            dateOfBirth,
            gender,
            address,
            contactNumber,
            passportNumber,
            positionApplied,
        } = body;

        // ✅ Required field validation
        if (
            !firstName ||
            !lastName ||
            !dateOfBirth ||
            !gender ||
            !address ||
            !contactNumber ||
            !passportNumber ||
            !positionApplied
        ) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        const candidate = new Candidate(body);
        const newCandidate = await candidate.save();

        return NextResponse.json(
            { message: "Candidate created successfully", record: newCandidate },
            { status: 201 }
        );
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Internal Server Error";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
