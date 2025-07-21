"use client"

import { SessionProvider } from "next-auth/react"
import { ApolloWrapper } from "@/lib/apollo-wrapper"
import { AuthProvider } from "@/contexts/auth-context"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ApolloWrapper>
        <AuthProvider>
          {children}
        </AuthProvider>
      </ApolloWrapper>
    </SessionProvider>
  )
}