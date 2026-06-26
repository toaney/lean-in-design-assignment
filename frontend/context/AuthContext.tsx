'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'

interface AuthContextType {
  isLoggedIn: boolean
  toggleAuth: () => void
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  toggleAuth: () => {},
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const toggleAuth = () => setIsLoggedIn(prev => !prev)

  return (
    <AuthContext.Provider value={{ isLoggedIn, toggleAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
