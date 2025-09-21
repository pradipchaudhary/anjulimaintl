"use client";

import { Home, UsersRound, Settings, HelpCircle, Hospital, PlaneTakeoff, ClipboardList } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation"; // for active link

const Sidebar = () => {
    const pathname = usePathname(); // get current path

    const navItems = [
        { name: "Overview", href: "/dashboard", icon: <Home size={18} /> },
        { name: "Candidates", href: "/dashboard/candidates", icon: <UsersRound size={18} /> },
        { name: "Medicals", href: "/dashboard/medicals", icon: <Hospital size={18} /> },
        { name: "Flights", href: "/dashboard/flights", icon: <PlaneTakeoff size={18} /> },
        { name: "Companies", href: "/dashboard/companies", icon: <UsersRound size={18} /> },
    ];

    const bottomItems = [
        { name: "Settings", href: "/dashboard/settings", icon: <Settings size={18} /> },
        { name: "Help & Support", href: "/help", icon: <HelpCircle size={18} /> },
    ];

    return (
        <aside className="w-64 bg-white shadow-md h-screen flex flex-col justify-between">
            {/* Top Section */}
            <div>
                {/* Logo */}
                <div className="flex items-center p-4  border-gray-200">
                    <Image
                        src="/logo.jpg"
                        alt="Logo"
                        width={170}
                        height={80}
                        priority
                    // className="h-auto w-auto"
                    />
                </div>

                {/* Navigation */}
                <nav className="flex flex-col mt-4">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 p-3 mx-2 rounded-lg hover:bg-gray-100 transition
                ${pathname === item.href ? "bg-indigo-50 text-indigo-600 font-semibold" : "text-gray-700"}`}
                        >
                            {item.icon} <span className="text-sm">{item.name}</span>
                        </Link>
                    ))}
                </nav>
            </div>

            {/* Bottom Section */}
            <div className="p-4 border-t border-gray-200">
                {bottomItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center gap-3 p-2 rounded hover:bg-gray-100 transition
              ${pathname === item.href ? "bg-indigo-50 text-indigo-600 font-semibold" : "text-gray-700"}`}
                    >
                        {item.icon} <span className="text-sm">{item.name}</span>
                    </Link>
                ))}
            </div>
        </aside>
    );
};

export default Sidebar;
