// pages/api/posts/like.js

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import { connectDB } from "@/lib/mongoDB";
import { Post } from "@/lib/model/post";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ message: "Unauthorized" });

  const userId = session.user.id;
  const { postId } = req.body;

  if (!postId) {
    return res.status(400).json({ message: "Post ID is required" });
  }

  await connectDB();

  try {
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const alreadyLiked = post.likes.includes(userId);

    if (alreadyLiked) {
      post.likes = post.likes.filter(id => id.toString() !== userId);
    } else {
      post.likes.push(userId);
    }

    await post.save();
    await post.populate("likes", "first_name last_name email _id");
    res.status(200).json({ success: true, liked: !alreadyLiked, likes: post.likes.length,likedUser:post.likes });
  } catch (error) {
    console.error("Error liking post:", error);
    res.status(500).json({ message: "Server error" });
  }
}
