import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Medical, { IMedical } from "@/models/Medical";

// Define a proper context type for dynamic routes
interface RouteContext {
    params: {
        id: string;
    };
}

// GET medical by ID
export async function GET(req: NextRequest, context: { params: { id: string } } | any) {
    try {
        await connectDB();

        const { id } = context.params as { id: string };

        const record: IMedical | null = await Medical.findById(id);

        if (!record) {
            return NextResponse.json({ error: "Record not found" }, { status: 404 });
        }

        return NextResponse.json(record, { status: 200 });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Something went wrong";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}


// UPDATE medical by ID
export async function PUT(req: NextRequest, context: RouteContext) {
    try {
        await connectDB();
        const { id } = context.params;
        const body = await req.json();

        const updated = await Medical.findByIdAndUpdate(id, body, { new: true });

        if (!updated) {
            return NextResponse.json({ error: "Record not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Updated successfully", record: updated });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Something went wrong";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}

// DELETE medical by ID
export async function DELETE(req: NextRequest, context: RouteContext) {
    try {
        await connectDB();
        const { id } = context.params;

        const deleted = await Medical.findByIdAndDelete(id);

        if (!deleted) {
            return NextResponse.json({ error: "Record not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Deleted successfully" });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Something went wrong";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
