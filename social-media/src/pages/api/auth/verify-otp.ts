import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/lib/mongoDB";
import { Otp } from "@/lib/model/otp";  

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method !== "POST") {
            return res.status(405).json({ message: "Method Not Allowed" });
        }

        const { email, otpValue } = req.body;
        await connectDB();

        const otpDoc = await Otp.findOne({ email }).sort({ createdAt: -1 });
        console.log("otp doc",otpDoc)

        if (!otpDoc) {
            return res.status(400).json({ success: false, message: "No OTP generated." });
        }
        if (otpDoc.expiresAt < new Date()) {
            return res.status(400).json({ success: false, message: "OTP has expired." });
        }
        if (otpValue == otpDoc.otp) {
            return res.status(200).json({ success: true, message: "OTP verified successfully!" });
        } else {
            return res.status(400).json({ success: false, message: "Invalid OTP." });
        }
    } catch (error) {
        console.error("Error verifying OTP:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}
