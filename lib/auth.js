
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { registerUser } from "./api-server";

const checkUserExists = async (email) => {
  try {
    const response = await fetch('https://poize-music-backend-kn0u.onrender.com/api/auth/check-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    
    const data = await response.json();
    return { exists: data.success, user: data.user };
  } catch (error) {
    console.error('Error checking user existence:', error);
    return { exists: false, user: null };
  }
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
          const { exists, user: existingUser } = await checkUserExists(user.email);

          if (exists) {
            if (existingUser.is_oauth_login) {
              console.log("✅ Existing OAuth user, proceeding with login");
              user.dbUser = existingUser;
              return true;
            } else {
              console.log("❌ User exists but registered with email/password");
              // Store error in URL for client handling
              return `/auth/error?error=EmailExists&message=Account exists with email/password`;
            }
          } else {
            // Register new OAuth user
            const payload = {
              name: user.name,
              email: user.email,
              password: user.email + "1", 
              is_oauth_login: true,
            };

            const registrationResult = await registerUser(JSON.stringify(payload));
            console.log("✅ New OAuth user registered successfully");
            
            user.dbUser = registrationResult.user;
            return true;
          }
        } catch (err) {
          console.error("❌ Error in OAuth flow:", err);
          return `/auth/error?error=OAuthError&message=Registration failed`;
        }
      }
      return true;
    },

    async jwt({ token, user, account }) {
      if (account?.provider === "google") {
        token.provider = "google";
        token.accessToken = account.access_token;
        
        if (user?.dbUser) {
          token.dbUser = user.dbUser;
        }
      }
      return token;
    },

    async session({ session, token }) {
      session.provider = token.provider;
      
      if (token.dbUser) {
        session.user.dbUser = token.dbUser;
        session.user.id = token.dbUser.id;
        session.user.role = token.dbUser.role;
      }
      
      return session;
    },
  },

  pages: {
    signIn: "/login",
    signOut: "/login",
    error: "/auth/error",
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};

export default NextAuth(authOptions);