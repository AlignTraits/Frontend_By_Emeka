import { createContext } from 'react'


interface User {
  firstName: string,
    lastName: string,
    email: string,
    gender: string,
    image: string,
    dateOfBirth: string,
    bio: string,
    region: string,
    currentSkill: string,
    courseOfInterest: string,
  }


export interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void |number>
  logout: () => Promise<void>
  register: (firstname: string, lastname: string, email: string, password: string) => Promise<void>
  verifyEmailToken: (email: string, password: string, token: string)=> Promise<void>
  isLoading: boolean
  error: string | null
  token: string | undefined
  isAuthenticated: boolean

}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  logout: async () => {},
  register: async () => {},
  verifyEmailToken: async () => {},
  isLoading: false,
  error: null,
  token: undefined,
  isAuthenticated: false
}) 