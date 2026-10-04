import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// 1. Corrected imports using your exact names
import connectDB from "@/lib/db";         // Adjust path if your connection file is elsewhere
import { googleUser } from "@/models/googlelogin";    // Ensure this matches where your schema file lives

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    // Intercepts the Google login flow to handle SignUp/Login in your database
    async signIn({ profile }) {
      try {
        // 2. Call your correct connection function
        await connectDB();

        // 3. Find the user using your 'googleUser' model name
        let user = await googleUser.findOne({ googleId: profile.sub });

        if (!user) {
          // SIGN UP: Create a new user record if they don't exist
          user = new googleUser({
            googleId: profile.sub,
            email: profile.email,
            name: profile.name,
            avatarUrl: profile.picture,
          });
          await user.save();
        } else {
          // LOG IN: Optional - keep profile info synced with Google updates
          user.name = profile.name;
          user.avatarUrl = profile.picture;
          await user.save();
        }

        return true; // Let NextAuth complete the login and generate the session cookie
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false; // Blocks authentication if the database operations fail
      }
    },

    // Injects the MongoDB unique primary key (_id) into the session object
    async session({ session }) {
      if (session.user) {
        // 4. Connect and query using your naming conventions
        await connectDB();
        const dbUser = await googleUser.findOne({ email: session.user.email });
        
        if (dbUser) {
          session.user.id = dbUser._id.toString();
        }
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
