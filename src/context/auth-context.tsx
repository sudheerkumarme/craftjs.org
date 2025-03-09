"use client"

import { createContext, useContext, type ReactNode } from "react"
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"

type AuthContextType = {
    status: "loading" | "authenticated" | "unauthenticated"
    user: {
        id: string
        name: string
        email: string
        image?: string
    } | null
    login: (provider: string) => void
    logout: () => void
}

const AuthContext = createContext<AuthContextType>({
    status: "loading",
    user: null,
    login: () => { },
    logout: () => { },
})

export function AuthProvider({ children }: { children: ReactNode }) {
    const { data: session, status } = useSession()
    const router = useRouter()

    const login = (provider: string) => {
        signIn(provider, { callbackUrl: "/dashboard" })
    }

    const logout = () => {
        signOut({ callbackUrl: "/" })
    }

    return (
        <AuthContext.Provider
      value= {{
        status,
            user: session?.user || null,
                login,
                logout,
      }
}
    >
    { children }
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

