import Link from 'next/link';
import React from 'react'

const Home = () => {
    return (
        <div class="flex h-screen">
            <!-- Left Section (Welcome / Image / Branding) -->
            <div class="w-1/2 bg-blue-600 text-white flex items-center justify-center p-10">
              <div class="text-center">
                <h1 class="text-4xl font-bold mb-4">Welcome to</h1>
                <h2 class="text-3xl font-semibold mb-6">Manpower Management System</h2>
                <p class="text-lg leading-relaxed">
                  Efficiently manage your workforce, monitor performance, and streamline recruitment with ease.
                </p>
              </div>
            </div>

             <!-- Right Section (Login Form) -->
            <div class="w-1/2 flex items-center justify-center p-10">
              <div class="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
                <h2 class="text-2xl font-bold text-gray-700 mb-6">Login to Your Account</h2>
                <form class="space-y-5">
                  <div>
                    <label for="email" class="block text-gray-600 font-medium mb-1">Email</label>
                    <input type="email" id="email" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                  </div>
                  <div>
                    <label for="password" class="block text-gray-600 font-medium mb-1">Password</label>
                    <input type="password" id="password" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                  </div>
                  <div class="flex items-center justify-between">
                    <label class="flex items-center text-sm">
                      <input type="checkbox" class="mr-2" />
                      Remember me
                    </label>
                    <a href="#" class="text-blue-600 text-sm hover:underline">Forgot password?</a>
                  </div>
                  <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-200">
                    Login
                  </button>
                </form>
              </div>
            </div>
        </div>
    )
}

export default Home;
