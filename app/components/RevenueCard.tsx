"use client";

export default function RevenueCard() {
    return (
        <div className="bg-white p-6 rounded-xl shadow flex flex-col">
            <h3 className="text-lg font-semibold mb-4">Revenue</h3>
            <p className="text-2xl font-bold">$123,940</p>
            <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                    <span>$223,940</span>
                    <span>10 deals won</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span>$63,940</span>
                    <span>3 deals lost</span>
                </div>
            </div>
        </div>
    );
}
