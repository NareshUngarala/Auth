"use client";
import { FaThumbsUp } from "react-icons/fa";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaPlus, FaTimes } from "react-icons/fa";

type Post = {
  _id: string;
  title: string;
  likes: number;
  createdAt?: string;
  updatedAt?: string;
};

type PostManagerProps = {
  initialPosts: Post[];
};

export default function PostManager({ initialPosts }: PostManagerProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState("");

  // 🔹 Fetch posts from API on mount
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/posts");
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  // 🔹 Create new post via API
  const handleCreatePost = async () => {
    if (newPostTitle.trim() === "") return;

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newPostTitle }),
      });

      if (!res.ok) throw new Error("Failed to create post");

      const newPost = await res.json();
      setPosts((prev) => [newPost, ...prev]);
      setNewPostTitle("");
      setIsFormOpen(false);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  // 🔹 Delete post via API
  const handleDeletePost = async (id: string) => {
    try {
      const res = await fetch(`/api/posts/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete post");
      
      setPosts(posts.filter((post) => post._id !== id));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  // 🔹 Like a post via API
  const handleLikePost = async (id: string) => {
    try {
      const res = await fetch(`/api/posts/${id}`, { method: "PATCH" });
      if (!res.ok) throw new Error("Failed to like post");
      const updated = await res.json();

      setPosts((prev) =>
        prev.map((p) => (p._id === id ? { ...p, likes: updated.likes } : p))
      );
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  return (
    <div className="space-y-6">
      {/* 🔹 Create Post Button */}
      <div className="flex justify-center">
        <Button
          onClick={() => setIsFormOpen(!isFormOpen)}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-2"
        >
          {isFormOpen ? (
            <>
              <FaTimes className="text-lg" />
              <span>Cancel</span>
            </>
          ) : (
            <>
              <FaPlus className="text-lg" />
              <span>Create New Post</span>
            </>
          )}
        </Button>
      </div>

      {/* 🔹 Create Post Form */}
      {isFormOpen && (
        <Card className="bg-white/10 backdrop-blur-sm border-indigo-400/50 shadow-2xl shadow-indigo-500/20 max-w-2xl mx-auto">
          <CardContent className="p-6">
            <h3 className="text-2xl font-semibold text-white mb-4">
              Create New Post
            </h3>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="postTitle"
                  className="block text-gray-300 mb-2 font-medium"
                >
                  Post Title
                </label>
                <Input
                  id="postTitle"
                  type="text"
                  placeholder="Enter your post title..."
                  value={newPostTitle}
                  onChange={(e) => setNewPostTitle(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleCreatePost()}
                  className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-indigo-400 focus:ring-indigo-400"
                />
              </div>
              <div className="flex gap-3 justify-end">
                <Button
                  onClick={() => {
                    setIsFormOpen(false);
                    setNewPostTitle("");
                  }}
                  variant="outline"
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleCreatePost}
                  disabled={newPostTitle.trim() === ""}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Create Post
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 🔹 Posts List */}
      {posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">
            No posts yet. Create your first post!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <Card
              key={post._id}
              className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 hover:border-indigo-400/50 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/20 hover:scale-[1.02]"
            >
              <CardContent className="p-6">
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-400 text-sm">
                        {post.createdAt && new Date(post.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDeletePost(post._id)}
                      className="text-red-400 hover:text-red-300 transition-colors p-2 hover:bg-red-500/10 rounded-lg"
                      title="Delete post"
                    >
                      <FaTimes className="text-lg" />
                    </button>
                  </div>
                  <div className="flex justify-start">
                    <button
                      onClick={() => handleLikePost(post._id)}
                      className="text-indigo-400 hover:text-indigo-300 text-sm transition"
                    >
                      <FaThumbsUp />  {post.likes} Likes
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
