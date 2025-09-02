import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Medical from "@/models/Medical";

export async function GET() {
    try {
        await connectDB();
        const records = await Medical.find().sort({ sn: 1 });
        return NextResponse.json(records);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const body = await req.json();
        console.log("object", body);

        if (!body.sn || !body.name || !body.email || !body.address || !body.phone) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        const newRecord = await Medical.create(body);
        return NextResponse.json({ message: "Medical record created", record: newRecord }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
