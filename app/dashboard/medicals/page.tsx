"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { Edit, Trash2, Plus, Upload, Eye, X } from "lucide-react";

interface IMedical {
    _id: string;
    sn: number;
    name: string;
    email: string;
    address: string;
    phone: string;
}

export default function MedicalList() {
    const [records, setRecords] = useState<IMedical[]>([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [selectedRecord, setSelectedRecord] = useState<IMedical | null>(null);

    const fetchRecords = async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/medicals");
            if (!res.ok) throw new Error("Failed to fetch records");
            const data: IMedical[] = await res.json();
            setRecords(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this record?")) return;
        try {
            const res = await fetch(`/api/medicals/${id}`, { method: "DELETE" });
            if (!res.ok) throw new Error("Failed to delete record");
            setRecords((prev) => prev.filter((r) => r._id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    // ✅ Truncate Address
    const truncateAddress = (address: string, wordLimit = 10) => {
        const words = address.split(" ");
        if (words.length <= wordLimit) return address;
        return words.slice(0, wordLimit).join(" ") + " ...";
    };

    const filteredRecords = useMemo(() => {
        return records.filter(
            (r) =>
                r.name.toLowerCase().includes(search.toLowerCase()) ||
                r.email.toLowerCase().includes(search.toLowerCase()) ||
                r.address.toLowerCase().includes(search.toLowerCase()) ||
                r.phone.includes(search)
        );
    }, [search, records]);

    useEffect(() => {
        fetchRecords();
    }, []);

    // ✅ Escape key handler
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") setSelectedRecord(null);
        };
        document.addEventListener("keydown", handleEsc);
        return () => document.removeEventListener("keydown", handleEsc);
    }, []);

    return (
        <div className="max-w-full mx-auto p-4 flex flex-col h-[calc(100vh-100px)]">
            {/* ===== Header ===== */}
            <div className="flex-shrink-0 space-y-4 pb-3">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                    <h1 className="text-2xl font-bold text-gray-800">Medical Records</h1>
                    <div className="flex gap-2">
                        <Link
                            href="/dashboard/medicals/new"
                            className="flex items-center gap-2 bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-700 transition text-sm"
                        >
                            <Plus size={16} /> Add New
                        </Link>
                        <Link
                            href="/dashboard/medicals/import"
                            className="flex items-center gap-2 border border-blue-600 text-blue-600 px-3 py-1.5 rounded hover:bg-blue-600 hover:text-white transition text-sm"
                        >
                            <Upload size={16} /> Import All
                        </Link>
                    </div>
                </div>

                {/* Summary */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="bg-white shadow-sm rounded-lg p-3 flex flex-col">
                        <span className="text-gray-500 text-xs">Total Records</span>
                        <span className="text-lg font-semibold text-gray-800">
                            {records.length}
                        </span>
                    </div>
                </div>

                {/* Search */}
                <div className="flex justify-end">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search by Name, Email, Address, Phone..."
                        className="w-full sm:w-64 border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:border-blue-600 transition shadow-sm"
                    />
                </div>
            </div>

            {/* ===== Table ===== */}
            <div className="flex-1 overflow-auto shadow-md rounded-lg border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50 sticky top-0 z-10">
                        <tr>
                            {["SN", "Name", "Email", "Address", "Phone", "Actions"].map(
                                (head) => (
                                    <th
                                        key={head}
                                        className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50"
                                    >
                                        {head}
                                    </th>
                                )
                            )}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                        {loading ? (
                            <tr >
                                <td
                                    colSpan={6}
                                    className="p-6 text-center text-gray-400 animate-pulse"
                                >
                                    Loading...
                                </td>
                            </tr>
                        ) : filteredRecords.length > 0 ? (
                            filteredRecords.map((r, i) => (
                                <tr
                                    key={r._id}
                                    className={`hover:bg-gray-50 ${i % 2 === 0 ? "bg-gray-50" : ""
                                        }`}
                                >
                                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">
                                        {i + 1}
                                    </td>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">
                                        {r.name}
                                    </td>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">
                                        {r.email}
                                    </td>
                                    <td className="px-4 py-2 text-sm text-gray-700 max-w-xs truncate">
                                        {truncateAddress(r.address)}
                                    </td>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">
                                        {r.phone}
                                    </td>
                                    <td className="px-4 py-2 whitespace-nowrap flex items-center gap-3">
                                        <button
                                            onClick={() => setSelectedRecord(r)}
                                            className="text-gray-600 hover:text-blue-600 cursor-pointer transition"
                                            aria-label="View Details"
                                        >
                                            <Eye size={18} />
                                        </button>
                                        <Link
                                            href={`/dashboard/medicals/${r._id}`}
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
                                <td colSpan={7} className="text-center p-6 text-gray-400">
                                    No records found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* ===== Modal ===== */}
            {selectedRecord && (
                <div
                    className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-md z-50"
                    role="dialog"
                    aria-modal="true"
                    onClick={() => setSelectedRecord(null)}
                >
                    <div
                        className="bg-white/95 rounded-2xl shadow-2xl p-6 w-full max-w-lg relative 
                 transform transition-all duration-300 ease-out animate-[fadeIn_0.3s_ease-out]
                 border border-gray-100"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setSelectedRecord(null)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 
                   focus:outline-none transition"
                            aria-label="Close"
                        >
                            <X size={22} />
                        </button>

                        {/* Header */}
                        <div className="flex items-center gap-2 mb-5">
                            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-50 text-blue-600">
                                <Eye size={20} />
                            </div>
                            <h2 className="text-xl font-semibold text-gray-800">Medical Details</h2>
                        </div>

                        {/* Content */}
                        <div className="space-y-4 text-sm text-gray-700">
                            <div className="flex items-start">
                                <span className="w-24 font-medium text-gray-600">Name:</span>
                                <span>{selectedRecord.name}</span>
                            </div>
                            <div className="flex items-start">
                                <span className="w-24 font-medium text-gray-600">Email:</span>
                                <span>{selectedRecord.email}</span>
                            </div>
                            <div className="flex items-start">
                                <span className="w-24 font-medium text-gray-600">Address:</span>
                                <span>{selectedRecord.address}</span>
                            </div>
                            <div className="flex items-start">
                                <span className="w-24 font-medium text-gray-600">Phone:</span>
                                <span>{selectedRecord.phone}</span>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="mt-6 flex justify-end">
                            <button
                                onClick={() => setSelectedRecord(null)}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium 
                     hover:bg-blue-700 transition"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}
