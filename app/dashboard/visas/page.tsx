"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Edit, Trash2 } from "lucide-react";

interface IVisa {
    _id: string;
    ltNo: string;
    companyName: string;
    qty: number;
    visaStamped: number;
    remaining: number;
    visaNumber?: string;
    sponsorId?: string;
    fileExpireDate?: string;
    status: "pending" | "active" | "finished";
    remark?: string;
}

export default function VisaPage() {
    const [records, setRecords] = useState<IVisa[]>([]);
    const [search, setSearch] = useState("");
    const [filteredRecords, setFilteredRecords] = useState<IVisa[]>([]);

    // Fetch all visas
    const fetchRecords = async () => {
        try {
            const res = await fetch("/api/visas");
            if (!res.ok) throw new Error("Failed to fetch visas");
            const data: IVisa[] = await res.json();
            setRecords(data);
            setFilteredRecords(data);
        } catch (err) {
            console.error(err);
        }
    };

    // Delete visa by ID
    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure?")) return;
        try {
            const res = await fetch(`/api/visas/${id}`, { method: "DELETE" });
            if (!res.ok) throw new Error("Failed to delete visa");
            fetchRecords();
        } catch (err) {
            console.error(err);
        }
    };

    // Search filter
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.toLowerCase();
        setSearch(value);

        const filtered = records.filter(
            (r) =>
                r.companyName.toLowerCase().includes(value) ||
                r.ltNo.toLowerCase().includes(value) ||
                (r.visaNumber ?? "").toLowerCase().includes(value) ||
                (r.sponsorId ?? "").toLowerCase().includes(value) ||
                r.status.toLowerCase().includes(value)
        );
        setFilteredRecords(filtered);
    };

    useEffect(() => {
        fetchRecords();
    }, []);

    return (
        <div className="max-w-full mx-auto">
            <h1 className="text-2xl font-bold mb-4">Visa Records</h1>

            {/* Search + Actions */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-2">
                <input
                    type="text"
                    value={search}
                    onChange={handleSearch}
                    placeholder="Search by Company, LT No, Visa No, Sponsor ID..."
                    className="border border-gray-200 rounded-md px-3 py-2 w-full max-w-xs 
             focus:outline-none focus:border-primary transition duration-200"
                />

                <div className="flex gap-2">
                    <Link
                        href="/dashboard/visas/new"
                        className="bg-primary text-white px-4 py-1.5 rounded"
                    >
                        Add New Visa
                    </Link>
                    <button className="border border-primary px-4 py-1.5 rounded">
                        Export all
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SN</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">LT No</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Visa No</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stamped</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remaining</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                        {filteredRecords.length ? (
                            filteredRecords.map((r, i) => (
                                <tr key={r._id} className="hover:bg-gray-50">
                                    <td className="px-4 py-3 text-sm text-gray-700">{i + 1}</td>
                                    <td className="px-4 py-3 text-sm text-gray-700">{r.companyName}</td>
                                    <td className="px-4 py-3 text-sm text-gray-700">{r.ltNo}</td>
                                    <td className="px-4 py-3 text-sm text-gray-700">{r.visaNumber ?? "-"}</td>
                                    <td className="px-4 py-3 text-sm text-gray-700">{r.qty}</td>
                                    <td className="px-4 py-3 text-sm text-gray-700">{r.visaStamped}</td>
                                    <td className="px-4 py-3 text-sm text-gray-700">{r.remaining}</td>
                                    <td className="px-4 py-3 text-sm">
                                        <span
                                            className={`px-2 py-1 rounded text-xs font-medium 
                                            ${r.status === "active" ? "bg-green-100 text-green-700" :
                                                    r.status === "pending" ? "bg-yellow-100 text-yellow-700" :
                                                        "bg-gray-100 text-gray-600"}`}
                                        >
                                            {r.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 flex space-x-2">
                                        {/* Edit */}
                                        <Link
                                            href={`/dashboard/visas/${r._id}`}
                                            className="text-blue-600 hover:text-blue-800 relative group"
                                        >
                                            <Edit size={18} />
                                            <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 text-xs bg-gray-700 text-white rounded px-2 py-1">
                                                Edit
                                            </span>
                                        </Link>
                                        {/* Delete */}
                                        <button
                                            onClick={() => handleDelete(r._id)}
                                            className="text-red-600 hover:text-red-800 relative group"
                                        >
                                            <Trash2 size={18} />
                                            <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 text-xs bg-gray-700 text-white rounded px-2 py-1">
                                                Delete
                                            </span>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={9} className="text-center p-4">
                                    No visa records found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
