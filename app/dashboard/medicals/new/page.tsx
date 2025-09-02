"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddMedical() {
    const [form, setForm] = useState({ sn: "", name: "", email: "", address: "", phone: "" });
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await fetch("/api/medicals", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...form, sn: Number(form.sn) }),
        });
        router.push("/dashboard/medicals");
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded mt-10">
            <h1 className="text-2xl font-bold mb-4">Add Medical Record</h1>
            <form onSubmit={handleSubmit} className="grid gap-4">
                {["sn", "name", "email", "address", "phone"].map((field) => (
                    <input
                        key={field}
                        type={field === "sn" ? "number" : "text"}
                        name={field}
                        placeholder={field.toUpperCase()}
                        value={(form as any)[field]}
                        onChange={handleChange}
                        required
                        className="border p-2 rounded"
                    />
                ))}
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
            </form>
        </div>
    );
}
