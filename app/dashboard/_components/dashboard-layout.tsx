import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

type DashboardLayoutProps = {
    children: ReactNode;
};

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
    return (
        <div className="flex">
            {/* Sidebar (Fixed) */}
            <aside className="fixed top-0 left-0 h-screen w-64 bg-white shadow-lg">
                <Sidebar />
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 ml-64 flex flex-col min-h-screen overflow-hidden">
                {/* Navbar (Fixed) */}
                <header className="fixed top-0 left-64 right-0 h-16">
                    <Navbar />
                </header>

                {/* Scrollable Page Content */}
                <main className="flex-1 mt-16 p-6">
                    {children}
                </main>
            </div>
        </div>
    );
};

export { DashboardLayout };
