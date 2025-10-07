"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Company {
    _id: string;
    companyName: string;
}

export default function NewCandidatePage() {
    const router = useRouter();
    const [companies, setCompanies] = useState<Company[]>([]);
    const [form, setForm] = useState({
        firstName: "",
        middleName: "",
        lastName: "",
        dateOfBirth: "",
        gender: "male",
        nationality: "",
        address: "",
        contactNumber: "",
        email: "",
        passportNumber: "",
        passportIssueDate: "",
        passportExpiryDate: "",
        position: "",
        company: "", // stores company ID
        status: "pending",
    });

    // 🔹 Fetch companies on mount
    useEffect(() => {
        fetch("/api/companies")
            .then((res) => res.json())
            .then((data) => setCompanies(data))
            .catch((err) => console.error("Error fetching companies:", err));
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch("/api/candidates", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });

        if (res.ok) {
            router.push("/candidates");
        } else {
            alert("❌ Error creating candidate");
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">🧑 Add New Candidate</h1>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* First Name */}
                <div>
                    <label className="block mb-2 font-semibold text-gray-700">First Name</label>
                    <input
                        name="firstName"
                        value={form.firstName}
                        onChange={handleChange}
                        className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Middle Name */}
                <div>
                    <label className="block mb-2 font-semibold text-gray-700">Middle Name</label>
                    <input
                        name="middleName"
                        value={form.middleName}
                        onChange={handleChange}
                        className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Last Name */}
                <div>
                    <label className="block mb-2 font-semibold text-gray-700">Last Name</label>
                    <input
                        name="lastName"
                        value={form.lastName}
                        onChange={handleChange}
                        className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Date of Birth */}
                <div>
                    <label className="block mb-2 font-semibold text-gray-700">Date of Birth</label>
                    <input
                        type="date"
                        name="dateOfBirth"
                        value={form.dateOfBirth}
                        onChange={handleChange}
                        className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Gender */}
                <div>
                    <label className="block mb-2 font-semibold text-gray-700">Gender</label>
                    <select
                        name="gender"
                        value={form.gender}
                        onChange={handleChange}
                        className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                {/* Nationality */}
                <div>
                    <label className="block mb-2 font-semibold text-gray-700">Nationality</label>
                    <input
                        name="nationality"
                        value={form.nationality}
                        onChange={handleChange}
                        className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Address */}
                <div>
                    <label className="block mb-2 font-semibold text-gray-700">Address</label>
                    <input
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                        className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Contact Number */}
                <div>
                    <label className="block mb-2 font-semibold text-gray-700">Contact Number</label>
                    <input
                        name="contactNumber"
                        value={form.contactNumber}
                        onChange={handleChange}
                        className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Email */}
                <div>
                    <label className="block mb-2 font-semibold text-gray-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Passport Number */}
                <div>
                    <label className="block mb-2 font-semibold text-gray-700">Passport Number</label>
                    <input
                        name="passportNumber"
                        value={form.passportNumber}
                        onChange={handleChange}
                        className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Passport Issue Date */}
                <div>
                    <label className="block mb-2 font-semibold text-gray-700">Passport Issue Date</label>
                    <input
                        type="date"
                        name="passportIssueDate"
                        value={form.passportIssueDate}
                        onChange={handleChange}
                        className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Passport Expiry Date */}
                <div>
                    <label className="block mb-2 font-semibold text-gray-700">Passport Expiry Date</label>
                    <input
                        type="date"
                        name="passportExpiryDate"
                        value={form.passportExpiryDate}
                        onChange={handleChange}
                        className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Position */}
                <div>
                    <label className="block mb-2 font-semibold text-gray-700">Position</label>
                    <input
                        name="position"
                        value={form.position}
                        onChange={handleChange}
                        className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Company */}
                <div>
                    <label className="block mb-2 font-semibold text-gray-700">Company</label>
                    <select
                        name="company"
                        value={form.company}
                        onChange={handleChange}
                        className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
                        required
                    >
                        <option value="">-- Select Company --</option>
                        {companies.map((company) => (
                            <option key={company._id} value={company._id}>
                                {company.companyName}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Status */}
                <div>
                    <label className="block mb-2 font-semibold text-gray-700">Status</label>
                    <select
                        name="status"
                        value={form.status}
                        onChange={handleChange}
                        className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="pending">Pending</option>
                        <option value="selected">Selected</option>
                        <option value="deployed">Deployed</option>
                        <option value="rejected">Rejected</option>
                    </select>
                </div>

                {/* Submit */}
                <div className="md:col-span-2 flex justify-end">
                    <button
                        type="submit"
                        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
                    >
                        Save Candidate
                    </button>
                </div>
            </form>
        </div>
    );
}
