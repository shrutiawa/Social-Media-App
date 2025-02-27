const {db_username , db_password} = process.env;
export const connectionStr = `mongodb+srv://${db_username}:${db_password}@cluster0.w72yq.mongodb.net/userDB?retryWrites=true&w=majority&appName=Cluster0`;

import mongoose from "mongoose";



if (!connectionStr) {
  throw new Error("❌ MongoDB URI is missing in environment variables!");
}

let cached = (global as any).mongoose || { conn: null, promise: null };

export async function connectDB() {
  if (cached.conn) {
    console.log("✅ Using existing MongoDB connection");
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(connectionStr, {
      dbName: "UserDB",
    }).then((mongoose) => {
      console.log("✅ New MongoDB connection established");
      return mongoose;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
