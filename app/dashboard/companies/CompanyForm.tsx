"use client";

import { useState } from "react";
import { X } from "lucide-react";

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

interface CompanyFormProps {
    company?: ICompany;
    onClose: () => void;
    onSuccess: (company: ICompany) => void;
}
// ...imports and interface definitions remain unchanged

function CompanyForm({ company, onClose, onSuccess }: CompanyFormProps) {
    const [ltNo, setLtNo] = useState(company?.ltNo || "");
    const [companyName, setCompanyName] = useState(company?.companyName || "");
    const [qty, setQty] = useState(company?.qty || 0);
    const [visaStamped, setVisaStamped] = useState(company?.visaStamped || 0);
    const [visaNumber, setVisaNumber] = useState(company?.visaNumber || "");
    const [sponsorId, setSponsorId] = useState(company?.sponsorId || "");
    const [status, setStatus] = useState<ICompany["status"]>(
        company?.status || "pending"
    );
    const [remark, setRemark] = useState(company?.remark || "");
    const [loading, setLoading] = useState(false);

    const remaining = qty - visaStamped;

    // 🔥 Automatically update status based on visaStamped vs qty
    const handleVisaStampedChange = (value: number) => {
        let newValue = value;
        if (value < 0) newValue = 0;
        if (value > qty) newValue = qty;
        setVisaStamped(newValue);

        // Auto-change status
        if (newValue === qty) {
            setStatus("finished");
        } else if (status === "finished") {
            setStatus("active");
        }
    };

    // Optional: handle qty change as well to adjust visaStamped and status
    const handleQtyChange = (value: number) => {
        const newQty = value < 0 ? 0 : value;
        setQty(newQty);

        // Adjust visaStamped if it exceeds new qty
        if (visaStamped > newQty) setVisaStamped(newQty);

        // Update status
        if (visaStamped === newQty) {
            setStatus("finished");
        } else if (status === "finished") {
            setStatus("active");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Ensure final status is correct
            const finalStatus = visaStamped === qty ? "finished" : status;

            const url = company ? `/api/companies/${company._id}` : "/api/companies";
            const method = company ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ltNo,
                    companyName,
                    qty,
                    visaStamped,
                    visaNumber,
                    sponsorId,
                    status: finalStatus,
                    remark,
                }),
            });

            if (!res.ok) throw new Error("Something went wrong!");
            const json = await res.json();

            onSuccess(json.record || json);
            onClose();
        } catch (err) {
            console.error(err);
            alert("Failed to save company.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
            <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-lg relative animate-fadeIn">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 transition"
                >
                    <X size={22} />
                </button>

                {/* Title */}
                <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
                    {company ? "✏️ Edit Company" : "➕ Add New Company"}
                </h2>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    {/* LT No */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">LT No</label>
                        <input
                            type="text"
                            value={ltNo}
                            onChange={(e) => setLtNo(e.target.value)}
                            className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
                            required
                        />
                    </div>

                    {/* Company Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                        <input
                            type="text"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
                            required
                        />
                    </div>

                    {/* Quota + Visa Stamped + Remaining */}
                    <div className="grid grid-cols-3 gap-3">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Total Quota</label>
                            <input
                                type="number"
                                value={qty}
                                min={0}
                                onChange={(e) => handleQtyChange(Number(e.target.value))}
                                className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Visa Stamped</label>
                            <input
                                type="number"
                                value={visaStamped}
                                min={0}
                                max={qty}
                                onChange={(e) => handleVisaStampedChange(Number(e.target.value))}
                                className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Remaining</label>
                            <input
                                type="number"
                                value={remaining}
                                readOnly
                                className="w-full border px-4 py-2 rounded-lg bg-gray-100 text-gray-600 shadow-sm"
                            />
                        </div>
                    </div>

                    {/* Visa Number */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Visa Number</label>
                        <input
                            type="text"
                            value={visaNumber}
                            onChange={(e) => setVisaNumber(e.target.value)}
                            className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
                        />
                    </div>

                    {/* Sponsor ID */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Sponsor ID</label>
                        <input
                            type="text"
                            value={sponsorId}
                            onChange={(e) => setSponsorId(e.target.value)}
                            className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
                        />
                    </div>

                    {/* Status */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value as ICompany["status"])}
                            className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
                        >
                            <option value="pending">⏳ Pending</option>
                            <option value="active">✅ Active</option>
                            <option value="finished">🏁 Finished</option>
                        </select>
                    </div>

                    {/* Remark */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Remark</label>
                        <textarea
                            value={remark}
                            onChange={(e) => setRemark(e.target.value)}
                            className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary shadow-sm min-h-[80px]"
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary transition font-semibold shadow-md"
                    >
                        {loading
                            ? company
                                ? "Updating..."
                                : "Creating..."
                            : company
                                ? "Update Company"
                                : "Create Company"}
                    </button>
                </form>
            </div>
        </div>
    );
}



export default CompanyForm;
