"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

interface IMedical {
    sn: number;
    name: string;
    email: string;
    address: string;
    phone: string;
}

export default function EditMedical() {
    const router = useRouter();
    const pathname = usePathname();
    const id = pathname.split("/").pop()!; // get ID from URL

    const [form, setForm] = useState<IMedical>({
        sn: 0,
        name: "",
        email: "",
        address: "",
        phone: "",
    });

    const [loading, setLoading] = useState(true);

    // Fetch the record
    useEffect(() => {
        const fetchRecord = async () => {
            const res = await fetch(`/api/medicals`);
            const data = await res.json();
            const record = data.find((r: any) => r._id === id);
            if (record) setForm(record);
            setLoading(false);
        };
        fetchRecord();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: name === "sn" ? Number(value) : value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await fetch(`/api/medicals/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });
        router.push("/dashboard/medicals");
    };

    if (loading) return <p className="p-6">Loading...</p>;

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded mt-10">
            <h1 className="text-2xl font-bold mb-4">Edit Medical Record</h1>
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
                <button
                    type="submit"
                    className="bg-green-600 text-white px-4 py-2 rounded"
                >
                    Update
                </button>
            </form>
        </div>
    );
}
