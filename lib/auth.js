import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

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
          const checkUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/check-email`;

          const res = await fetch(checkUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: user.email }),
          });

          const result = await res.json();

          // Helper function to login existing user
          const loginUser = async () => {
            const loginUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/login`;
            console.log("loginUrl", loginUrl);
            const loginRes = await fetch(loginUrl, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: user.email,
                password: user.email+1,
              }),
            });

            const loginResult = await loginRes.json();
            console.log("loginResult", loginResult);

            if (loginResult.token && loginResult.user) {
              const { token, user: userData, profile } = loginResult;

              const redirectUrl = `/auth-success?token=${encodeURIComponent(token)}&userId=${userData.id
                }&name=${encodeURIComponent(userData.name)}&email=${encodeURIComponent(
                  userData.email
                )}&role=${encodeURIComponent(userData.role || "null")}${profile ? `&profileId=${encodeURIComponent(profile.id)}&profile=1` : "&profile=0"
                }`;
              return redirectUrl;

            } else {
              console.error("❌ Login failed:", loginResult.message || "Invalid response");
              return "/login?error=custom";
            }
          };

          if (result.success) {
            // User exists, log them in
            console.log("User exists, logging in...");
            return await loginUser();
          } else {
            // User doesn't exist, redirect to role selection first
            console.log("New user, redirecting to role selection...");
            
            // Store user data temporarily in the redirect URL for role selection
            const roleSelectionUrl = `/google-role-selection?name=${encodeURIComponent(user.name)}&email=${encodeURIComponent(user.email)}&googleId=${encodeURIComponent(user.id)}&image=${encodeURIComponent(user.image || "")}`;
            
            return roleSelectionUrl;
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