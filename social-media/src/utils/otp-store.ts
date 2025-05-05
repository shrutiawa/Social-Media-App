const otpStore = new Map<string, { otp: string; expiresAt: number }>();

export const saveOtp = (email: string, otp: string) => {
  const expiresAt = Date.now() + 10 * 60 * 1000; 
  otpStore.set(email, { otp, expiresAt });

  setTimeout(() => otpStore.delete(email), 10 * 60 * 1000);
};

export const verifyOtp = (email: string, enteredOtp: string) => {
  const otpData = otpStore.get(email);

  if (!otpData) return { success: false, message: "OTP expired or not found." };

  if (Date.now() > otpData.expiresAt) {
    otpStore.delete(email);
    return { success: false, message: "OTP expired." };
  }

  if (otpData.otp !== enteredOtp) return { success: false, message: "Invalid OTP." };

  otpStore.delete(email);
  return { success: true, message: "OTP verified successfully!" };
};
