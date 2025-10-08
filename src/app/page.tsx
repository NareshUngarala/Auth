import Navbar from "@/components/navbar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import Link from "next/link";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#312e81]">
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-6">
            Welcome to AuthApp
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            A modern authentication system built with Next.js, NextAuth, and MongoDB.
          </p>
          <div className="flex items-center justify-center gap-4">
            <a
              href="/sign-up"
              className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Get Started
            </a>
            <a
              href="/sign-in"
              className="px-8 py-3 border border-white/20 hover:bg-white/10 text-white font-semibold rounded-lg transition-all duration-300"
            >
              Learn More
            </a>
          </div>
        </div>

        {/* Section Cards */}
        <div className="w-full max-w-4xl mt-8">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">
            Explore Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/pages/cs-post-app" className="group">
              <Card className="h-full bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 hover:border-indigo-400/50 transition-all duration-300 cursor-pointer transform hover:scale-105 hover:shadow-2xl hover:shadow-indigo-500/20">
                <CardHeader>
                  <CardTitle className="text-2xl text-white group-hover:text-indigo-300 transition-colors">
                    Post App
                  </CardTitle>
                  <CardDescription className="text-gray-400 group-hover:text-gray-300 transition-colors">
                    Create and manage posts
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 text-sm">
                  Explored Server & Client Components in Next.js
                  Built a small app with Create and Manage buttons to understand how server-side rendering and client-side interactivity work together.
                  </p>
                  <div className="mt-4 flex items-center text-indigo-400 group-hover:text-indigo-300 font-semibold">
                    <span>Open App</span>
                    <svg 
                      className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;