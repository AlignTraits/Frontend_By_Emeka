import { createContext } from 'react'

export interface AuthContextType {
  user: unknown | null
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  register: (firstname: string, lastname: string, email: string, password: string) => Promise<void>
  isLoading: boolean
  error: string | null
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  logout: async () => {},
  register: async () => {},
  isLoading: false,
  error: null
}) 