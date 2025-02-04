import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Home - Anjulima International Pvt. Ltd.",
  description: "Anjulima International is a Govt. registered Recruitment Company in Nepal.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-[#0693E3] via-[#6D44E5] to-[#9B51E0] font-$[family-name:var(--font-geist-sans)]`}
      >
        {children}
      </body>
    </html>
  );
}
