import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Candidate } from "@/models/candidate.model";


// Define a proper context type for dynamic routes
interface RouteContext {
    params: { id: string } | Promise<{ id: string }>;
}

// ===============================
// GET candidate by ID
// ===============================
export async function GET(req: NextRequest, context: RouteContext) {
    try {
        await connectDB();

        const { id } = context.params instanceof Promise ? await context.params : context.params;

        const candidate = await Candidate.findById(id).populate("company");
        if (!candidate) {
            return NextResponse.json({ error: "Candidate not found" }, { status: 404 });
        }

        return NextResponse.json(candidate);
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Something went wrong";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}

// ===============================
// PUT update candidate by ID
// ===============================
export async function PUT(req: NextRequest, context: RouteContext) {
    try {
        await connectDB();
        // const { id } = context.params;

        const { id } = context.params instanceof Promise ? await context.params : context.params;
        const body = await req.json();

        const updatedCandidate = await Candidate.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true,
        });

        if (!updatedCandidate) {
            return NextResponse.json({ error: "Candidate not found" }, { status: 404 });
        }

        return NextResponse.json(
            { message: "Candidate updated successfully", record: updatedCandidate },
            { status: 200 }
        );
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Internal Server Error";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}

// ===============================
// DELETE candidate by ID
// ===============================
export async function DELETE(req: NextRequest, context: RouteContext) {
    try {
        await connectDB();
        const { id } = context.params instanceof Promise ? await context.params : context.params;

        // const { id } = context.params;

        const deletedCandidate = await Candidate.findByIdAndDelete(id);

        if (!deletedCandidate) {
            return NextResponse.json({ error: "Candidate not found" }, { status: 404 });
        }

        return NextResponse.json(
            { message: "Candidate deleted successfully" },
            { status: 200 }
        );
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Internal Server Error";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
