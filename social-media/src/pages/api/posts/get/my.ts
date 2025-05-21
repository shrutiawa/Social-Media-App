
import { getServerSession } from "next-auth";
import { connectDB } from "@/lib/mongoDB";
import { Post } from "@/lib/model/post";
import { authOptions } from "@/lib/auth";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  console.log("getting the session in server",session);
  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  await connectDB();

  try {
    const posts = await Post.find({ user: session.user.id }).populate("user", "first_name last_name email");;
    console.log("getting the post in server",posts)
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching your posts" });
  }
}
