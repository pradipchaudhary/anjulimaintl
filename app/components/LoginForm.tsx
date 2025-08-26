"use client";

import Image from "next/image";
import { useState } from "react";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({ email, password }); // Replace with API call
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
                <div className="flex justify-center">
                    <Image
                        src="/logo.webp"
                        alt="Logo"
                        width={181}
                        height={80}
                        className="mb-2"
                    />
                </div>

                <p className="mt-2 mb-6 text-center text-gray-500">
                    Please login to your account
                </p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-2 text-gray-900 shadow-sm focus:border-black focus:ring-1 focus:ring-black"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-2 text-gray-900 shadow-sm focus:border-black focus:ring-1 focus:ring-black"
                        />
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        className="w-full rounded-xl bg-black px-4 py-2 font-medium text-white shadow-md hover:bg-gray-800 transition"
                    >
                        Login
                    </button>
                </form>

                {/* Extra */}
                <p className="mt-6 text-center text-sm text-gray-500">
                    Don’t have an account?{" "}
                    <a href="/register" className="font-medium text-black hover:underline">
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    );
}
