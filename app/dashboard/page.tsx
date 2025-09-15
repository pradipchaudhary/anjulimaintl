"use client";


import { Users, Briefcase, ClipboardList, CheckCircle2, AlertCircle, Building2 } from "lucide-react";

export default function Dashboard() {
    const stats = [
        { name: "Active Candidates", value: 225, icon: Users, color: "bg-blue-100 text-blue-600" },
        { name: "Total Visas", value: 120, icon: Briefcase, color: "bg-green-100 text-green-600" },
        { name: "Active Visas", value: 80, icon: ClipboardList, color: "bg-yellow-100 text-yellow-600" },
        { name: "Medical Passed", value: 200, icon: CheckCircle2, color: "bg-emerald-100 text-emerald-600" },
        { name: "Pending Candidates", value: 50, icon: AlertCircle, color: "bg-red-100 text-red-600" },
        { name: "Companies", value: 12, icon: Building2, color: "bg-purple-100 text-purple-600" },
    ];

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Dashboard</h1>

            {/* KPI Cards */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {stats.map((item) => (
                    <div
                        key={item.name}
                        className="bg-white shadow rounded-xl p-6 flex items-center gap-4 hover:shadow-md transition"
                    >
                        <div className={`p-3 rounded-full ${item.color}`}>
                            <item.icon className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-gray-500">{item.name}</p>
                            <h3 className="text-2xl font-bold">{item.value}</h3>
                        </div>
                    </div>
                ))}
            </section>

            {/* Recent Activity (Optional) */}
            <section className="bg-white shadow rounded-xl p-6">
                <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
                <ul className="space-y-3 text-sm text-gray-600">
                    <li>✅ Candidate <span className="font-semibold">Ram Bahadur</span> passed medical</li>
                    <li>📄 Visa <span className="font-semibold">LT-2025-001</span> added for Global Manpower</li>
                    <li>🏢 New Company <span className="font-semibold">Sky Overseas</span> registered</li>
                </ul>
            </section>

        </div>
    </div>
  );
}
