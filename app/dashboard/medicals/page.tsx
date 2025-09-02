"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Edit, Trash2 } from "lucide-react";

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
    const [filteredRecords, setFilteredRecords] = useState<IMedical[]>([]);

    const fetchRecords = async () => {
        const res = await fetch("/api/medicals");
        const data = await res.json();
        setRecords(data);
        setFilteredRecords(data);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure?")) return;
        await fetch(`/api/medicals/${id}`, { method: "DELETE" });
        fetchRecords();
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.toLowerCase();
        setSearch(value);

        const filtered = records.filter(
            (r) =>
                r.name.toLowerCase().includes(value) ||
                r.email.toLowerCase().includes(value) ||
                r.address.toLowerCase().includes(value) ||
                r.phone.includes(value)
        );
        setFilteredRecords(filtered);
    };

    useEffect(() => {
        fetchRecords();
    }, []);

    return (
        <div className="max-w-full mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Medical Records</h1>

            <div className="flex justify-between items-center mb-4">
                <input
                    type="text"
                    value={search}
                    onChange={handleSearch}
                    placeholder="Search by Name, Email, Address, Phone..."
                    className="border border-gray-200 rounded px-3 py-2 w-full max-w-xs"
                />

                <Link
                    href="/dashboard/medicals/new"
                    className="bg-blue-600 text-white px-4 py-2 rounded ml-4"
                >
                    Add New
                </Link>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SN</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                        {filteredRecords.length ? (
                            filteredRecords.map((r) => (
                                <tr key={r._id} className="hover:bg-gray-50">
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{r.sn}</td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{r.name}</td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{r.email}</td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{r.address}</td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{r.phone}</td>
                                    <td className="px-4 py-3 whitespace-nowrap flex space-x-2">
                                        {/* Edit Icon */}
                                        <Link
                                            href={`/dashboard/medicals/${r._id}`}
                                            className="text-blue-600 hover:text-blue-800 relative group"
                                        >
                                            <Edit size={18} />
                                            <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 text-xs bg-gray-700 text-white rounded px-2 py-1 whitespace-nowrap">
                                                Edit
                                            </span>
                                        </Link>

                                        {/* Delete Icon */}
                                        <button
                                            onClick={() => handleDelete(r._id)}
                                            className="text-red-600 hover:text-red-800 relative cursor-pointer group"
                                        >
                                            <Trash2 size={18} />
                                            <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 text-xs bg-gray-700 text-white rounded px-2 py-1 whitespace-nowrap">
                                                Delete
                                            </span>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="text-center p-4">
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
