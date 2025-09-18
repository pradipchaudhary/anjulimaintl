import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Company } from "@/models/company.model";

// ✅ GET all companies
export async function GET() {
    try {
        await connectDB();
        const companies = await Company.find().sort({ createdAt: -1 });
        return NextResponse.json(companies, { status: 200 });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Something went wrong";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}

// ✅ POST create a new company
export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const body = await req.json();
        const { ltNo, companyName, qty, visaStamped = 0, status, visaNumber, sponsorId, document, remark } = body;

        // Basic validation
        if (!ltNo || !companyName || qty == null || status == null) {
            return NextResponse.json(
                { error: "ltNo, companyName, qty, and status are required" },
                { status: 400 }
            );
        }

        // Calculate remaining automatically
        const remaining = qty - visaStamped;

        // Create new company
        const company = new Company({
            ltNo,
            companyName,
            qty,
            visaStamped,
            remaining,     // ✅ auto-calc
            visaNumber,
            sponsorId,
            status,
            document,
            remark,
        });

        const newCompany = await company.save();

        return NextResponse.json(
            { message: "Company record created successfully", record: newCompany },
            { status: 201 }
        );
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Internal Server Error";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
