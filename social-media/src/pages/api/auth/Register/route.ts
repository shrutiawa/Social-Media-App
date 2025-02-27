
import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/lib/mongoDB";
export default async function POST(req: NextApiRequest,res: NextApiResponse) {
  await connectDB();
  res.status(200).json({ result: "data" });
}
