"use client";
import { Home, Briefcase, Settings, HelpCircle } from "lucide-react";
import Link from "next/link";

const Sidebar = () => {
    return (
        <aside className="w-60 bg-white shadow-md h-screen flex flex-col justify-between">
            <div>
                <h1 className="text-xl font-bold p-4">Plan</h1>
                <nav className="flex flex-col space-y-2 p-2">
                    <Link href="/" className="flex items-center gap-2 p-2 rounded hover:bg-gray-100">
                        <Home size={18} /> Overview
                    </Link>
                    <Link href="/deals" className="flex items-center gap-2 p-2 rounded hover:bg-gray-100">
                        <Briefcase size={18} /> Deals
                    </Link>
                    <Link href="/integration" className="flex items-center gap-2 p-2 rounded hover:bg-gray-100">
                        Integration
                    </Link>
                    <Link href="/tasks" className="flex items-center gap-2 p-2 rounded hover:bg-gray-100">
                        Tasks
                    </Link>
                </nav>
            </div>
            <div className="p-4 space-y-2">
                <Link href="/settings" className="flex items-center gap-2 p-2 rounded hover:bg-gray-100">
                    <Settings size={18} /> Settings
                </Link>
                <Link href="/help" className="flex items-center gap-2 p-2 rounded hover:bg-gray-100">
                    <HelpCircle size={18} /> Help & Support
                </Link>
            </div>
        </aside>
    );
};

export default Sidebar;
