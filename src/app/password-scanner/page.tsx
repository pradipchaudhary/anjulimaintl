"use client";

import { useState } from "react";

export default function UploadPage() {
    const [file, setFile] = useState<File | null>(null);
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFile(event.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!file) return;
        setLoading(true);

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch("/api/extract", {
                method: "POST",
                body: formData,
            });

            const result = await response.json();
            console.log("result:", result)
            setData(result.data);
        } catch (error) {
            console.error("Error uploading file:", error);
        }

        setLoading(false);
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Nepali Passport Scanner</h2>

            <input type="file" accept="image/*,application/pdf" onChange={handleFileChange} className="mb-4 block" />
            <button
                onClick={handleUpload}
                disabled={!file || loading}
                className="bg-blue-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
            >
                {loading ? "Processing..." : "Upload & Extract"}
            </button>

            {data && (
                <div className="mt-4 p-4 border rounded-lg bg-gray-50">
                    <h3 className="text-lg font-semibold">Extracted Data:</h3>
                    <pre className="text-sm">{JSON.stringify(data, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}
