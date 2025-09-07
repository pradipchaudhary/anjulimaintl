import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Visa from "@/models/Visa";

// Define a proper context type for dynamic routes
interface RouteContext {
    params: { id: string } | Promise<{ id: string }>;
}

// GET visa by ID
export async function GET(req: NextRequest, context: RouteContext) {
    try {
        await connectDB();

        // Await params if it's a Promise
        const { id } = context.params instanceof Promise ? await context.params : context.params;

        const visa = await Visa.findById(id);

        if (!visa) {
            return NextResponse.json({ error: "Visa not found" }, { status: 404 });
        }

        return NextResponse.json(visa, { status: 200 });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Something went wrong";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}

// UPDATE visa by ID
export async function PUT(req: NextRequest, context: RouteContext) {
    try {
        await connectDB();

        const { id } = context.params instanceof Promise ? await context.params : context.params;
        const body = await req.json();

        const updatedVisa = await Visa.findByIdAndUpdate(id, body, { new: true });

        if (!updatedVisa) {
            return NextResponse.json({ error: "Visa not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Updated successfully", record: updatedVisa });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Something went wrong";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}

// DELETE visa by ID
export async function DELETE(req: NextRequest, context: RouteContext) {
    try {
        await connectDB();

        const { id } = context.params instanceof Promise ? await context.params : context.params;

        const deletedVisa = await Visa.findByIdAndDelete(id);

        if (!deletedVisa) {
            return NextResponse.json({ error: "Visa not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Deleted successfully" });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Something went wrong";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
