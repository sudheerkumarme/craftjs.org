import NextAuth from "next-auth"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import Google from "next-auth/providers/google"
import client from "@/lib/db"

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: MongoDBAdapter(client),
    providers: [Google],
    pages: {
        signIn: "/login",
    },
})
