import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Medical from "@/models/Medical";

export async function PUT(req: NextRequest, context: { params: { id: string } }) {
    try {
        await connectDB();
        const body = await req.json();

        const updated = await Medical.findByIdAndUpdate(context.params.id, body, { new: true });
        if (!updated) {
            return NextResponse.json({ error: "Record not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Updated successfully", record: updated });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Something went wrong";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, context: { params: { id: string } }) {
    try {
        await connectDB();
        const deleted = await Medical.findByIdAndDelete(context.params.id);

        if (!deleted) {
            return NextResponse.json({ error: "Record not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Deleted successfully" });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Something went wrong";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
