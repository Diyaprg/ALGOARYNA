import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Code2, Users, Trophy } from "lucide-react";
import HeroSection from "@/components/hero";
import FeatureSection from "@/components/features";
import BottomCTA from "@/components/bottom-cta";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#0A0A0F] text-white overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-blue-600/10 blur-[100px] rounded-full -z-10" />
      <HeroSection />
      <FeatureSection />
      <BottomCTA />
    </main>
  );
}
