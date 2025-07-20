// pages/index.tsx or app/page.tsx (for Next.js)
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

const LoginPage = () => {
    return (
        <main className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white shadow-md rounded-xl p-8 space-y-6">
                {/* Logo or Title */}
                <div className="text-center">
                    <Image src="/logo.png" alt="Logo" width={200} height={200} className="w-20 h-20 mx-auto mb-3" />
                    <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
                    <p className="text-sm text-gray-500 mt-1">Please login to your account</p>
                </div>

                {/* Login Form */}
                <form className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email address
                        </label>
                        <input
                            type="email"
                            id="email"
                            required
                            placeholder="you@example.com"
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            required
                            placeholder="••••••••"
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-600">
                        <label className="flex items-center">
                            <input type="checkbox" className="mr-2" />
                            Remember me
                        </label>
                        <Link href="#" className="text-blue-600 hover:underline">
                            Forgot password?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
                    >
                        Login
                    </button>
                </form>

                {/* Signup Link */}
                <p className="text-center text-sm text-gray-500">
                    Don&apos;t have an account?{' '}
                    <Link href="#" className="text-blue-600 hover:underline">
                        Sign up
                    </Link>
                </p>
            </div>
        </main>
    )
}

export default LoginPage
