"use client";
import { Search, Bell } from "lucide-react";

export default function Navbar() {
    return (
        <header className="flex justify-between items-center bg-white shadow p-4">
            <div className="flex items-center bg-gray-100 px-3 py-1 rounded">
                <Search size={18} className="text-gray-500" />
                <input
                    type="text"
                    placeholder="Search or type a command"
                    className="bg-transparent outline-none ml-2"
                />
            </div>
            <div className="flex items-center gap-4">
                <Bell className="cursor-pointer" />
                <div className="w-8 h-8 rounded-full bg-gray-300"></div>
            </div>
        </header>
    );
}
