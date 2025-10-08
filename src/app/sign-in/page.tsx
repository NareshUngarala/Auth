"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { TriangleAlert } from "lucide-react";
import { signIn } from "next-auth/react";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);
    setError(null);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
        setPending(false);
        toast.error(result.error);
      } else if (result?.ok) {
        toast.success("Signed in successfully!");
        router.push("/");
      }
    } catch (err) {
      console.error("Sign in error:", err);
      setError("An unexpected error occurred");
      setPending(false);
      toast.error("An unexpected error occurred");
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#312e81] px-3">
      <Card className="w-full max-w-md backdrop-blur-md bg-white/90 dark:bg-gray-900/80 shadow-xl rounded-2xl border border-white/20 transition-all duration-300 hover:shadow-indigo-500/20">
        <CardHeader className="text-center pb-3 border-b border-gray-200/40">
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-xs text-gray-500 ">
            Sign in to your account to continue
          </CardDescription>
        </CardHeader>
        
        {!!error && 
        <div className="flex items-center justify-center gap-2 text-red-500 bg-white border border-gray-300 p-2 m-2 rounded-md">
          <TriangleAlert />
          <p>{error}</p>
          </div>}

        <CardContent className="p-5 space-y-4">
          <form  onSubmit={handleSubmit} className="space-y-3">
            <Input
              type="email"
              disabled={pending}
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            />
            <Input
              type="password"
              disabled={pending}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            />
            <Button 
            disabled={pending}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-lg py-2 transition-all duration-300 shadow hover:shadow-md">
              {pending ? "Signing in..." : "Continue"}
            </Button>
          </form>

          {/* Separator */}
          <div className="relative flex items-center justify-center my-3">
            <div className="w-1/5 border-t border-gray-300/50"></div>
            <span className="mx-2 text-xs text-gray-500 uppercase bg-white/90 dark:bg-gray-900/80 px-1">
              or
            </span>
            <div className="w-1/5 border-t border-gray-300/50"></div>
          </div>

          {/* OAuth Buttons */}
          <div className="flex justify-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2 border-gray-300 bg-white hover:bg-gray-50 rounded-lg shadow-sm transition-all"
            >
              <FcGoogle className="text-lg" />
              Google
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2 border-gray-300 bg-white hover:bg-gray-50 rounded-lg shadow-sm transition-all"
            >
              <FaGithub className="text-lg text-gray-800" />
              GitHub
            </Button>
          </div>

          <p className="text-center text-xs text-gray-600 mt-4">
            Don&apos;t have an account?{" "}
            <Link
              href="/sign-up"
              className="text-indigo-600 font-medium hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignIn;
