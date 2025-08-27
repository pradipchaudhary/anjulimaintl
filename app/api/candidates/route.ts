import { NextRequest, NextResponse } from "next/server";
import Candidate from "@/models/Candidate";
import { connectToDatabase } from "@/lib/db";

// GET all candidates
export async function GET() {
    try {
        await connectToDatabase();
        const candidates = await Candidate.find().sort({ serialNumber: 1 });
        return NextResponse.json(candidates);
    } catch {
        // no unused variable
        return NextResponse.json({ error: "Failed to fetch candidates" }, { status: 500 });
    }
}

// POST new candidate
export async function POST(req: NextRequest) {
    try {
        await connectToDatabase();
        const data = await req.json();
        const newCandidate = await Candidate.create(data);
        return NextResponse.json(newCandidate, { status: 201 });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }
        return NextResponse.json({ error: "Unknown error occurred" }, { status: 400 });
    }
}
