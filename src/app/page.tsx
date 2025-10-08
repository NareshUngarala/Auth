import Navbar from "@/components/navbar";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#312e81]">
      <Navbar />
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-4">
        <div className="text-center">
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
      </div>
    </div>
  );
}

export default Home;