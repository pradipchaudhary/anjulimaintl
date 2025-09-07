"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

interface VisaForm {
    ltNo: string;
    companyName: string;
    qty: number;
    visaStamped: number;
    visaNumber?: string;
    sponsorId?: string;
    fileExpireDate?: string;
    status: "pending" | "active" | "finished";
    remark?: string;
}

export default function EditVisaPage() {
    const router = useRouter();
    const params = useParams();
    const id = params?.id as string;

    const [form, setForm] = useState<VisaForm>({
        ltNo: "",
        companyName: "",
        qty: 0,
        visaStamped: 0,
        visaNumber: "",
        sponsorId: "",
        fileExpireDate: "",
        status: "pending",
        remark: "",
    });

    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);

    // Fetch visa by ID
    const fetchVisa = async () => {
        try {
            const res = await fetch(`/api/visas/${id}`);
            if (!res.ok) throw new Error("Failed to fetch visa");
            const data: VisaForm = await res.json();
            setForm({
                ltNo: data.ltNo,
                companyName: data.companyName,
                qty: data.qty,
                visaStamped: data.visaStamped,
                visaNumber: data.visaNumber ?? "",
                sponsorId: data.sponsorId ?? "",
                fileExpireDate: data.fileExpireDate
                    ? data.fileExpireDate.substring(0, 10)
                    : "",
                status: data.status,
                remark: data.remark ?? "",
            });
        } catch (err) {
            console.error(err);
            alert("Error fetching visa details");
        } finally {
            setFetching(false);
        }
    };

    useEffect(() => {
        if (id) fetchVisa();
    }, [id]);

    // Handle input changes
    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]:
                name === "qty" || name === "visaStamped" ? Number(value) : value,
        }));
    };

    // Submit update
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch(`/api/visas/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            if (!res.ok) throw new Error("Failed to update visa");

            router.push("/dashboard/visas");
        } catch (err) {
            console.error(err);
            alert("Error updating visa");
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
        return <div className="text-center py-10" > Loading visa details...</div>;
    }

    return (
        <div className="max-w-2xl mx-auto bg-white shadow rounded-xl p-6" >
            <h1 className="text-2xl font-bold mb-6" > Edit Visa </h1>

            < form onSubmit={handleSubmit} className="space-y-4" >
                {/* LT No */}
                < div >
                    <label className="block text-sm font-medium mb-1" > LT No </label>
                    < input
                        type="text"
                        name="ltNo"
                        value={form.ltNo}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                </div>

                {/* Company Name */}
                <div>
                    <label className="block text-sm font-medium mb-1" > Company Name </label>
                    < input
                        type="text"
                        name="companyName"
                        value={form.companyName}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                </div>

                {/* Qty & Visa Stamped */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" >
                    <div>
                        <label className="block text-sm font-medium mb-1" > Quantity </label>
                        < input
                            type="number"
                            name="qty"
                            value={form.qty}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                        />
                    </div>
                    < div >
                        <label className="block text-sm font-medium mb-1" > Visa Stamped </label>
                        < input
                            type="number"
                            name="visaStamped"
                            value={form.visaStamped}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                        />
                    </div>
                </div>

                {/* Visa Number & Sponsor ID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" >
                    <div>
                        <label className="block text-sm font-medium mb-1" > Visa Number </label>
                        < input
                            type="text"
                            name="visaNumber"
                            value={form.visaNumber}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                        />
                    </div>
                    < div >
                        <label className="block text-sm font-medium mb-1" > Sponsor ID </label>
                        < input
                            type="text"
                            name="sponsorId"
                            value={form.sponsorId}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                        />
                    </div>
                </div>

                {/* File Expire Date */}
                <div>
                    <label className="block text-sm font-medium mb-1" > File Expire Date </label>
                    < input
                        type="date"
                        name="fileExpireDate"
                        value={form.fileExpireDate}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                </div>

                {/* Status */}
                <div>
                    <label className="block text-sm font-medium mb-1" > Status </label>
                    < select
                        name="status"
                        value={form.status}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                    >
                        <option value="pending" > Pending </option>
                        < option value="active" > Active </option>
                        < option value="finished" > Finished </option>
                    </select>
                </div>

                {/* Remark */}
                <div>
                    <label className="block text-sm font-medium mb-1" > Remark </label>
                    < textarea
                        name="remark"
                        value={form.remark}
                        onChange={handleChange}
                        rows={3}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                </div>

                {/* Submit */}
                <div className="flex justify-end" >
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-primary text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
                    >
                        {loading ? "Updating..." : "Update Visa"}
                    </button>
                </div>
            </form>
        </div>
    );
}
