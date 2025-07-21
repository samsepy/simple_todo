"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useMutation } from "@apollo/client"
import { GoogleAuthDocument, GoogleAuthMutation } from "@/generated/graphql"

interface AuthContextType {
  user: any | null
  token: string | null
  loading: boolean
  signOut: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()
  const [user, setUser] = useState<any | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  const [googleAuthMutation] = useMutation<GoogleAuthMutation>(GoogleAuthDocument)

  useEffect(() => {
    async function handleAuth() {
      if (status === "loading") return

      if (session?.googleIdToken) {
        try {
          const { data } = await googleAuthMutation({
            variables: {
              input: {
                idToken: session.googleIdToken
              }
            }
          })

          if (data?.googleAuth?.user && data?.googleAuth?.token) {
            setUser(data.googleAuth.user)
            setToken(data.googleAuth.token)
            localStorage.setItem('authToken', data.googleAuth.token)
          }
        } catch (error) {
          console.error('GraphQL Auth Error:', error)
        }
      } else {
        setUser(null)
        setToken(null)
        localStorage.removeItem('authToken')
      }

      setLoading(false)
    }

    handleAuth()
  }, [session, status, googleAuthMutation])

  const signOut = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('authToken')
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}