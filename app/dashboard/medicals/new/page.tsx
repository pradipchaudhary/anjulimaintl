"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

interface MedicalForm {
  name: string;
  email: string;
  address: string;
  phone: string;
}

export default function AddMedical() {
  const [form, setForm] = useState<MedicalForm>({
    name: "",
    email: "",
    address: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/medicals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to add record");
      }

      await res.json();
      router.push("/dashboard/medicals");
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Error:", err.message);
        alert("Error adding medical record: " + err.message);
      } else {
        console.error("Unexpected error:", err);
        alert("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 bg-white shadow-lg rounded-2xl mt-10 max-w-3xl mx-auto border border-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Add Medical Record
      </h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Medical Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Enter full name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 
                       focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200
                       transition duration-200"
          />
        </div>

        {/* Email */}
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter email address"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 
                       focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200
                       transition duration-200"
          />
        </div>

        {/* Address */}
        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Address
          </label>
          <input
            type="text"
            name="address"
            placeholder="Enter address"
            value={form.address}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 
                       focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200
                       transition duration-200"
          />
        </div>

        {/* Phone */}
        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Phone
          </label>
          <input
            type="tel"
            name="phone"
            placeholder="Enter phone number"
            value={form.phone}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 
                       focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200
                       transition duration-200"
          />
        </div>

        {/* Submit Button */}
        <div className="col-span-1 md:col-span-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg 
                       shadow-md hover:bg-indigo-700 hover:shadow-lg 
                       transition-all duration-300 flex items-center justify-center gap-2
                       disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Saving...
              </>
            ) : (
              "Save Record"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
