import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Visa from "@/models/Visa";
import Candidate from "@/models/Candidate";
import Company from "@/models/Company";

export async function GET() {
    try {
        await connectDB();

        const [
            activeCandidates,
            pendingCandidates,
            medicalPassed,
            totalVisas,
            activeVisas,
            companies,
        ] = await Promise.all([
            Candidate.countDocuments({ status: "active" }),
            Candidate.countDocuments({ status: "pending" }),
            Candidate.countDocuments({ medicalStatus: "passed" }),
            Visa.countDocuments(),
            Visa.countDocuments({ status: "active" }),
            Company.countDocuments(),
        ]);

        return NextResponse.json({
            activeCandidates,
            pendingCandidates,
            medicalPassed,
            totalVisas,
            activeVisas,
            companies,
        });
    } catch (err: any) {
        console.error("Dashboard API Error:", err);
        return NextResponse.json({ error: "Failed to fetch dashboard data" }, { status: 500 });
    }
}
