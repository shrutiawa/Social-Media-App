import { AuthOptions } from "next-auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/mongoDB";
import {User} from "@/lib/model/user";
import { JWT } from "next-auth/jwt";

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
          name: "Credentials",
          credentials: {
            email: { label: "Email", type: "email" },
            password: { label: "Password", type: "password" },
          },
          async authorize(credentials) {
            await connectDB();
    
            if (!credentials?.email || !credentials.password) {
              throw new Error("Please enter both email and password");
            }
    
            const user = await User.findOne({ email: credentials.email });
            if (!user) {
              throw new Error("No user found with this email");
            }
    
            const isMatch = await bcrypt.compare(credentials.password, user.password);
            if (!isMatch) {
              throw new Error("Invalid credentials");
            }
    
            const secret = process.env.NEXTAUTH_SECRET!; //it should generate dynamically 
            const token = jwt.sign(
              { id: user._id.toString(), email: user.email },
              secret,
              { expiresIn: "1h" }
            );
            
            return { id: user._id.toString(), name: user.name, email: user.email, token };
          },
        }),
    ],
    callbacks: {
        async jwt({ token, user }: { token: JWT; user?: { id: string; email: string; token: string } }) {
          if (user) {
            token.id = user.id;
            token.email = user.email;
            if (user.token) {
              token.jwt = user.token;
            }
          }
          return token;
        },
        async session({ session, token }: { session: any; token: JWT }) {
          if (session.user) {
            session.user.id = token.id;
            session.user.email = token.email;
            if (token.jwt) {
              session.user.token = token.jwt;
            }
          }
          return session;
        },
      },
      pages: {
        signIn: "/login"
      },
      secret: process.env.NEXTAUTH_SECRET,
      session: {
        strategy: "jwt",
    },
}