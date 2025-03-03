import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/lib/mongoDB";
import bcrypt from "bcryptjs"
import {User} from "../../../../lib/model/user"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();
    console.log("Received request:", req.method);

    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }
    try {
      const { name, email, password, confirm_password } = req.body;

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        name,
        email,
        password: hashedPassword,
      });
  
      await newUser.save();
  
      res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
      console.error("Error in registration:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
}
