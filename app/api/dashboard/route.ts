import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Visa from "@/models/Visa";
import Candidate from "@/models/Candidate.model";
import { Company } from "@/models/Company.model";

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
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Something went wrong";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
