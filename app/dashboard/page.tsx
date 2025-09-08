"use client";

import { useEffect, useState } from "react";

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
      <section className="bg-white shadow rounded-xl p-6">
        <h2 className="text-lg font-semibold">Dashboard Overview</h2>

        <div className="grid grid-cols-3 gap-6 mt-4">
          {/* ✅ Total Medical Centers */}
          <div className="bg-blue-100 p-4 rounded-xl shadow">
            <h3 className="text-md font-medium">Total Medical Centers</h3>
            <p className="text-2xl font-bold text-blue-700">
              {totalMedical !== null ? totalMedical : "Loading..."}
            </p>
          </div>

          {/* 🟢 Placeholder for Active Visa */}
          {/* <div className="bg-green-100 p-4 rounded-xl shadow">
            <h3 className="text-md font-medium">Total Active Visas</h3>
            <p className="text-2xl font-bold text-green-700">42</p>
          </div> */}

          {/* 🟢 Placeholder for Candidates */}
          {/* <div className="bg-yellow-100 p-4 rounded-xl shadow">
            <h3 className="text-md font-medium">Total Candidates</h3>
            <p className="text-2xl font-bold text-yellow-700">120</p>
          </div> */}
        </div>
      </section>
    </div>
  );
}
