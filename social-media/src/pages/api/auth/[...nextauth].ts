import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github"
import {authOptions} from "./option"

const handler = NextAuth(authOptions);

export default handler; 

export {handler as GET, handler as POST}; //creating the authentication handler this will handle the process request for login and signout