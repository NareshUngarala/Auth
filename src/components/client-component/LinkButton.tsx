"use client";
import { FaThumbsUp } from "react-icons/fa";

import { useState } from "react";

type LikeButtonProps = {
  initialLikes: number;
};

export default function LikeButton({ initialLikes }: LikeButtonProps) {
  const [likes, setLikes] = useState(initialLikes);

  return (
    <button
      className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 flex items-center gap-2"
      onClick={() => setLikes(likes + 1)}
    >
      <FaThumbsUp className="text-white-500 text-xl " />
      <span>Like</span>
    </button>
  );
}
