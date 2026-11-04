import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { UserRole } from "./types/next-auth"
import { verifyPassword } from "./modules/auth/password"
import { findUserByEmail } from "@repo/db"

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email=credentials.email
        const password=credentials.password
        if(typeof email !== "string" || typeof password !== "string" || !email.trim() || !password.trim()) {
          return null
        }
        const user = await findUserByEmail(email)
        if(!user) {
          return null
        }
        const passwordMatch = await verifyPassword(password, user.passwordHash)
        if(!passwordMatch) {
          return null
        }
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id ?? token.sub ?? ""
        session.user.role = token.role as UserRole
      }
      return session
    },
  },
})