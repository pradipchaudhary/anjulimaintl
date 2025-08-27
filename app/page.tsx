// app/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { signIn } from "next-auth/react";

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError(result.error);
    } else {
      router.push("/dashboard"); // after successful login, send to dashboard
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <Image
            src="/logo.webp"
            alt="Logo"
            width={181}
            height={80}
            priority   // 👈 fixes LCP warning
            className="mb-2 h-auto w-auto"  // 👈 fixes aspect ratio warning
          />
          {/* <h1 className="text-3xl font-bold text-center text-indigo-600">
            Welcome to Anjulima Int
          </h1> */}

          <p className="mt-2 mb-6 text-center text-gray-500">
            Please login to your account
          </p>
        </div>

        {error && (
          <div className="bg-red-100 text-red-700 p-2 rounded mb-4 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-gray-600 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-600 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-500 text-center">
          Forgot your password?{" "}
          <a href="#" className="text-indigo-600 hover:underline">
            Reset
          </a>
        </p>
      </div>
    </div>
  );
}
