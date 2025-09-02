"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// Define the form type
interface MedicalForm {
    sn: number | "";
    name: string;
    email: string;
    address: string;
    phone: string;
}

export default function AddMedical() {
    const [form, setForm] = useState<MedicalForm>({
        sn: "",
        name: "",
        email: "",
        address: "",
        phone: "",
    });

    const router = useRouter();

    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: name === "sn" ? Number(value) : value, // convert sn to number
        }));
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate that SN is a number
        if (form.sn === "" || isNaN(form.sn)) {
            alert("SN must be a valid number");
            return;
        }

        try {
            const res = await fetch("/api/medicals", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            if (!res.ok) throw new Error("Failed to add record");

            router.push("/dashboard/medicals");
        } catch (err) {
            console.error(err);
            alert("Error adding medical record");
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded mt-10">
            <h1 className="text-2xl font-bold mb-4">Add Medical Record</h1>

            <form onSubmit={handleSubmit} className="grid gap-4">
                <input
                    type="number"
                    name="sn"
                    placeholder="SN"
                    value={form.sn}
                    onChange={handleChange}
                    required
                    className="border p-2 rounded"
                />
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="border p-2 rounded"
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="border p-2 rounded"
                />
                <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={form.address}
                    onChange={handleChange}
                    required
                    className="border p-2 rounded"
                />
                <input
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    className="border p-2 rounded"
                />

                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                    Save
                </button>
            </form>
        </div>
    );
}
