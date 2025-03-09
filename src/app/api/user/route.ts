import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]/route"
import dbConnect from "@/lib/mongoose"
import User from "@/models/User"

export async function GET() {
    try {
        const session = await getServerSession(authOptions)

        if (!session || !session.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        await dbConnect()

        const user = await User.findOne({ email: session.user.email }).lean()

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 })
        }

        // Remove sensitive fields
        const { _id, __v, ...userData } = user as any

        return NextResponse.json({ user: userData })
    } catch (error) {
        console.error("Error fetching user data:", error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}

