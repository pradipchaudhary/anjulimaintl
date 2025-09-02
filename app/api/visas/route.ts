import { NextRequest, NextResponse } from "next/server";
import Visa from "@/models/Visa";
import { connectDB } from "@/lib/db";

// ✅ POST /api/visa
export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const body = await req.json();
        console.log("object", body);
        // Basic validation
        if (!body.ltNo || !body.companyName || !body.qty) {
            return NextResponse.json(
                { error: "ltNo, companyName, and qty are required" },
                { status: 400 }
            );
        }

        const newVisa = await Visa.create(body);

        return NextResponse.json(
            { message: "Visa created successfully", visa: newVisa },
            { status: 201 }
        );
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || "Something went wrong" },
            { status: 500 }
        );
    }
}


export async function GET() {
    try {
        await connectDB();
        const visas = await Visa.find().sort({ createdAt: -1 });
        return NextResponse.json(visas);
    } catch (err) {
        return NextResponse.json({ error: "Failed to fetch visas" }, { status: 500 });
    }
}