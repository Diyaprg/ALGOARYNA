"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-[#0A0A0F] relative overflow-hidden font-sans">
      {/* Background Decorative Glows */}
      <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-purple-600/10 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-blue-600/10 blur-[120px] rounded-full -z-10" />

      <Card className="w-full max-w-md bg-[#12121A] border-white/10 shadow-2xl relative z-10">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold text-white tracking-tight text-center">
            Join the Arena
          </CardTitle>
          <CardDescription className="text-gray-400 text-center">
            Create an account to start competing
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-300 font-medium">
                Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Ex: John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-purple-500 focus:ring-purple-500 rounded-xl h-12 transition-all"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-300 font-medium">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Ex: example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-purple-500 focus:ring-purple-500 rounded-xl h-12 transition-all"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-300 font-medium">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="********"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-purple-500 focus:ring-purple-500 rounded-xl h-12 transition-all"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 pt-2">
            <Button
              className="w-full h-12 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold shadow-lg shadow-purple-500/20 transition-all hover:-translate-y-0.5 active:translate-y-0"
              type="submit"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </Button>
            <p className="text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold text-purple-400 hover:text-purple-300 transition-colors"
              >
                Login
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}