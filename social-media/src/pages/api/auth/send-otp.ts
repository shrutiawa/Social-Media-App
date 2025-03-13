import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/lib/mongoDB";
import nodemailer from "nodemailer";
import { User } from "@/lib/model/user";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await connectDB();
    try {
        if (req.method !== "POST") {
          return res.status(405).json({ message: "Method Not Allowed" });
        }
    
        const { email } = req.body;
        await connectDB();
        const user = User.findOne({ email });
        if (!user) {
          return res.status(400).json({ success: false, message: "Email not registered." });
        }
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000); 
   
        await User.updateOne(
          { email },
          { $set: { otp, otpExpires: expiresAt } }
        );
    
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "shrutiawasthi220@gmail.com", 
            pass: "agcb kfia vzrz waum", 
          },
        });
    
        const mailOptions = {
          from: "shrutiawasthi220@gmail.com",
          to: email,
          subject: "Password Reset OTP",
          text: `Your OTP for password reset is: ${otp}. This OTP is valid for 10 minutes.`,
        };
    
        await transporter.sendMail(mailOptions);
    
        res.status(200).json({ success: true, message: "OTP sent successfully to your registered email." });
      } catch (error) {
        console.error("Error sending OTP email:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
      }

  res.status(200).json({ success: true, message: "OTP sent successfully." });
 
}
