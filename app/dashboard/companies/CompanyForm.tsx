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

    const handleVisaStampedChange = (value: number) => {
        let newValue = value < 0 ? 0 : value > qty ? qty : value;
        setVisaStamped(newValue);

        if (newValue === qty) {
            setStatus("finished");
        } else if (status === "finished") {
            setStatus("active");
        }
    };

    const handleQtyChange = (value: number) => {
        const newQty = value < 0 ? 0 : value;
        setQty(newQty);

        if (visaStamped > newQty) setVisaStamped(newQty);

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
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-lg relative">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                >
                    <X size={20} />
                </button>

                {/* Title */}
                <h2 className="text-xl font-semibold mb-6 text-gray-800 text-center">
                    {company ? "✏️ Edit Company" : "➕ Add New Company"}
                </h2>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    {/* LT No */}
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">LT No</label>
                        <input
                            type="text"
                            value={ltNo}
                            onChange={(e) => setLtNo(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-gray-700"
                            required
                        />
                    </div>

                    {/* Company Name */}
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">
                            Company Name
                        </label>
                        <input
                            type="text"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-gray-700"
                            required
                        />
                    </div>

                    {/* Quota + Visa Stamped + Remaining */}
                    <div className="grid grid-cols-3 gap-3">
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">
                                Total Quota
                            </label>
                            <input
                                type="number"
                                value={qty}
                                min={0}
                                onChange={(e) => handleQtyChange(Number(e.target.value))}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-gray-700"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">
                                Visa Stamped
                            </label>
                            <input
                                type="number"
                                value={visaStamped}
                                min={0}
                                max={qty}
                                onChange={(e) => handleVisaStampedChange(Number(e.target.value))}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-gray-700"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">
                                Remaining
                            </label>
                            <input
                                type="number"
                                value={remaining}
                                readOnly
                                className="w-full border border-gray-200 rounded-md px-3 py-2 bg-gray-50 text-gray-600"
                            />
                        </div>
                    </div>

                    {/* Visa Number */}
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">
                            Visa Number
                        </label>
                        <input
                            type="text"
                            value={visaNumber}
                            onChange={(e) => setVisaNumber(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-gray-700"
                        />
                    </div>

                    {/* Sponsor ID */}
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">
                            Sponsor ID
                        </label>
                        <input
                            type="text"
                            value={sponsorId}
                            onChange={(e) => setSponsorId(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-gray-700"
                        />
                    </div>

                    {/* Status */}
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Status</label>
                        <select
                            value={status}
                            onChange={(e) =>
                                setStatus(e.target.value as ICompany["status"])
                            }
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-gray-700 bg-white"
                        >
                            <option value="pending">⏳ Pending</option>
                            <option value="active">✅ Active</option>
                            <option value="finished">🏁 Finished</option>
                        </select>
                    </div>

                    {/* Remark */}
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Remark</label>
                        <textarea
                            value={remark}
                            onChange={(e) => setRemark(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-gray-700 min-h-[80px]"
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary transition font-medium"
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
