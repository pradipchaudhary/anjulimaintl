"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { Edit, Trash2, Plus, Eye, X } from "lucide-react";

interface ICompany {
    _id: string;
    ltNo: string;
    companyName: string;
    qty: number;
    visaStamped: number;
    remaining: number;
    visaNumber?: string;
    sponsorId?: string;
    status: "pending" | "active" | "finished";
    document: "curror" | "pending" | "received";
    remark?: string;
    createdAt: string;
    updatedAt: string;
}

export default function CompaniesPage() {
    const [records, setRecords] = useState<ICompany[]>([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [selectedRecord, setSelectedRecord] = useState<ICompany | null>(null);

    // Fetch all companies
    const fetchRecords = async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/companies");
            if (!res.ok) throw new Error("Failed to fetch records");
            const data: ICompany[] = await res.json();
            setRecords(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Delete a company
    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this record?")) return;
        try {
            const res = await fetch(`/api/company/${id}`, { method: "DELETE" });
            if (!res.ok) throw new Error("Failed to delete record");
            setRecords((prev) => prev.filter((r) => r._id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    // Truncate long text
    const truncateText = (text: string, wordLimit = 10) => {
        const words = text.split(" ");
        if (words.length <= wordLimit) return text;
        return words.slice(0, wordLimit).join(" ") + " ...";
    };

    // Filtered companies by search
    const filteredRecords = useMemo(() => {
        return records.filter(
            (r) =>
                r.ltNo.toLowerCase().includes(search.toLowerCase()) ||
                r.companyName.toLowerCase().includes(search.toLowerCase()) ||
                r.status.toLowerCase().includes(search.toLowerCase()) ||
                r.document.toLowerCase().includes(search.toLowerCase()) ||
                r.remark?.toLowerCase().includes(search.toLowerCase())
        );
    }, [search, records]);

    useEffect(() => {
        fetchRecords();
    }, []);

    return (
        <div className="max-w-full mx-auto p-4 flex flex-col h-[calc(100vh-100px)]">
            {/* ===== Header Section ===== */}
            <div className="flex-shrink-0 space-y-4 pb-3">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                    <h1 className="text-2xl font-bold text-gray-800">Companies</h1>
                    <div className="flex gap-2">
                        <Link
                            href="/companies/new"
                            className="flex items-center gap-2 bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-700 transition text-sm"
                        >
                            <Plus size={16} /> Add New
                        </Link>
                    </div>
                </div>

                {/* Summary */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="bg-white shadow-sm rounded-lg p-3 flex flex-col">
                        <span className="text-gray-500 text-xs">Total Companies</span>
                        <span className="text-lg font-semibold text-gray-800">{records.length}</span>
                    </div>
                </div>

                {/* Search */}
                <div className="flex justify-end">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search by LT No, Company, Status, Document..."
                        className="w-full sm:w-64 border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:border-blue-600 transition shadow-sm"
                    />
                </div>
            </div>

            {/* ===== Scrollable Table ===== */}
            <div className="flex-1 overflow-auto shadow-md rounded-lg border border-gray-200">
                <div className="min-w-full overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50 sticky top-0 z-10">
                            <tr>
                                {["SN", "LT No", "Company Name", "Qty", "Stamped", "Remaining", "Status", "Document", "Remark", "Actions"].map(
                                    (head) => (
                                        <th
                                            key={head}
                                            className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            {head}
                                        </th>
                                    )
                                )}
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100">
                            {loading ? (
                                Array.from({ length: 5 }).map((_, i) => (
                                    <tr key={i}>
                                        <td colSpan={10} className="p-6 text-center text-gray-400 animate-pulse">
                                            Loading...
                                        </td>
                                    </tr>
                                ))
                            ) : filteredRecords.length > 0 ? (
                                filteredRecords.map((r, i) => (
                                    <tr key={r._id} className={`hover:bg-gray-50 ${i % 2 === 0 ? "bg-gray-50" : ""}`}>
                                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{i + 1}</td>
                                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{r.ltNo}</td>
                                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{r.companyName}</td>
                                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{r.qty}</td>
                                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{r.visaStamped}</td>
                                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{r.remaining}</td>
                                        <td
                                            className={`px-4 py-2 whitespace-nowrap font-semibold ${r.status === "active"
                                                ? "text-green-600"
                                                : r.status === "pending"
                                                    ? "text-yellow-600"
                                                    : "text-red-600"
                                                }`}
                                        >
                                            {r.status}
                                        </td>
                                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{r.document}</td>
                                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{truncateText(r.remark || "-")}</td>
                                        <td className="px-4 py-2 whitespace-nowrap flex items-center gap-2">
                                            <button
                                                onClick={() => setSelectedRecord(r)}
                                                className="text-gray-600 hover:text-gray-800"
                                                aria-label="View Details"
                                            >
                                                <Eye size={18} />
                                            </button>
                                            <Link
                                                href={`/companies/${r._id}`}
                                                className="text-blue-600 hover:text-blue-800"
                                                aria-label="Edit"
                                            >
                                                <Edit size={16} />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(r._id)}
                                                className="text-red-600 hover:text-red-800"
                                                aria-label="Delete"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={10} className="text-center p-6 text-gray-400">
                                        No records found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* ===== Modal ===== */}
            {selectedRecord && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
                        <button
                            onClick={() => setSelectedRecord(null)}
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                        >
                            <X size={20} />
                        </button>
                        <h2 className="text-lg font-semibold mb-4">Company Details</h2>
                        <div className="space-y-2 text-sm">
                            <p>
                                <span className="font-medium">LT No:</span> {selectedRecord.ltNo}
                            </p>
                            <p>
                                <span className="font-medium">Company Name:</span> {selectedRecord.companyName}
                            </p>
                            <p>
                                <span className="font-medium">Qty:</span> {selectedRecord.qty}
                            </p>
                            <p>
                                <span className="font-medium">Visa Stamped:</span> {selectedRecord.visaStamped}
                            </p>
                            <p>
                                <span className="font-medium">Remaining:</span> {selectedRecord.remaining}
                            </p>
                            <p>
                                <span className="font-medium">Status:</span> {selectedRecord.status}
                            </p>
                            <p>
                                <span className="font-medium">Document:</span> {selectedRecord.document}
                            </p>
                            <p>
                                <span className="font-medium">Remark:</span> {selectedRecord.remark || "-"}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
