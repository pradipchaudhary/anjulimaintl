"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Candidate {
    _id: string;
    firstName: string;
    lastName: string;
}

interface Company {
    _id: string;
    companyName: string;
}

export default function NewInterviewPage() {
    const router = useRouter();
    const [candidates, setCandidates] = useState<Candidate[]>([]);
    const [companies, setCompanies] = useState<Company[]>([]);
    const [form, setForm] = useState({
        candidate: "",
        company: "",
        position: "",
        interviewDate: "",
        mode: "offline",
        interviewer: "",
        result: "pending",
        notes: "",
    });

    // 🔹 Fetch candidates & companies
    useEffect(() => {
        fetch("/api/candidates")
            .then((res) => res.json())
            .then((data) => setCandidates(data));

        fetch("/api/companies")
            .then((res) => res.json())
            .then((data) => setCompanies(data));
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch("/api/interviews", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });

        if (res.ok) {
            router.push("/interviews");
        } else {
            alert("❌ Error creating interview");
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-lg">
            <h1 className="text-2xl font-bold mb-6">📝 Schedule Interview</h1>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Candidate */}
                <div>
                    <label className="block mb-2 font-semibold text-gray-700">Candidate</label>
                    <select
                        name="candidate"
                        value={form.candidate}
                        onChange={handleChange}
                        className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
                        required
                    >
                        <option value="">-- Select Candidate --</option>
                        {candidates.map((c) => (
                            <option key={c._id} value={c._id}>
                                {c.firstName} {c.lastName}
                            </option>
                        ))}
                    </select>
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
                        {companies.map((c) => (
                            <option key={c._id} value={c._id}>
                                {c.companyName}
                            </option>
                        ))}
                    </select>
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

                {/* Interview Date */}
                <div>
                    <label className="block mb-2 font-semibold text-gray-700">Interview Date</label>
                    <input
                        type="datetime-local"
                        name="interviewDate"
                        value={form.interviewDate}
                        onChange={handleChange}
                        className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Mode */}
                <div>
                    <label className="block mb-2 font-semibold text-gray-700">Mode</label>
                    <select
                        name="mode"
                        value={form.mode}
                        onChange={handleChange}
                        className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="offline">Offline</option>
                        <option value="online">Online</option>
                    </select>
                </div>

                {/* Interviewer */}
                <div>
                    <label className="block mb-2 font-semibold text-gray-700">Interviewer</label>
                    <input
                        name="interviewer"
                        value={form.interviewer}
                        onChange={handleChange}
                        className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Result */}
                <div>
                    <label className="block mb-2 font-semibold text-gray-700">Result</label>
                    <select
                        name="result"
                        value={form.result}
                        onChange={handleChange}
                        className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="pending">Pending</option>
                        <option value="selected">Selected</option>
                        <option value="rejected">Rejected</option>
                        <option value="on-hold">On Hold</option>
                    </select>
                </div>

                {/* Notes */}
                <div className="md:col-span-2">
                    <label className="block mb-2 font-semibold text-gray-700">Notes</label>
                    <textarea
                        name="notes"
                        value={form.notes}
                        onChange={handleChange}
                        className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
                        rows={3}
                    ></textarea>
                </div>

                {/* Submit */}
                <div className="md:col-span-2 flex justify-end">
                    <button
                        type="submit"
                        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
                    >
                        Save Interview
                    </button>
                </div>
            </form>
        </div>
    );
}
