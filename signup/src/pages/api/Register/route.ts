import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/lib/mongoDB";
import bcrypt from "bcryptjs"
import { User } from "../../../lib/model/user"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();
  console.log("Received request:", req.method);

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
  
  try {
    const { password, ...userData } = req.body;
  
    const hashedPassword = await bcrypt.hash(password, 10);
  
    const user = await User.findOneAndUpdate(
      { email: userData.email }, 
      { $setOnInsert: { ...userData, password: hashedPassword } }, 
      { upsert: true, new: false } //upsert means Update+Insert updates a existing record if query matches and insert the records if it doesnot exist
      // it will return the document 
      // $setOnInsert if user exists, nothing changes, prevents accidental overwrite
    );
  
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
  
    res.status(201).json({ message: "User registered successfully!" });
  } catch (error  ) {
    console.error("Error in registration:", error);
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message || "Internal Server Error" });
    }
  }
}
