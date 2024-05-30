import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import API from "./apiRoute";

export const authOption: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "sign-in",
      name: "sign-in",
      credentials: { username: {}, password: {} },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null;
        const { data } = await axios.post(API.USER, credentials);
        return { ...data.data };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      return token;
    },
    async session({ user, session, token }) {
      session.user.id = token.sub as string;
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/signin",
    error: "/signin",
  },
};
