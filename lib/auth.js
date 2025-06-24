import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { registerUser } from "./api-server";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
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
          console.log("✅ User registered/logged in successfully");
        } catch (err) {
          console.error(
            "❌ Error saving user to DB:",
            err.response?.data || err.message || err
          );
          // Continue with login even if DB save fails
          // You might want to handle this differently based on your needs
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

    // Add redirect callback to handle post-login redirects properly
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
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

  // Add debug mode for development
  debug: process.env.NODE_ENV === "development",
};

export default NextAuth(authOptions);