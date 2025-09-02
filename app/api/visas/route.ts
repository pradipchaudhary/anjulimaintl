import { NextRequest, NextResponse } from "next/server";
import Visa from "@/models/Visa";
import { connectDB } from "@/lib/db";

// ✅ POST /api/visa
export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const body: {
            ltNo?: string;
            companyName?: string;
            qty?: number;
            visaStamped?: number;
            remaining?: number;
            visaNumber?: string;
            sponsorId?: string;
            fileExpireDate?: string;
            excelFilePath?: string;
            isActive?: boolean;
        } = await req.json();

        // Basic validation
        if (!body.ltNo || !body.companyName || body.qty === undefined) {
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
    } catch (error: unknown) {
        const message =
            error instanceof Error ? error.message : "Something went wrong";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}

// ✅ GET /api/visa
export async function GET() {
    try {
        await connectDB();
        const visas = await Visa.find().sort({ createdAt: -1 });
        return NextResponse.json(visas);
    } catch (error: unknown) {
        const message =
            error instanceof Error ? error.message : "Failed to fetch visas";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
