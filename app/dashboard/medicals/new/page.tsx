"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// Define the form type
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

      await res.json(); // wait for response
      router.push("/dashboard/medicals"); // redirect
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Error:", err.message);
        alert("Error adding medical record: " + err.message);
      } else {
        console.error("Unexpected error:", err);
        alert("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="max-w-xl mx-auto p-8 bg-white shadow-md rounded-xl mt-10">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        Add Medical Record
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Medical Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Enter full name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 
                       focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500
                       transition duration-200"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter email address"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 
                       focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500
                       transition duration-200"
          />
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Address
          </label>
          <input
            type="text"
            name="address"
            placeholder="Enter address"
            value={form.address}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 
                       focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500
                       transition duration-200"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone
          </label>
          <input
            type="tel"
            name="phone"
            placeholder="Enter phone number"
            value={form.phone}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 
                       focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500
                       transition duration-200"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white font-medium py-3 rounded-lg 
                     shadow-md hover:bg-indigo-700 hover:shadow-lg 
                     transition-all duration-300"
        >
          Save Record
        </button>
      </form>
    </div>
  );
}
