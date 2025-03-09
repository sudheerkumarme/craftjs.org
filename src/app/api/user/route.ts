import { NextResponse } from "next/server"
import { auth } from "@/auth"

export const GET = auth(async function GET(req) {
    try {
        if (req.auth) return NextResponse.json(req.auth.user)
        return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
    } catch (error) {
        console.error("Error fetching user data:", error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
})

