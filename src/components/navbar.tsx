"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-[#0A0A0F]/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="flex h-8 w-8 items-center justify-center rounded font-mono text-lg font-bold text-white bg-linear-to-br from-[#7c5cff] to-purple-600 transition-transform duration-300 group-hover:scale-105">
              {"</>"}
            </div>

            <span className="text-xl font-bold tracking-tight text-white">
              AlgoAryna
            </span>
          </Link>
          <div className="flex items-center space-x-3">
            <Link href="/login">
              <Button
                variant="ghost"
                className="text-white/90 cursor-pointer hover:text-[#7c5cff] hover:bg-transparent"
              >
                Log In
              </Button>
            </Link>

            <Link href="/signup">
              <Button className="bg-[#7c5cff] text-white cursor-pointer hover:bg-[#6a4ce0] shadow-[0_0_15px_rgba(124,92,255,0.3)] hover:shadow-[0_0_25px_rgba(124,92,255,0.5)] transition-all">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
