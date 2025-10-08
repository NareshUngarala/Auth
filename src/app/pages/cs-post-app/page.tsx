import Navbar from "@/components/navbar";
import PostManager from "@/components/client-component/PostManager";

export default function PostApp() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#312e81]">
            <Navbar />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="mb-12 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-4">
                        Post Application
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Create, view, and manage your posts with an intuitive interface
                    </p>
                </div>
                <PostManager initialPosts={[]} />
            </main>
        </div>
    )
}
