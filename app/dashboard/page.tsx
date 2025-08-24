import Chart from "@/app/components/Chart";
import LeadsTable from "@/app/components/LeadsTable";
import RevenueCard from "@/app/components/RevenueCard";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <section className="bg-white shadow rounded-xl p-6">
        <h2 className="text-lg font-semibold">Performance This Month</h2>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <p className="text-gray-500">Total Amount</p>
            <h3 className="text-2xl font-bold">$225,001.10</h3>
          </div>
          <div>
            <p className="text-gray-500">Total Deals</p>
            <h3 className="text-2xl font-bold">102</h3>
          </div>
        </div>
        <Chart />
      </section>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 bg-white p-6 rounded-xl shadow">
          <LeadsTable />
        </div>
        <RevenueCard />
      </div>
    </div>
  );
}
