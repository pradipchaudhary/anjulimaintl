"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

interface IMedical {
    name: string;
    email: string;
    address: string;
    phone: string;
}

export default function EditMedical() {
    const router = useRouter();
    const pathname = usePathname();
    const id = pathname.split("/").pop()!; // Get ID from URL

    const [form, setForm] = useState<IMedical>({
        name: "",
        email: "",
        address: "",
        phone: "",
    });

    const [loading, setLoading] = useState(true);

    // Fetch the specific record by ID
    useEffect(() => {
        const fetchRecord = async () => {
            try {
                const res = await fetch(`/api/medicals/${id}`);
                if (!res.ok) throw new Error("Failed to fetch record");
                const record: IMedical = await res.json();
                setForm(record);
            } catch (err) {
                console.error(err);
                alert("Error fetching medical record");
            } finally {
                setLoading(false);
            }
        };
        fetchRecord();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch(`/api/medicals/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            if (!res.ok) throw new Error("Failed to update record");
            router.push("/dashboard/medicals");
        } catch (err) {
            console.error(err);
            alert("Error updating medical record");
        }
    };

    if (loading) return <p className="p-6">Loading...</p>;

    return (
        <div className="p-6 bg-white shadow rounded mt-10">
            <h1 className="text-2xl font-bold mb-4">Edit Medical Record</h1>
            <form onSubmit={handleSubmit} className="grid gap-4">
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
                <button type="submit" className="bg-primary text-white px-4 py-2 rounded">
                    Update
                </button>
            </form>
        </div>
    );
}
