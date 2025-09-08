"use client";

import { useEffect, useState } from "react";
import { Building2, FileBadge, Users } from "lucide-react"; // ✅ icons

// Define the shape of the response from the API
interface MedicalCountResponse {
  total: number;
}

export default function Dashboard() {
  const [totalMedical, setTotalMedical] = useState<number | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/medicals/count");
        if (!res.ok) {
          throw new Error("Failed to fetch medical center count");
        }

        const data: MedicalCountResponse = await res.json();
        setTotalMedical(data.total);
      } catch (err) {
        console.error("Error fetching total medical centers:", err);
        setTotalMedical(0); // fallback value
      }
    }

    fetchData();
  }, []);

  return (
    <div className="space-y-6">
      <section className="bg-white shadow rounded-2xl p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          📊 Dashboard Overview
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* ✅ Total Medical Centers */}
          <div className="bg-gradient-to-r from-blue-100 to-blue-200 p-6 rounded-2xl shadow flex items-center gap-4">
            <div className="bg-blue-500 text-white p-3 rounded-xl">
              <Building2 size={28} />
            </div>
            <div>
              <h3 className="text-sm text-gray-600 font-medium">
                Total Medical Centers
              </h3>
              <p className="text-3xl font-bold text-blue-700">
                {totalMedical !== null ? totalMedical : "Loading..."}
              </p>
            </div>
          </div>

          {/* 🟢 Total Active Visas */}
          <div className="bg-gradient-to-r from-green-100 to-green-200 p-6 rounded-2xl shadow flex items-center gap-4">
            <div className="bg-green-500 text-white p-3 rounded-xl">
              <FileBadge size={28} />
            </div>
            <div>
              <h3 className="text-sm text-gray-600 font-medium">
                Total Active Visas
              </h3>
              <p className="text-3xl font-bold text-green-700">42</p>
            </div>
          </div>

          {/* 🟡 Total Candidates */}
          <div className="bg-gradient-to-r from-yellow-100 to-yellow-200 p-6 rounded-2xl shadow flex items-center gap-4">
            <div className="bg-yellow-500 text-white p-3 rounded-xl">
              <Users size={28} />
            </div>
            <div>
              <h3 className="text-sm text-gray-600 font-medium">
                Total Candidates
              </h3>
              <p className="text-3xl font-bold text-yellow-700">120</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
