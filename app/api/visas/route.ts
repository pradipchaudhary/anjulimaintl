import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Visa from "@/models/Visa";

// GET all visas
export async function GET() {
    try {
        await connectDB();
        const visas = await Visa.find().sort({ createdAt: -1 });
        return NextResponse.json(visas);
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Something went wrong";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}

// POST create a new visa
export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const body = await req.json();
        const { ltNo, companyName, qty, visaStamped, status, visaNumber, sponsorId, fileExpireDate, remark } = body;

        // Basic validation
        if (!ltNo || !companyName || qty == null || visaStamped == null || !status) {
            return NextResponse.json({ error: "ltNo, companyName, qty, visaStamped, and status are required" }, { status: 400 });
        }

        // Create new visa
        const visa = new Visa({
            ltNo,
            companyName,
            qty,
            visaStamped,
            status,          // ✅ manually set from API
            visaNumber,
            sponsorId,
            fileExpireDate,
            remark,
        });

        const newVisa = await visa.save(); // remaining will auto-calc via schema middleware

        return NextResponse.json(
            { message: "Visa record created successfully", record: newVisa },
            { status: 201 }
        );
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Internal Server Error";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
