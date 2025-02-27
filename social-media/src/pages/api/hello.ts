// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/lib/mongoDB";
import { User } from "../../lib/model/user"
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await connectDB();
  const data = await User.find();
  console.log("this is the data from the database", data);
  res.status(200).json({ result: data });
}
