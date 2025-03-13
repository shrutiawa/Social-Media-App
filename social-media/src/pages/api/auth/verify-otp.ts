import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { email, enteredOtp } = req.body;
  console.log("request bosy",req.body)

  // Regenerate OTP based on the same logic
  const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
  console.log(generatedOtp)

  if (enteredOtp === generatedOtp) {
    return res.status(200).json({ success: true, message: "OTP verified successfully!" });
  } else {
    return res.status(400).json({ success: false, message: "Invalid OTP." });
  }
}
