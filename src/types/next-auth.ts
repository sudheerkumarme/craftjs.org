import NextAuth from "next-auth"

declare module "next-auth" {
    interface Session {
        user: {
            id: string
            name: string
            email: string
            image?: string
            // Add any other custom user properties here
        }
    }

    interface User {
        id: string
        name: string
        email: string
        image?: string
        // Add any other custom user properties here
    }
}

