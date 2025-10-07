"use client";

import { useEffect, useState, useMemo } from "react";
import { Edit, Trash2, Plus, Eye, X, Clipboard, Users, CheckCircle, Clock, Activity, Briefcase } from "lucide-react";
import { statusClass, truncateText } from "@/utils/utils";
import CompanyForm from "./CompanyForm";

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
    remark?: string;
    createdAt: string;
    updatedAt: string;
}

export default function CompaniesPage() {
    const [records, setRecords] = useState<ICompany[]>([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [selectedRecord, setSelectedRecord] = useState<ICompany | null>(null);

    // 🔥 new state to control modal visibility
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [formCompany, setFormCompany] = useState<ICompany | null>(null);

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
            const res = await fetch(`/api/companies/${id}`, { method: "DELETE" });
            if (!res.ok) throw new Error("Failed to delete record");
            setRecords((prev) => prev.filter((r) => r._id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    // Handle form success (add/edit)
    const handleFormSuccess = (company: ICompany) => {
        const exists = records.find((r) => r._id === company._id);
        if (exists) {
            setRecords((prev) => prev.map((r) => (r._id === company._id ? company : r)));
        } else {
            setRecords((prev) => [company, ...prev]);
        }
        setIsFormOpen(false);
        setFormCompany(null);
    };

    // Filtered companies by search
    const filteredRecords = useMemo(() => {
        return records.filter(
            (r) =>
                r.ltNo.toLowerCase().includes(search.toLowerCase()) ||
                r.companyName.toLowerCase().includes(search.toLowerCase()) ||
                r.status.toLowerCase().includes(search.toLowerCase()) ||
                r.remark?.toLowerCase().includes(search.toLowerCase())
        );
    }, [search, records]);

    // Summary stats
    const totalDemand = useMemo(() => records.reduce((acc, r) => acc + r.qty, 0), [records]);
    const totalVisaStamped = useMemo(() => records.reduce((acc, r) => acc + r.visaStamped, 0), [records]);
    // const totalRemaining = useMemo(() => records.reduce((acc, r) => acc + r.remaining, 0), [records]);
    const totalRemaining = useMemo(
        () => records.filter(r => r.status === "active").reduce((acc, r) => acc + r.remaining, 0),
        [records]
    );
    const activeCompanies = useMemo(() => records.filter((r) => r.status === "active").length, [records]);

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
                        <button
                            onClick={() => {
                                setFormCompany(null);
                                setIsFormOpen(true);
                            }}
                            className="flex items-center gap-2 bg-primary text-white px-3 py-1.5 rounded hover:bg-secondary transition text-sm"
                        >
                            <Plus size={16} /> Add New
                        </button>
                    </div>
                </div>

                {/* ===== Summary Section ===== */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-4">
                    {/* Total Companies */}
                    <div className="bg-white shadow-sm rounded-xl p-5 flex items-center gap-5">
                        <div className="p-4 rounded-lg flex items-center justify-center bg-gray-100">
                            <Briefcase className="h-10 w-10 text-gray-500" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-gray-500 text-xs font-medium uppercase">Total Companies</span>
                            <span className="text-2xl font-bold  text-gray-800">{records.length}</span>
                        </div>
                    </div>

                    {/* Total Demand */}
                    <div className="bg-blue-50 shadow-sm rounded-xl p-5 flex items-center gap-5">
                        <div className="p-4 rounded-lg flex items-center justify-center bg-blue-100">
                            <Users className="h-10 w-10 text-blue-500" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-gray-500 text-xs font-medium uppercase">Total Demand</span>
                            <span className="text-2xl font-bold text-gray-800">{totalDemand}</span>
                        </div>
                    </div>

                    {/* Total Visa Stamped */}
                    <div className="bg-green-50 shadow-sm rounded-xl p-5 flex items-center gap-5">
                        <div className="p-4 rounded-lg flex items-center justify-center bg-green-100">
                            <CheckCircle className="h-10 w-10 text-green-500" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-gray-500 text-xs font-medium uppercase">Visa Stamped</span>
                            <span className="text-2xl font-bold text-gray-800">{totalVisaStamped}</span>
                        </div>
                    </div>

                    {/* Remaining */}
                    <div className="bg-yellow-50 shadow-sm rounded-xl p-5 flex items-center gap-5">
                        <div className="p-4 rounded-lg flex items-center justify-center bg-yellow-100">
                            <Clock className="h-10 w-10 text-yellow-500" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-gray-500 text-xs font-medium uppercase">Remaining</span>
                            <span className="text-2xl font-bold text-gray-800">{totalRemaining}</span>
                        </div>
                    </div>

                    {/* Active Companies */}
                    <div className="bg-purple-50 shadow-sm rounded-xl p-5 flex items-center gap-5">
                        <div className="p-4 rounded-lg flex items-center justify-center bg-purple-100">
                            <Activity className="h-10 w-10 text-purple-500" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-gray-500 text-xs font-medium uppercase">Active Companies</span>
                            <span className="text-2xl font-bold text-gray-800">{activeCompanies}</span>
                        </div>
                    </div>
                </div>




                {/* Search */}
                <div className="flex justify-end">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search by LT No, Company, Status, Remark..."
                        className="w-full sm:w-64 border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:border-primary transition shadow-sm"
                    />
                </div>
            </div>

            {/* ===== Table ===== */}
            <div className="flex-1 overflow-auto shadow-md rounded-lg border border-gray-200">
                <div className="min-w-full overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50 sticky top-0 z-10">
                            <tr>
                                {["SN", "LT No", "Company Name", "Qty", "Stamped", "Remaining", "Visa Number", "Sponsor ID", "Status", "Remark", "Actions"].map(
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
                                <tr>
                                    <td colSpan={11} className="p-6 text-center text-gray-400 animate-pulse">
                                        Loading...
                                    </td>
                                </tr>
                            ) : filteredRecords.length > 0 ? (
                                filteredRecords.map((r, i) => (
                                    <tr key={r._id} className={`hover:bg-gray-50 ${i % 2 === 0 ? "bg-gray-50" : ""}`}>
                                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{i + 1}</td>
                                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{r.ltNo}</td>
                                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{truncateText(r.companyName, 5)}</td>
                                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{r.qty}</td>
                                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{r.visaStamped}</td>
                                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{r.remaining}</td>
                                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{r.visaNumber}</td>
                                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{r.sponsorId}</td>
                                        <td className={`px-2 py-1 whitespace-nowrap ${statusClass(r.status)}`}>{r.status}</td>
                                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{truncateText(r.remark || "-")}</td>
                                        <td className="px-4 py-2 whitespace-nowrap flex items-center gap-2">
                                            <button onClick={() => setSelectedRecord(r)} className="text-gray-500 hover:text-secondary cursor-pointer">
                                                <Eye size={18} />
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setFormCompany(r);
                                                    setIsFormOpen(true);
                                                }}
                                                className="text-primary hover:text-secondary"
                                            >
                                                <Edit size={16} />
                                            </button>
                                            <button onClick={() => handleDelete(r._id)} className="text-red-600 hover:text-red-800">
                                                <Trash2 size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={11} className="p-6 text-center text-gray-400">
                                        No records found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* ===== View Modal ===== */}
            {selectedRecord && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-md z-50">
                    <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md relative">
                        <button
                            onClick={() => setSelectedRecord(null)}
                            className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 transition"
                        >
                            <X size={20} />
                        </button>
                        <h2 className="text-xl font-semibold mb-4 text-gray-800">Company Details</h2>
                        <div className="space-y-3 text-sm text-gray-700">
                            <p><span className="font-medium">LT No:</span> {selectedRecord.ltNo}</p>
                            <p><span className="font-medium">Company Name:</span> {selectedRecord.companyName}</p>
                            <p><span className="font-medium">Qty:</span> {selectedRecord.qty}</p>
                            <p><span className="font-medium">Visa Stamped:</span> {selectedRecord.visaStamped}</p>
                            <p><span className="font-medium">Remaining:</span> {selectedRecord.remaining}</p>
                            <p>
                                <span className="font-medium">Status:</span>{" "}
                                <span
                                    className={`inline-block px-2 py-1 text-xs rounded-full font-semibold ${selectedRecord.status === "active"
                                        ? "bg-green-100 text-green-800"
                                        : selectedRecord.status === "pending"
                                            ? "bg-yellow-100 text-yellow-800"
                                            : "bg-red-100 text-red-800"
                                        }`}
                                >
                                    {selectedRecord.status}
                                </span>
                            </p>
                            <p className="flex items-center gap-1">
                                <span className="font-medium">Sponsor ID:</span>
                                <span
                                    className="text-blue-600 hover:underline cursor-pointer flex items-center gap-1"
                                    onClick={() => selectedRecord.sponsorId && navigator.clipboard.writeText(selectedRecord.sponsorId)}
                                >
                                    {selectedRecord.sponsorId || "-"} <Clipboard size={14} />
                                </span>
                            </p>
                            {selectedRecord.visaNumber && (
                                <p className="flex items-center gap-1">
                                    <span className="font-medium">Visa Number:</span>
                                    <span
                                        className="text-blue-600 hover:underline cursor-pointer flex items-center gap-1"
                                        onClick={() => navigator.clipboard.writeText(selectedRecord.visaNumber!)}
                                    >
                                        {selectedRecord.visaNumber} <Clipboard size={14} />
                                    </span>
                                </p>
                            )}
                            <p><span className="font-medium">Remark:</span> {selectedRecord.remark || "-"}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* ===== Create/Edit Modal ===== */}
            {isFormOpen && (
                <CompanyForm
                    company={formCompany || undefined}
                    onClose={() => {
                        setIsFormOpen(false);
                        setFormCompany(null);
                    }}
                    onSuccess={handleFormSuccess}
                />
            )}
        </div>
    );
}
