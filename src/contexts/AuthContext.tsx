import { ReactNode, useState } from 'react'
import { AuthContext, AuthContextType } from './authContextDefinition'
import { AuthError } from '../types/auth.types'
import * as authService from '../services/auth.service'

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<AuthContextType['user']>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

 const login = async (email: string, password: string) => {
   try {
     setIsLoading(true);
     setError(null);
     const response = await authService.login({ email, password });
     console.log(response)
     setUser(response?.user); // You commented this line out, so `user` might remain null.
   } catch (err) {
      if (err instanceof AuthError) {
  setError(err.message);
} else if ('response' in err && err.response?.data?.errors[0]?.message) {
  setError(err.response.data?.errors[0].message);
} else {
  setError('An unexpected error occurred');
}
     throw err;
   } finally {
     setIsLoading(false);
   }
 };


  const logout = async () => {
    try {
      setIsLoading(true)
      setError(null)
      await authService.logout()
      setUser(null)
    } catch (err) {
      setError('Failed to logout. Please try again.')
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (firstname: string, lastname: string, email: string, password: string) => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await authService.register({ 
        firstname, 
        lastname, 
        email, 
        password 
      })
      setUser(response.user)
    } catch (err) {
      if (err instanceof AuthError) {
        setError(err.message)
      } else if (err instanceof Error) {
        setError('Failed to create account. Please try again.')
      } else {
        setError('An unexpected error occurred')
      }
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const value: AuthContextType = {
    user,
    login,
    logout,
    register,
    isLoading,
    error,
   
  }

  return (
    
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
} 