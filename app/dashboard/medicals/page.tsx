"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { Edit, Trash2, Plus, Upload } from "lucide-react";

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

    return (
        <div className="max-w-full mx-auto p-6 space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <h1 className="text-3xl font-bold text-gray-800">Medical Records</h1>
                <div className="flex gap-2">
                    <Link
                        href="/dashboard/medicals/new"
                        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                    >
                        <Plus size={18} /> Add New
                    </Link>
                    <Link
                        href="/dashboard/medicals/import"
                        className="flex items-center gap-2 border border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-600 hover:text-white transition"
                    >
                        <Upload size={18} /> Import All
                    </Link>
                </div>
            </div>

            {/* Summary Card */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white shadow-md rounded-lg p-4 flex flex-col">
                    <span className="text-gray-500 text-sm">Total Records</span>
                    <span className="text-2xl font-semibold text-gray-800">{records.length}</span>
                </div>
            </div>

            {/* Search Bar */}
            <div className="flex justify-end">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by Name, Email, Address, Phone..."
                    className="w-full sm:w-64 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-600 transition shadow-sm"
                />
            </div>

            {/* Table */}
            <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50 sticky top-0 z-10">
                        <tr>
                            {["SN", "Name", "Email", "Address", "Phone", "Actions"].map((head) => (
                                <th
                                    key={head}
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    {head}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                        {loading ? (
                            Array.from({ length: 5 }).map((_, i) => (
                                <tr key={i}>
                                    <td colSpan={6} className="p-6 text-center text-gray-400 animate-pulse">
                                        Loading...
                                    </td>
                                </tr>
                            ))
                        ) : filteredRecords.length > 0 ? (
                            filteredRecords.map((r, i) => (
                                <tr
                                    key={r._id}
                                    className={`hover:bg-gray-50 ${i % 2 === 0 ? "bg-gray-50" : ""}`}
                                >
                                    <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-700">{i + 1}</td>
                                    <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-700">{r.name}</td>
                                    <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-700">{r.email}</td>
                                    <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-700">{r.address}</td>
                                    <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-700">{r.phone}</td>
                                    <td className="px-6 py-3 whitespace-nowrap flex items-center gap-3">
                                        <Link
                                            href={`/dashboard/medicals/${r._id}`}
                                            className="text-blue-600 hover:text-blue-800"
                                            aria-label="Edit"
                                        >
                                            <Edit size={18} />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(r._id)}
                                            className="text-red-600 hover:text-red-800"
                                            aria-label="Delete"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="text-center p-6 text-gray-400">
                                    No records found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
