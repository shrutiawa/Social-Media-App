import mongoose from 'mongoose';

const otpModel = new mongoose.Schema(
  {
    email: { type: String, required: true },
    otp: { type: String, required: true },
    expiresAt: { type: Date, required: true },
  },
  { timestamps: true }
);

otpModel.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const Otp = mongoose.models.otps || mongoose.model('otps', otpModel);
