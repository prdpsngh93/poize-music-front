import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
       authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
    
  ],
  
  callbacks: {
    async signIn({ user, account, profile }) {
      // This is where you can handle the user data without custom backend routes
      if (account.provider === 'google') {
        // You can add any custom logic here if needed
        // For example, you could check if the email is allowed
        return true; // Return true to allow sign in
      }
      return true;
    },

    async jwt({ token, user, account }) {
      // Add Google access token to the JWT if needed
      if (account?.provider === 'google') {
        token.provider = 'google';
        token.accessToken = account.access_token;
      }
      return token;
    },

    async session({ session, token }) {
      // Add provider info to the session if needed
      session.provider = token.provider;
      return session;
    },
  },

  pages: {
    signIn: '/login',
    signOut: '/logout',
    error: '/auth/error',
  },

  session: {
    strategy: 'jwt',
  },

  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);