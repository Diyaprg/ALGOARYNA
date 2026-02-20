import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative max-w-7xl mx-auto px-6 pt-24 pb-20 grid lg:grid-cols-2 gap-12 items-center">
      <div className="absolute top-0 left-0 w-125 h-125 bg-purple-600/10 blur-[120px] rounded-full -z-10" />

      <div className="z-10">
        <h1 className="text-6xl md:text-7xl font-bold tracking-tighter mb-12 leading-[0.9]">
          Code. <span className="text-purple-500">Compete.</span> <br />{" "}
          Improve.
        </h1>

        <p className="text-gray-400 text-lg md:text-xl mb-10 max-w-lg leading-relaxed">
          The premium arena for elite developers. Create private contests, solve
          complex algorithms, and climb the leaderboard in real-time.
        </p>

        <div className="flex flex-wrap gap-4">
          <Link href="/signup">
            <Button
              size="lg"
              className="bg-[#7c5cff] cursor-pointer hover:bg-[#6a4ce0] hover:shadow-[0_0_25px_rgba(124,92,255,0.5)] text-white rounded-xl px-8 h-14 text-base font-bold gap-2 group transition-all"
            >
              Get Started
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Button>
          </Link>
        </div>

        <div className="mt-12 flex items-center gap-6 text-xs text-gray-500 font-mono">
          <span className="flex gap-3">
            <span className="opacity-50">&lt;&gt;</span> C++ / Python / Java /
            Go
          </span>
        </div>
      </div>

      <div className="relative z-10 lg:ml-auto w-full max-w-150">
        <div className="absolute -inset-4 bg-linear-to-tr from-purple-600/20 to-blue-500/20 rounded-3xl blur-2xl opacity-50" />

        <div className="relative rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
          <Image
            src="/Visual_Assets/code_preview.png"
            alt="Code Editor Preview"
            width={600}
            height={400}
            priority
            className="w-full pt-14 h-auto object-cover"
          />
        </div>
      </div>
    </section>
  );
}
