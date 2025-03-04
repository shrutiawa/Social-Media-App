import mongoose from 'mongoose';
const userModel = new mongoose.Schema({
   first_name: { type: String, required: true, trim: true },
   last_name: { type: String, required: false, trim: true },
   email: { type: String, required: true, unique: true, trim: true },
   phone_number: { type: String, required: true, trim: true },
   DOB: { type: Date, required: false },
   gender: { type: String, required: false, enum: ["male", "female", "other",""] },
   password: { type: String, required: true, minlength: 6 },
}, { timestamps: true });


export const User = mongoose.models.users || mongoose.model('users', userModel);