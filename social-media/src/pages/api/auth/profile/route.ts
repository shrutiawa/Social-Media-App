import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongoDB";
import { User } from "@/lib/model/user";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  const session = await getServerSession(req, res, authOptions);

  if (!session || !session.user?.email) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const email = session.user.email;
  console.log(email);

  if (req.method === "GET") {
    try {
      const user = await User.findOne({ email }).select("-password");
      if (!user) return res.status(404).json({ error: "User not found" });

      return res.status(200).json(user);
    } catch (error) {
      console.error("Error fetching profile:", error);
      return res.status(500).json({ error: "Failed to fetch profile" });
    }
  }

  if (req.method === "PUT") {
    try {
      const { first_name, last_name, phone_number, DOB, gender } = req.body;

      const updatedUser = await User.findOneAndUpdate(
        { email },
        { first_name, last_name, phone_number, DOB, gender },
        { new: true, runValidators: true }
      ).select("-password");

      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }

      return res.status(200).json({ message: "Profile updated successfully", updatedUser });
    } catch (error) {
      console.error("Error updating profile:", error);
      return res.status(500).json({ error: "Failed to update profile" });
    }
  }

  return res.status(405).json({ error: "Method Not Allowed" });
}
