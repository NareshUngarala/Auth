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

const SignUp = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    const data = await res.json();

    if(res.ok){
      setPending(false);

      toast.success(data.message);
      router.push("/sign-in");
    }else if (res.status === 400){
      setError(data.message);
      setPending(false);
  }else if (res.status === 500){
      setError(data.message);
      setPending(false);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#312e81] px-3">
      <Card className="w-full max-w-md backdrop-blur-md bg-white/90 dark:bg-gray-900/80 shadow-xl rounded-2xl border border-white/20 transition-all duration-300 hover:shadow-indigo-500/20">
        <CardHeader className="text-center pb-3 border-b border-gray-200/40">
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Create an Account
          </CardTitle>
          <CardDescription className="text-xs text-gray-500 ">
            Join us and get started in seconds
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
              type="text"
              disabled={pending}
              placeholder="Full Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            />
            <Input
              type="email"
              disabled={pending}
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            />
            <Input
              type="password"
              disabled={pending}
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            />
            <Input
              type="password"
              disabled={pending}
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
              required
              className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            />
            <Button 
            disabled={pending}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-lg py-2 transition-all duration-300 shadow hover:shadow-md">
              Continue
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
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="text-indigo-600 font-medium hover:underline"
            >
              Sign In
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;
