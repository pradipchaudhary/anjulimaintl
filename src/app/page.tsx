import Link from 'next/link';
import React from 'react'

const Home = () => {
    return (
        <div className="min-h-screen flex">
            {/* Left Side - Image */}
            <div className="hidden lg:flex w-1/2 bg-blue-100 items-center justify-center">
                <img
                    src="/logo.png"
                    alt="Login Illustration"
                    className="max-w-md w-full"
                />
            </div>

            {/* Right Side - Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center bg-white px-8">
                <div className="max-w-md w-full space-y-6">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
                        <p className="text-sm text-gray-500 mt-1">Login to continue</p>
                    </div>

                    <form className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                required
                                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                required
                                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="flex justify-between text-sm text-gray-500">
                            <label>
                                <input type="checkbox" className="mr-1" /> Remember me
                            </label>
                            <a href="#" className="text-blue-600 hover:underline">Forgot password?</a>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md"
                        >
                            Login
                        </button>
                    </form>

                    <p className="text-sm text-center text-gray-500">
                        Don't have an account? <a href="#" className="text-blue-600 hover:underline">Sign up</a>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Home;