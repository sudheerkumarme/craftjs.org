import { NextResponse } from "next/server"
import { auth } from "@/auth"

export async function GET(req: Request) {
    try {
        const session = await auth()
        if (session) {
            return NextResponse.json(session.user)
        }
        return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
    } catch (error) {
        console.error("Error fetching user data:", error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}

