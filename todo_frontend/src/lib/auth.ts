import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        // When user signs in, store the Google ID token
        token.googleIdToken = account.id_token
      }
      return token
    },
    async session({ session, token }) {
      // Pass the Google ID token to the session
      if (token.googleIdToken) {
        session.googleIdToken = token.googleIdToken as string
      }
      return session
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
}