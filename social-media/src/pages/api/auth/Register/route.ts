import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/lib/mongoDB";
import bcrypt from "bcryptjs"
import { User } from "../../../../lib/model/user"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();
  console.log("Received request:", req.method);

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
  try {
    const { password, ...userData } = req.body;

    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({ ...userData, password: hashedPassword });


    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error("Error in registration:", error);
    if (error instanceof Error) {
      if (error.name === "ValidationError") {
        return res.status(400).json({ message: "Something went wrong" });
      }

      return res.status(500).json({ message: error.message || "Internal Server Error" });
    }
    res.status(500).json({ message: "An unknown error occurred" });
  }
}
