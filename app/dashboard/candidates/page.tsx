"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Edit, Trash2, Loader2 } from "lucide-react";

// Match schema
interface ICandidate {
    _id: string;

    // Personal Info
    firstName: string;
    middleName?: string;
    lastName: string;
    dateOfBirth: string;
    gender: "male" | "female" | "other";
    nationality?: string;
    address: string;
    contactNumber: string;
    email?: string;

    // Passport Info
    passportNumber: string;
    passportIssueDate?: string;
    passportExpiryDate?: string;
    passportIssuedFrom?: string;

    // Job Info
    positionApplied: string;
    company?: string;
    demandLetterNo?: string;
    contractPeriod?: number;

    // Process Tracking
    status:
    | "registered"
    | "medical"
    | "visaProcessing"
    | "training"
    | "deployed"
    | "finished";

    // Medical
    medicalStatus: "pending" | "passed" | "failed";
    medicalCenter?: string;
    medicalDate?: string;

    // Visa Info
    visaNumber?: string;
    visaStatus: "pending" | "approved" | "rejected";
    mofaNumber?: string;
    ticketNumber?: string;
    departureDate?: string;

    // Reference
    referenceName?: string;
    referenceContact?: string;

    // Misc
    remark?: string;

    // Auto
    createdAt: string;
    updatedAt: string;
}

