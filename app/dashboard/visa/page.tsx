import VisasTable from "./VisasTable";


export default function VisaPage() {
    return (
        <div>
            <h1 className="text-[#101828] text-3xl font-semibold">Visas Overview</h1>
            <p className="text-[#475467] text-sm mt-1 mb-6">Manage visas and their related information</p>
            <section>
                <div className="flex gap-4">
                    <button className="bg-primary border border-primary text-white font-semibold py-2.5 px-[18px] rounded-[10px] btn-add w-full lg:w-fit">Add New Visa</button>
                    <button className="bg-white border border-[#7ECAFB] shadow-sm text-[#045DA0] font-semibold py-2.5 px-[18px] rounded-[10px] flex gap-1.5 items-center justify-center w-full lg:w-fit">Export all</button>
                </div>
                <VisasTable />
            </section>
        </div >
    );
}