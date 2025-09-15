"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Edit, Trash2, Loader2 } from "lucide-react";

interface ICandidate {
    _id: string;
    firstName: string;
    middleName?: string;
    lastName: string;
    dateOfBirth: string;
    gender: "male" | "female" | "other";
    nationality?: string;
    address: string;
    contactNumber: string;
    passportNumber: string;
    positionApplied: string;
    status: string;
    createdAt: string;
}

export default function CandidatePage() {
    const [records, setRecords] = useState<ICandidate[]>([]);
    const [filteredRecords, setFilteredRecords] = useState<ICandidate[]>([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Fetch all candidates
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

    // Delete candidate by ID
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

    // Search filter
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

    // Status Badge
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
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow text-sm"
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
            {error && (
                <p className="text-red-600 text-center py-4">⚠️ {error}</p>
            )}

            {/* Table */}
            {!loading && !error && (
                <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50 sticky top-0 z-10">
                            <tr>
                                {["SN", "Name", "Passport No", "Position", "Status", "Actions"].map(
                                    (h) => (
                                        <th
                                            key={h}
                                            className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase"
                                        >
                                            {h}
                                        </th>
                                    )
                                )}
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100">
                            {filteredRecords.length ? (
                                filteredRecords.map((r, i) => (
                                    <tr key={r._id} className="hover:bg-gray-50">
                                        <td className="px-4 py-3 text-sm">{i + 1}</td>
                                        <td className="px-4 py-3 text-sm font-medium">
                                            {r.firstName} {r.middleName ?? ""} {r.lastName}
                                        </td>
                                        <td className="px-4 py-3 text-sm">{r.passportNumber}</td>
                                        <td className="px-4 py-3 text-sm">{r.positionApplied}</td>
                                        <td className="px-4 py-3 text-sm">
                                            <StatusBadge status={r.status} />
                                        </td>
                                        <td className="px-4 py-3 flex space-x-3">
                                            <Link
                                                href={`/dashboard/candidates/${r._id}`}
                                                className="text-blue-600 hover:text-blue-800"
                                                title="Edit"
                                            >
                                                <Edit size={18} />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(r._id)}
                                                className="text-red-600 hover:text-red-800"
                                                title="Delete"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="text-center p-6 text-gray-500">
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