export default function CandidatePage() {
    const [records, setRecords] = useState<ICandidate[]>([]);
    const [filteredRecords, setFilteredRecords] = useState<ICandidate[]>([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Fetch candidates
    const fetchRecords = async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/candidates");
            if (!res.ok) throw new Error("Failed to fetch candidates");
            const data: ICandidate[] = await res.json();
            setRecords(data);
            setFilteredRecords(data);
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    // Delete
    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this candidate?")) return;
        try {
            const res = await fetch(`/api/candidates/${id}`, { method: "DELETE" });
            if (!res.ok) throw new Error("Failed to delete candidate");
            fetchRecords();
        } catch (err) {
            alert(err instanceof Error ? err.message : "Delete failed");
        }
    };

    // Search
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.toLowerCase();
        setSearch(value);
        const filtered = records.filter(
            (r) =>
                r.firstName.toLowerCase().includes(value) ||
                r.lastName.toLowerCase().includes(value) ||
                r.passportNumber.toLowerCase().includes(value) ||
                r.positionApplied.toLowerCase().includes(value) ||
                r.status.toLowerCase().includes(value)
        );
        setFilteredRecords(filtered);
    };

    useEffect(() => {
        fetchRecords();
    }, []);

    // Status badge
    const StatusBadge = ({ status }: { status: string }) => {
        const colors: Record<string, string> = {
            registered: "bg-gray-100 text-gray-700",
            medical: "bg-yellow-100 text-yellow-700",
            visaProcessing: "bg-blue-100 text-blue-700",
            training: "bg-purple-100 text-purple-700",
            deployed: "bg-green-100 text-green-700",
            finished: "bg-red-100 text-red-700",
        };
        return (
            <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status] || "bg-gray-100 text-gray-600"
                    }`}
            >
                {status}
            </span>
        );
    };

    return (
        <div className="max-w-full mx-auto p-4">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-2">
                <h1 className="text-2xl font-bold">Candidate Records</h1>
                <Link
                    href="/dashboard/candidates/new"
                    className="bg-primary hover:bg-primary text-white px-4 py-2 rounded-lg shadow text-sm"
                >
                    + Add New Candidate
                </Link>
            </div>

            {/* Search */}
            <div className="mb-4">
                <input
                    type="text"
                    value={search}
                    onChange={handleSearch}
                    placeholder="Search by Name, Passport No, Position..."
                    className="border border-gray-300 rounded-md px-3 py-2 w-full sm:max-w-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Loading */}
            {loading && (
                <div className="flex justify-center py-10">
                    <Loader2 className="animate-spin text-blue-600" size={28} />
                </div>
            )}

            {/* Error */}
            {error && <p className="text-red-600 text-center py-4">⚠️ {error}</p>}

            {/* Table */}
            {!loading && !error && (
                <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200 text-xs">
                        <thead className="bg-gray-50 sticky top-0 z-10">
                            <tr>
                                {[
                                    "SN",
                                    "Name",
                                    "DOB",
                                    "Gender",
                                    "Nationality",
                                    "Address",
                                    "Contact",
                                    "Email",
                                    "Passport No",
                                    "Passport Issue Date",
                                    "Passport Expiry Date",
                                    "Passport Issued From",
                                    "Position",
                                    "Company",
                                    "Demand Letter No",
                                    "Contract Period",
                                    "Status",
                                    "Medical Status",
                                    "Medical Center",
                                    "Medical Date",
                                    "Visa Number",
                                    "Visa Status",
                                    "MOFA No",
                                    "Ticket No",
                                    "Departure Date",
                                    "Reference Name",
                                    "Reference Contact",
                                    "Remark",
                                    "Created At",
                                    "Updated At",
                                    "Actions",
                                ].map((h) => (
                                    <th
                                        key={h}
                                        className="px-4 py-2 text-left font-medium text-gray-500 uppercase"
                                    >
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100">
                            {filteredRecords.length ? (
                                filteredRecords.map((r, i) => (
                                    <tr key={r._id} className="hover:bg-gray-50">
                                        <td className="px-4 py-2">{i + 1}</td>
                                        <td className="px-4 py-2">
                                            {r.firstName} {r.middleName ?? ""} {r.lastName}
                                        </td>
                                        <td className="px-4 py-2">{r.dateOfBirth}</td>
                                        <td className="px-4 py-2">{r.gender}</td>
                                        <td className="px-4 py-2">{r.nationality}</td>
                                        <td className="px-4 py-2">{r.address}</td>
                                        <td className="px-4 py-2">{r.contactNumber}</td>
                                        <td className="px-4 py-2">{r.email}</td>
                                        <td className="px-4 py-2">{r.passportNumber}</td>
                                        <td className="px-4 py-2">{r.passportIssueDate}</td>
                                        <td className="px-4 py-2">{r.passportExpiryDate}</td>
                                        <td className="px-4 py-2">{r.passportIssuedFrom}</td>
                                        <td className="px-4 py-2">{r.positionApplied}</td>
                                        <td className="px-4 py-2">{r.company}</td>
                                        <td className="px-4 py-2">{r.demandLetterNo}</td>
                                        <td className="px-4 py-2">{r.contractPeriod}</td>
                                        <td className="px-4 py-2">
                                            <StatusBadge status={r.status} />
                                        </td>
                                        <td className="px-4 py-2">{r.medicalStatus}</td>
                                        <td className="px-4 py-2">{r.medicalCenter}</td>
                                        <td className="px-4 py-2">{r.medicalDate}</td>
                                        <td className="px-4 py-2">{r.visaNumber}</td>
                                        <td className="px-4 py-2">{r.visaStatus}</td>
                                        <td className="px-4 py-2">{r.mofaNumber}</td>
                                        <td className="px-4 py-2">{r.ticketNumber}</td>
                                        <td className="px-4 py-2">{r.departureDate}</td>
                                        <td className="px-4 py-2">{r.referenceName}</td>
                                        <td className="px-4 py-2">{r.referenceContact}</td>
                                        <td className="px-4 py-2">{r.remark}</td>
                                        <td className="px-4 py-2">{r.createdAt}</td>
                                        <td className="px-4 py-2">{r.updatedAt}</td>
                                        <td className="px-4 py-2 flex space-x-2">
                                            <Link
                                                href={`/dashboard/candidates/${r._id}`}
                                                className="text-blue-600 hover:text-blue-800"
                                                title="Edit"
                                            >
                                                <Edit size={16} />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(r._id)}
                                                className="text-red-600 hover:text-red-800"
                                                title="Delete"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={30} className="text-center p-6 text-gray-500">
                                        No candidate records found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
