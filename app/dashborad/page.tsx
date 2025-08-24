// app/dashboard/page.tsx
"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  ClipboardList,
  Settings,
  LogOut,
} from "lucide-react";

export default function DashboardPage() {
  const [active, setActive] = useState("Dashboard");

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg flex flex-col">
        <div className="p-4 text-2xl font-bold text-indigo-600 border-b">
          ManpowerMS
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => setActive("Dashboard")}
            className={`flex items-center gap-3 w-full rounded-lg px-3 py-2 text-left ${
              active === "Dashboard"
                ? "bg-indigo-100 text-indigo-600 font-medium"
                : "hover:bg-gray-100"
            }`}
          >
            <LayoutDashboard size={18} /> Dashboard
          </button>
          <button
            onClick={() => setActive("Employees")}
            className={`flex items-center gap-3 w-full rounded-lg px-3 py-2 text-left ${
              active === "Employees"
                ? "bg-indigo-100 text-indigo-600 font-medium"
                : "hover:bg-gray-100"
            }`}
          >
            <Users size={18} /> Employees
          </button>
          <button
            onClick={() => setActive("Tasks")}
            className={`flex items-center gap-3 w-full rounded-lg px-3 py-2 text-left ${
              active === "Tasks"
                ? "bg-indigo-100 text-indigo-600 font-medium"
                : "hover:bg-gray-100"
            }`}
          >
            <ClipboardList size={18} /> Tasks
          </button>
          <button
            onClick={() => setActive("Settings")}
            className={`flex items-center gap-3 w-full rounded-lg px-3 py-2 text-left ${
              active === "Settings"
                ? "bg-indigo-100 text-indigo-600 font-medium"
                : "hover:bg-gray-100"
            }`}
          >
            <Settings size={18} /> Settings
          </button>
        </nav>
        <div className="p-4 border-t">
          <button className="flex items-center gap-2 text-red-500 hover:text-red-600">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">{active}</h1>

        {/* Dashboard Overview */}
        {active === "Dashboard" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white shadow rounded-xl p-6">
              <h2 className="text-gray-500 text-sm">Total Employees</h2>
              <p className="text-3xl font-bold text-indigo-600">128</p>
            </div>
            <div className="bg-white shadow rounded-xl p-6">
              <h2 className="text-gray-500 text-sm">Active Projects</h2>
              <p className="text-3xl font-bold text-green-600">12</p>
            </div>
            <div className="bg-white shadow rounded-xl p-6">
              <h2 className="text-gray-500 text-sm">Pending Tasks</h2>
              <p className="text-3xl font-bold text-red-600">34</p>
            </div>
          </div>
        )}

        {/* Employees Table */}
        {active === "Employees" && (
          <div className="bg-white shadow rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4">Employee List</h2>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="p-2">Name</th>
                  <th className="p-2">Position</th>
                  <th className="p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-2">John Doe</td>
                  <td className="p-2">Manager</td>
                  <td className="p-2 text-green-600">Active</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">Jane Smith</td>
                  <td className="p-2">HR</td>
                  <td className="p-2 text-yellow-600">On Leave</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* Tasks */}
        {active === "Tasks" && (
          <div className="bg-white shadow rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4">Pending Tasks</h2>
            <ul className="space-y-2">
              <li className="p-3 rounded-lg bg-gray-50 border">Prepare payroll</li>
              <li className="p-3 rounded-lg bg-gray-50 border">Interview new candidates</li>
              <li className="p-3 rounded-lg bg-gray-50 border">Team meeting</li>
            </ul>
          </div>
        )}

        {/* Settings */}
        {active === "Settings" && (
          <div className="bg-white shadow rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4">Settings</h2>
            <p className="text-gray-500">System settings can be managed here.</p>
          </div>
        )}
      </main>
    </div>
  );
}
