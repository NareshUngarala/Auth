import LikeButton from "@/components/client-component/LinkButton";
import { Card, CardContent } from "@/components/ui/card";

type Post = {
  id: number;
  title: string;
  likes: number;
};

// Mock fetch function
async function fetchPosts(): Promise<Post[]> {
  return [
    { id: 1, title: "Learn Next.js Server Components", likes: 2 },
    { id: 2, title: "Build a full-stack app", likes: 5 },

  ];
}

export default async function PostList() {
  const posts = await fetchPosts(); // Server-side fetch

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {posts.map((post) => (
        <Card
          key={post.id}
          className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 hover:border-indigo-400/50 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/20 hover:scale-[1.02]"
        >
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-white mb-2">
                  {post.title}
                </h3>
                <p className="text-gray-400 text-sm">
                  Post #{post.id}
                </p>
              </div>
              <div className="flex-shrink-0">
                <LikeButton initialLikes={post.likes} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
