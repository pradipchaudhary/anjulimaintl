import VisasTable from "./VisasTable";

export default function VisaPage() {
    return (
        <div className="p-4 lg:p-8">
            {/* Header Section */}
            <header className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 gap-4 lg:gap-0">
                {/* Title */}
                <div>
                    <h1 className="text-[#101828] text-3xl font-semibold">Visas Overview</h1>
                    <p className="text-[#475467] text-sm mt-1 mb-6">
                        Manage visas and their related information
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full lg:w-auto">
                    <button className="bg-primary border border-primary text-white font-semibold py-2.5 px-5 rounded-lg w-full sm:w-auto hover:bg-blue-700 transition-colors">
                        Add New Visa
                    </button>
                    <button className="bg-white border border-[#7ECAFB] shadow-sm text-[#045DA0] font-semibold py-2.5 px-5 rounded-lg flex items-center justify-center gap-1.5 w-full sm:w-auto hover:bg-[#f0faff] transition-colors">
                        Export all
                    </button>
                </div>
            </header>

            {/* Visas Table Section */}
            <section className="overflow-x-auto">
                <VisasTable />
            </section>
        </div>
    );
}
