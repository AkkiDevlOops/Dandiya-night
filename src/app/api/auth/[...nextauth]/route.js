// app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  // Optional: Connect NextAuth to your MongoDB database using an adapter, 
  // or handle custom callbacks here.
  callbacks: {
    async session({ session, token }) {
      // Expose the user's provider ID to the frontend session if needed
      session.user.id = token.sub;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
