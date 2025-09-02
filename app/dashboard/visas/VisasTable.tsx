"use client";

import React, { useEffect, useState } from "react";

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
    excelFilePath?: string;
    isActive?: boolean;
    createdAt?: string;
    updatedAt?: string;
}

export default function VisasTable() {
    const [data, setData] = useState<IVisa[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/visas")
            .then((res) => res.json())
            .then((visas) => setData(visas))
            .finally(() => setLoading(false));
    }, []);

    const fmtDate = (iso?: string) => (iso ? new Date(iso).toLocaleString() : "-");

    if (loading) return <p className="p-4">Loading visas...</p>;

    return (
        <div className="max-w-full mx-auto p-4">
            {/* <h2 className="text-2xl font-semibold mb-4">Visas</h2> */}
            <div className="overflow-x-auto bg-white shadow rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">LT No</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                            <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
                            <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Visa Stamped</th>
                            <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Remaining</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Visa #</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sponsor ID</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">File Expiry</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Excel</th>
                            <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Active</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Updated At</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                        {data.map((v) => (
                            <tr key={v._id}>
                                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{v.ltNo}</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{v.companyName}</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-gray-700">{v.qty}</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-gray-700">{v.visaStamped}</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-gray-700">{v.remaining}</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{v.visaNumber ?? "-"}</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{v.sponsorId ?? "-"}</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{fmtDate(v.fileExpireDate)}</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-blue-600 underline">
                                    {v.excelFilePath ? <a href={v.excelFilePath} target="_blank" rel="noreferrer">Download</a> : "-"}
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-center">
                                    {v.isActive ? <span className="inline-block px-2 py-0.5 text-xs font-medium bg-green-100 text-green-800 rounded-full">Yes</span> :
                                        <span className="inline-block px-2 py-0.5 text-xs font-medium bg-red-100 text-red-800 rounded-full">No</span>}
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{fmtDate(v.createdAt)}</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{fmtDate(v.updatedAt)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
