import { NextRequest, NextResponse } from "next/server";
import Candidate from "@/models/Candidate";
import { connectToDatabase } from "@/lib/db";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connectToDatabase();
        const candidate = await Candidate.findById(params.id);
        if (!candidate) return NextResponse.json({ error: "Candidate not found" }, { status: 404 });
        return NextResponse.json(candidate);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch candidate" }, { status: 500 });
    }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connectToDatabase();
        const data = await req.json();
        const updatedCandidate = await Candidate.findByIdAndUpdate(params.id, data, { new: true });
        if (!updatedCandidate) return NextResponse.json({ error: "Candidate not found" }, { status: 404 });
        return NextResponse.json(updatedCandidate);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update candidate" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connectToDatabase();
        const deletedCandidate = await Candidate.findByIdAndDelete(params.id);
        if (!deletedCandidate) return NextResponse.json({ error: "Candidate not found" }, { status: 404 });
        return NextResponse.json({ message: "Candidate deleted successfully" });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete candidate" }, { status: 500 });
    }
}
