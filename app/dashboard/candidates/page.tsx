"use client";

import { useEffect, useState } from "react";

interface Candidate {
    _id: string;
    serialNumber: number;
    name: string;
    passportNo: string;
    dateOfBirth: string;
    age: number;
    address: string;
    position: string;
    reference: string;
    profile: string;
    medicalDate: string;
    mofaNo: string;
    medicalStatus: string;
    medicalReport: string;
    policeReport: string;
    biometric: string;
    contactNo: string;
    remarks?: string;
    chhanotEndDate?: string;
    departureDate?: string;
}

export default function CandidatesPage() {
    const [candidates, setCandidates] = useState<Candidate[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch("/api/candidates")
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch candidates");
                return res.json();
            })
            .then((data) => setCandidates(data))
            .catch(() => setError("Could not load candidates."))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p className="text-center mt-10">Loading...</p>;
    if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;

    return (
        <div className="">
            <h1 className="text-3xl font-bold mb-6">Candidates</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 border">S.N.</th>
                            <th className="px-4 py-2 border">Name</th>
                            <th className="px-4 py-2 border">Passport No.</th>
                            <th className="px-4 py-2 border">DOB</th>
                            <th className="px-4 py-2 border">Age</th>
                            <th className="px-4 py-2 border">Position</th>
                            <th className="px-4 py-2 border">Contact</th>
                            <th className="px-4 py-2 border">Remarks</th>
                        </tr>
                    </thead>
                    <tbody>
                        {candidates.length === 0 ? (
                            <tr>
                                <td colSpan={8} className="text-center py-6 text-gray-500">
                                    No candidates found.
                                </td>
                            </tr>
                        ) : (
                            candidates.map((candidate) => (
                                <tr key={candidate._id} className="hover:bg-gray-50">
                                    <td className="px-4 py-2 border">{candidate.serialNumber}</td>
                                    <td className="px-4 py-2 border">{candidate.name}</td>
                                    <td className="px-4 py-2 border">{candidate.passportNo}</td>
                                    <td className="px-4 py-2 border">
                                        {candidate.dateOfBirth
                                            ? new Date(candidate.dateOfBirth).toLocaleDateString()
                                            : "-"}
                                    </td>
                                    <td className="px-4 py-2 border">{candidate.age}</td>
                                    <td className="px-4 py-2 border">{candidate.position}</td>
                                    <td className="px-4 py-2 border">{candidate.contactNo}</td>
                                    <td className="px-4 py-2 border">{candidate.remarks || "-"}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}