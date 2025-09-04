"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// Define the form type
interface MedicalForm {
  sn: number | "";
  name: string;
  email: string;
  address: string;
  phone: string;
}

export default function AddMedical() {
  const [form, setForm] = useState<MedicalForm>({
    sn: "",
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
      [name]: name === "sn" ? Number(value) : value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("hello...")
    if (form.sn === "" || isNaN(form.sn)) {
      alert("SN must be a valid number");
      return;
    }

    try {
      const res = await fetch("/api/medicals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      console.log("test....")
      if (!res.ok) throw new Error("Failed to add record");

      router.push("/dashboard/medicals");
    } catch (err) {
      console.error(err);
      alert("Error adding medical record");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-8 bg-white shadow-md rounded-xl mt-10">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        Add Medical Record
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* SN */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Serial Number
          </label>
          <input
            type="number"
            name="sn"
            placeholder="Enter SN"
            value={form.sn}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 
                       focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary
                       transition duration-200"
          />
        </div>

        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Enter full name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 
                       focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary
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
                       focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary
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
                       focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary
                       transition duration-200"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone
          </label>
          <input
            type="text"
            name="phone"
            placeholder="Enter phone number"
            value={form.phone}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 
                       focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary
                       transition duration-200"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-primary text-white font-medium py-3 rounded-lg 
                     shadow-md hover:bg-secondary hover:shadow-lg 
                     transition-all duration-300"
        >
          Save Record
        </button>
      </form>
    </div>
  );
}
