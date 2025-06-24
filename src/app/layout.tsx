import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import React from "react";
import Footer from "../components/Footer";
import Header from '../components/Header';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Juvo PDF Processing",
  description: "Professional PDF processing solution by Juvo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-full flex flex-col bg-gradient-to-b from-anti-flash-white to-lace-cap`}
      >
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow relative isolate">
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/5 to-transparent"></div>
            {children}
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white/5 to-transparent"></div>
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
