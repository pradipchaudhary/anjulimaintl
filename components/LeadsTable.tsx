"use client";

const leads = [
    {
        name: "Helen Cooper",
        email: "helen123@email.com",
        phone: "(201) 543-5335",
        status: "In Progress",
    },
    {
        name: "William Dose",
        email: "william@gmail.com",
        phone: "(201) 321-3310",
        status: "Closed",
    },
];

export default function LeadsTable() {
    return (
        <div>
            <h3 className="text-lg font-semibold mb-4">Recent Leads</h3>
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b">
                        <th className="p-2">Name</th>
                        <th className="p-2">Contact</th>
                        <th className="p-2">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {leads.map((lead, idx) => (
                        <tr key={idx} className="border-b hover:bg-gray-50">
                            <td className="p-2">{lead.name}</td>
                            <td className="p-2">
                                <p>{lead.email}</p>
                                <p className="text-gray-500">{lead.phone}</p>
                            </td>
                            <td className="p-2">
                                <span
                                    className={`px-2 py-1 text-sm rounded ${lead.status === "In Progress"
                                        ? "bg-green-100 text-green-700"
                                        : "bg-yellow-100 text-yellow-700"
                                        }`}
                                >
                                    {lead.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
