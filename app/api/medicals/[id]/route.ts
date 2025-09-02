import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Medical from "@/models/Medical";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connectDB();
        const body = await req.json();
        console.log("object", body);
        const updated = await Medical.findByIdAndUpdate(params.id, body, { new: true });
        if (!updated) return NextResponse.json({ error: "Record not found" }, { status: 404 });
        return NextResponse.json({ message: "Updated successfully", record: updated });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connectDB();
        const deleted = await Medical.findByIdAndDelete(params.id);
        if (!deleted) return NextResponse.json({ error: "Record not found" }, { status: 404 });
        return NextResponse.json({ message: "Deleted successfully" });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
