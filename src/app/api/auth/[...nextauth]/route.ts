import NextAuth, { NextAuthOptions, User as AuthUser, Account, Profile } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "@/lib/mongodb"
import dbConnect from "@/lib/mongoose"
import User from "@/models/User"

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            allowDangerousEmailAccountLinking: true,
        }),
    ],
    adapter: MongoDBAdapter(clientPromise),
    pages: {
        signIn: "/login",
    },
    callbacks: {
        async signIn({ user, account, profile }: { user: AuthUser, account: Account | null, profile?: Profile }) {
            // Connect to the database
            await dbConnect()

            try {
                // Check if user exists in our custom User model
                const existingUser = await User.findOne({ email: user.email })

                if (existingUser) {
                    // Update last login time
                    await User.findOneAndUpdate({ email: user.email }, { lastLogin: new Date() })
                } else {
                    // Create a new user in our custom model
                    await User.create({
                        name: user.name,
                        email: user.email,
                        image: user.image,
                        signupDate: new Date(),
                        lastLogin: new Date(),
                        earlyAccess: true,
                        earlyAccessSignupDate: new Date(),
                    })
                }

                return true
            } catch (error) {
                console.error("Error in signIn callback:", error)
                return true // Still allow sign in even if our custom logic fails
            }
        },
        async session({ session, user }) {
            // Send properties to the client, like an access_token and user id from a provider.
            if (session.user) {
                session.user.id = user.id

                // Connect to the database
                await dbConnect()

                try {
                    // Get additional user data from our custom model
                    const userData = await User.findOne({ email: session.user.email })

                    if (userData) {
                        // Add custom user data to the session with extended properties
                        const extendedUser = session.user as any
                        extendedUser.role = userData.role
                        extendedUser.earlyAccess = userData.earlyAccess
                        extendedUser.preferences = userData.preferences
                    }
                } catch (error) {
                    console.error("Error in session callback:", error)
                }
            }
            return session
        },
        async redirect({ url, baseUrl }) {
            // Always redirect to /dashboard after login
            return baseUrl + "/dashboard"
        },
    },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }


