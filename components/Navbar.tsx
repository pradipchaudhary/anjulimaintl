"use client";

import { Search, Bell } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Dummy user (replace with real user when auth is added later)
    const user = {
        name: "Anjulima Int",
        email: "john@example.com",
    };

    return (
        <header className="flex justify-between items-center bg-white p-4 ml-2">
            {/* Search Box */}
            <div className="flex items-center bg-gray-50 px-3 py-2 rounded w-full max-w-md border border-gray-200 ">
                <Search size={18} className="text-gray-500" />
                <input
                    type="text"
                    placeholder="Search or type a command"
                    className="bg-transparent outline-none ml-2 w-full"
                />
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4 relative">
                {/* Notifications */}
                <Bell className="cursor-pointer" />

                {/* User Info Dropdown */}
                <div className="relative" ref={dropdownRef}>
                    <button
                        className="flex items-center gap-2 focus:outline-none"
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                        <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-semibold uppercase">
                            {user.name[0]}
                        </div>
                        <span className="text-gray-700 font-medium text-sm">
                            {user.name}
                        </span>
                    </button>

                    {dropdownOpen && (
                        <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-lg z-50">
                            <Link
                                href="/settings"
                                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                onClick={() => setDropdownOpen(false)}
                            >
                                Settings
                            </Link>
                            <button
                                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                                onClick={() => alert("Logout clicked (no auth system yet)")}
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
