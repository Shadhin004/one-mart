import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getDB } from "@/lib/db.js";
import bcrypt from "bcrypt";

const authHandler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials) {
        const { email, password } = credentials;

        const db = await getDB();
        const [rows] = await db.query("SELECT * FROM Users WHERE email = ?", [email]);
        const user = rows[0];

        if (!user) return null;

        const isValid = await bcrypt.compare(password, user.password_hash);
        if (!isValid) return null;

        return {
          id: user.user_id,
          name: user.first_name + " " + user.last_name,
          email: user.email,
        };
      },
    }),
  ],  
  pages: {
    signIn: "/auth/login",
  },
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
});

export { authHandler as GET, authHandler as POST };
