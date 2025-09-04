"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main className="flex h-screen flex-col items-center justify-center px-6 text-center">
      {/* Title with Logo */}
      <div className="flex flex-col items-center gap-4 mb-10">
        <Image
          src="/logo.jpg" // ✅ Replace with your logo in /public
          alt="Anjulima Logo"
          width={225}
          height={72}
        />


      </div>

      {/* Go to Dashboard Button */}
      <Link
        href="/dashboard"
        className="group flex items-center justify-center gap-2 
                   bg-primary text-white font-medium 
                   px-5 py-2.5 text-sm rounded-md shadow 
                   transition-all duration-300 
                   hover:bg-secondary hover:shadow-lg hover:scale-105"
      >
        Go to Dashboard
        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
      </Link>

    </main>
  );
}
