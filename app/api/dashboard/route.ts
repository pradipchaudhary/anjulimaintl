import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Company } from "@/models/company.model";
import { Candidate } from "@/models/candidate.model";

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
            Company.countDocuments(),
            Company.countDocuments({ status: "active" }),
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
