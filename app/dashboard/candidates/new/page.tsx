"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface CandidateForm {
    firstName: string;
    middleName?: string;
    lastName: string;
    dateOfBirth: string;
    gender: "male" | "female" | "other";
    nationality: string;
    address: string;
    contactNumber: string;
    passportNumber: string;
    positionApplied: string;
    remark?: string;
}

export default function AddCandidate() {
    const router = useRouter();

    const [form, setForm] = useState<CandidateForm>({
        firstName: "",
        middleName: "",
        lastName: "",
        dateOfBirth: "",
        gender: "male",
        nationality: "Nepali",
        address: "",
        contactNumber: "",
        passportNumber: "",
        positionApplied: "",
        remark: "",
    });

    const [loading, setLoading] = useState(false);

    // Handle form change
    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Submit form
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("/api/candidates", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            if (!res.ok) throw new Error("Failed to create candidate");

            router.push("/dashboard/candidates");
        } catch (err) {
            console.error(err);
            alert("Error creating candidate record");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-white shadow rounded-xl p-6">
            <h1 className="text-2xl font-bold mb-6">Add New Candidate</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* First, Middle, Last Name */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            value={form.firstName}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Middle Name</label>
                        <input
                            type="text"
                            name="middleName"
                            value={form.middleName}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            value={form.lastName}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                        />
                    </div>
                </div>

                {/* Date of Birth & Gender */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Date of Birth
                        </label>
                        <input
                            type="date"
                            name="dateOfBirth"
                            value={form.dateOfBirth}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Gender</label>
                        <select
                            name="gender"
                            value={form.gender}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                        >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                </div>

                {/* Nationality */}
                <div>
                    <label className="block text-sm font-medium mb-1">Nationality</label>
                    <input
                        type="text"
                        name="nationality"
                        value={form.nationality}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                </div>

                {/* Address */}
                <div>
                    <label className="block text-sm font-medium mb-1">Address</label>
                    <input
                        type="text"
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                </div>

                {/* Contact + Passport */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Contact Number
                        </label>
                        <input
                            type="text"
                            name="contactNumber"
                            value={form.contactNumber}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Passport Number
                        </label>
                        <input
                            type="text"
                            name="passportNumber"
                            value={form.passportNumber}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                        />
                    </div>
                </div>

                {/* Position Applied */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Position Applied
                    </label>
                    <input
                        type="text"
                        name="positionApplied"
                        value={form.positionApplied}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                </div>

                {/* Remark */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Remark (optional)
                    </label>
                    <textarea
                        name="remark"
                        value={form.remark}
                        onChange={handleChange}
                        rows={3}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                </div>

                {/* Submit */}
                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-primary text-white px-6 py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
                    >
                        {loading ? "Saving..." : "Save Candidate"}
                    </button>
                </div>
            </form>
        </div>
    );
}
