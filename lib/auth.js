import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import Cookies from "js-cookie";
// Remove toast import from server-side code
// import { toast } from "sonner";

// Cookie options
const cookieOptions = {
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  expires: 30, // default 30 days for OAuth
};

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

          const checkUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/check-email`;

          const res = await fetch(checkUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: user.email }),
          });

          const result = await res.json();

          // helper
          const loginUser = async () => {
            const loginUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/login`;
            console.log("loginUrl", loginUrl);
            const loginRes = await fetch(loginUrl, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: user.email,
                password: user.id,
              }),
            });

            const loginResult = await loginRes.json();
            console.log("loginResult", loginResult);

            if (loginResult.token && loginResult.user) {
              const { token, user, profile } = loginResult;

              const redirectUrl = `/auth-success?token=${encodeURIComponent(token)}&userId=${user.id
                }&name=${encodeURIComponent(user.name)}&email=${encodeURIComponent(
                  user.email
                )}&role=${encodeURIComponent(user.role || "null")}${profile ? `&profileId=${encodeURIComponent(profile.id)}&profile=1` : "&profile=0"
                }`;
              return redirectUrl;

            } else {
              console.error("❌ Login failed:", loginResult.message || "Invalid response");
              return "/login?error=custom";
            }
          };

          if (result.success) {
            console.log("User exists, logging in...");
            return await loginUser();
          } else {
            const registerUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/register`;
            console.log("registerUrl", registerUrl);
            const registerRes = await fetch(registerUrl, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload),
            });

            console.log("registerRes", registerRes);

            const registerResult = await registerRes.json();
            console.log("registerResult", registerResult);

            if (registerResult.status === "success") {
              console.log("✅ User registered:", registerResult.user.email);
              return await loginUser();
            } else {
              console.error("❌ Registration failed:", registerResult.message);
              return "/login?error=register";
            }
          }
        } catch (error) {
          console.error("❌ Error in Google signIn flow:", error.message || error);
          return "/login?error=server";
        }
      }

      return true;
    },

    async jwt({ token, account, user }) {
      if (account?.provider === "google") {
        token.provider = "google";
        token.accessToken = account.access_token;

        // Store user data in JWT token for client-side access
        if (user) {
          token.userData = user;
        }
      }
      return token;
    },

    async session({ session, token }) {
      session.provider = token.provider;
      session.userData = token.userData;
      return session;
    },

    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
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
  debug: process.env.NODE_ENV === "development",
};