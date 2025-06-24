import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";
import { authAPI } from "./api";
import { registerUser } from "./api-server";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "google") {
        try {
          const payload = {
            name: user.name,
            email: user.email,
            password: user.id,
            is_oauth_login: true,
          };

          const data = await registerUser(JSON.stringify(payload));
        } catch (err) {
          console.error(
            "❌ Error saving user to DB:",
            err.response?.data || err
          );
          // Optionally block login
          // return false;
        }
      }

      return true;
    },

    async jwt({ token, user, account }) {
      if (account?.provider === "google") {
        token.provider = "google";
        token.accessToken = account.access_token;
      }
      return token;
    },

    async session({ session, token }) {
      session.provider = token.provider;
      return session;
    },
  },

  pages: {
    signIn: "/login",
    signOut: "/logout",
    error: "/auth/error",
  },

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
