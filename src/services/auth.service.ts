import api from '../api/axios'
import Cookies from 'js-cookie'
import { AuthResponse, LoginCredentials, SignUpCredentials} from '../types/auth.types'


const TOKEN_KEY = 'auth_token'
const COOKIE_EXPIRY = 0.0208 // days

export const setToken = (token: string ): void => {
  Cookies.set(TOKEN_KEY, token, { expires: COOKIE_EXPIRY })
}

export const getToken = (): string | undefined => {
  // console.log(Cookies.get(TOKEN_KEY))
  return Cookies.get(TOKEN_KEY)
}

export const removeToken = (): void => {
  Cookies.remove(TOKEN_KEY)
}

export const login = async (credentials: LoginCredentials) => {
  console.log(credentials)
  try{
    const response = await api.post('/auth/login', credentials) 
    console.log(response)
    return response
  } catch(err) {
    console.log(err)
   throw(err)
  }
  
  // setToken(data.token)
 
}

export const signUp = async (credentials: SignUpCredentials): Promise<AuthResponse> => {
  const { data } = await api.post('/auth/signup', credentials)
  setToken(data.token)
  return data
}

export const forgotPasswordRequest = async (email: string): Promise<void> => {
  await api.post('/auth/request-reset', { email })
}


export const resetPassword = async (email:string, token: string, password: string): Promise<void> => {
  await api.post('/auth/reset-password', { email, token, password })
}

export const getCurrentUser = async (): Promise<AuthResponse> => {
  const { data } = await api.get('/auth/me')
  return data
}

export const socialLogin = (provider: string): void => {
  window.location.href = `/api/auth/${provider}`
}

export const register = async (credentials: SignUpCredentials) => {
  const response = await api.post('/auth/register', {
    firstname: credentials.firstname,  
    lastname: credentials.lastname,
    email: credentials.email,
    password: credentials.password
  })
  return response.data
} 

export const logout = async (): Promise<void> => {
  // await api.post('/auth/logout')
  removeToken()
}

export const adminLogin = async (email:string, password:string): Promise<AuthResponse> => {
 const response =  await api.post('/auth/admin/login', {email, password})
 console.log(response)
 return {status:response.status, token:response.data.data.token}

}


export const verifyEmail = async (): Promise<void> => {
  await api.post('/auth/verify-email')
}

export const getAdminDetails = async (token: string) => {
  try{
const response = await api.get('/auth/admin/details', {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  } )
  console.log(response)
  if(!response.data.ok) {
    await logout()
    window.location.href = '/admin/login'
   
  }
    return response.data

  } catch(err) {
    if(err){
      await logout();
      window.location.href = "/admin/login";
    }
  }
  
}