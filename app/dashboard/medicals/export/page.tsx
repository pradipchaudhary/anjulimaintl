"use client";

import { useState, useEffect } from "react";
import * as XLSX from "xlsx";

interface Medical {
    _id: string;
    name: string;
    email: string;
    address: string;
    phone: string;
    createdAt?: string;
    updatedAt?: string;
}

export default function ExportMedical() {
    const [records, setRecords] = useState<Medical[]>([]);
    const [loading, setLoading] = useState(true);

    // Fetch medical records
    useEffect(() => {
        const fetchRecords = async () => {
            try {
                const res = await fetch("/api/medicals");
                if (!res.ok) throw new Error("Failed to fetch records");

                const data = await res.json();
                setRecords(data);
            } catch (err) {
                console.error("Error fetching records:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchRecords();
    }, []);

    // Export to Excel
    const handleExport = () => {
        if (records.length === 0) {
            alert("No records to export!");
            return;
        }

        // Convert records to worksheet
        const worksheet = XLSX.utils.json_to_sheet(records);
        const workbook = XLSX.utils.book_new();

        // Append worksheet
        XLSX.utils.book_append_sheet(workbook, worksheet, "Medicals");

        // Trigger download
        XLSX.writeFile(workbook, "medical_records.xlsx");
    };

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white shadow-md rounded-xl mt-10">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">
                Export Medical Records
            </h1>

            {loading ? (
                <p className="text-gray-600">Loading records...</p>
            ) : (
                <div>
                    <p className="text-gray-700 mb-4">
                        Total Records: <span className="font-semibold">{records.length}</span>
                    </p>

                    <button
                        onClick={handleExport}
                        className="bg-green-600 text-white font-medium px-6 py-3 rounded-lg 
                       shadow-md hover:bg-green-700 hover:shadow-lg 
                       transition-all duration-300"
                    >
                        Export to Excel
                    </button>
                </div>
            )}
        </div>
    );
}
