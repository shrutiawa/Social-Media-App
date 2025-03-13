// import type { NextApiRequest, NextApiResponse } from "next";
// import bcrypt from "bcryptjs";
// import { connectDB } from "@/lib/mongoDB";
// import {User} from "../../../../lib/model/user";
// import jwt from 'jsonwebtoken';

// const JWT_SECRET = process.env.JWT_SECRET;



// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     console.log(JWT_SECRET);
//   try {
//     await connectDB();

//     const { email, password } = req.body;
//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(400).json({ message: "User with given email does not exist" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, {
//         expiresIn: "1h",
//       });

//     return res.status(200).json({ message: "Login successful", token });
//   } catch (error) {
//     return res.status(500).json({ message: "Server error", error });
//   }
// }
