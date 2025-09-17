import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

type DashboardLayoutProps = {
    children: ReactNode;
};

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar - fixed height */}
            <aside className="bg-white shadow-lg w-64 flex-shrink-0 h-screen">
                <Sidebar />
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Navbar */}
                <header className="sticky top-0 z-20 bg-white shadow-sm flex-shrink-0">
                    <Navbar />
                </header>

                {/* Scrollable Page Content */}
                <main className="flex-1 p-6 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    );
};

export { DashboardLayout };
