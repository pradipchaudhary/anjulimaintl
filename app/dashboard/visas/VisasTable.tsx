"use client";

import { useEffect, useState } from "react";

interface Visa {
    _id: string;
    ltNo: string;
    companyName: string;
    qty: number;
    visaStamped: number;
    remaining: number;
    status: "pending" | "active" | "finished";
    visaNumber?: string;
    sponsorId?: string;
    fileExpireDate?: string;
    remark?: string;
    createdAt: string;
    updatedAt: string;
}

export default function VisaTable() {
    const [visas, setVisas] = useState<Visa[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchVisas() {
            try {
                const res = await fetch("/api/visas");
                if (!res.ok) throw new Error("Failed to fetch visas");
                const data: Visa[] = await res.json();
                setVisas(data);
            } catch (err: any) {
                setError(err.message || "Something went wrong");
            } finally {
                setLoading(false);
            }
        }
        fetchVisas();
    }, []);

    if (loading) return <p className="text-center mt-6">Loading visas...</p>;
    if (error) return <p className="text-center mt-6 text-red-500">{error}</p>;

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 divide-y divide-gray-200 rounded-lg shadow-sm">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">LT No</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Company</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Qty</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Visa Stamped</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Remaining</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Status</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Visa Number</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Sponsor ID</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Expire Date</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Remark</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Created At</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {visas.map((visa) => (
                        <tr key={visa._id}>
                            <td className="px-4 py-2 text-sm">{visa.ltNo}</td>
                            <td className="px-4 py-2 text-sm">{visa.companyName}</td>
                            <td className="px-4 py-2 text-sm">{visa.qty}</td>
                            <td className="px-4 py-2 text-sm">{visa.visaStamped}</td>
                            <td className="px-4 py-2 text-sm">{visa.remaining}</td>
                            <td className="px-4 py-2 text-sm">
                                <span
                                    className={`px-2 py-1 rounded text-white text-xs ${visa.status === "pending"
                                        ? "bg-yellow-500"
                                        : visa.status === "active"
                                            ? "bg-blue-500"
                                            : "bg-green-500"
                                        }`}
                                >
                                    {visa.status}
                                </span>
                            </td>
                            <td className="px-4 py-2 text-sm">{visa.visaNumber || "-"}</td>
                            <td className="px-4 py-2 text-sm">{visa.sponsorId || "-"}</td>
                            <td className="px-4 py-2 text-sm">{visa.fileExpireDate ? new Date(visa.fileExpireDate).toLocaleDateString() : "-"}</td>
                            <td className="px-4 py-2 text-sm">{visa.remark || "-"}</td>
                            <td className="px-4 py-2 text-sm">{new Date(visa.createdAt).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
