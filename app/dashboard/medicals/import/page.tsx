"use client";

import { useState } from "react";

export default function ImportMedicalPage() {
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    };

    const handleImport = async () => {
        if (!file) {
            setMessage("⚠️ Please select an Excel file first.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        console.log("Uploading file:", file.name, file.type, file.size);

        try {
            setLoading(true);
            setMessage("");

            const res = await fetch("/api/medicals/import", {
                method: "POST",
                body: formData,
            });

            if (!res.ok) throw new Error("Failed to import data");

            const data = await res.json();
            setMessage(`✅ Imported ${data.count} records successfully.`);
        } catch (error: unknown) {
            // ✅ Properly narrow unknown type
            if (error instanceof Error) {
                setMessage("❌ Error importing data: " + error.message);
            } else {
                setMessage("❌ Error importing data");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow">
            <h1 className="text-2xl font-bold mb-4">Import Medical Records</h1>

            <input
                type="file"
                accept=".xlsx,.xls"
                onChange={handleFileChange}
                className="mb-4"
            />

            <button
                onClick={handleImport}
                disabled={loading}
                className="bg-primary text-white px-4 py-2 rounded disabled:opacity-50"
            >
                {loading ? "Importing..." : "Import"}
            </button>

            {message && <p className="mt-4 text-sm">{message}</p>}
        </div>
    );
}
