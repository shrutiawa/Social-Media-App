import { connectDB } from "@/lib/mongoDB";
import { Post } from "@/lib/model/post";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  await connectDB();

  if (req.method === "POST") {
    const { userId, content, image } = req.body;

    if (!userId || !content) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const newPost = new Post({
      user: userId,
      content,
      image,
    });

    await newPost.save();
    res.status(201).json({ message: "Post created successfully", post: newPost });
  }

  if (req.method === "GET") {
    try {
      const posts = await Post.find({})
        .populate("user", "first_name last_name email").populate("likes", "first_name last_name _id")
        .sort({ createdAt: -1 });

      return res.status(200).json(posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
      return res.status(500).json({ message: "Error fetching posts" });
    }
  }

}
