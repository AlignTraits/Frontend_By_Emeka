import api from '../api/axios'
import Cookies from 'js-cookie'
import { AuthResponse, LoginCredentials, SignUpCredentials} from '../types/auth.types'
import { User} from '../types/auth.types'
import {toast} from "react-toastify";



const TOKEN_KEY = 'auth_token'
const COOKIE_EXPIRY = 0.0208 // days

export const setToken = (token: string ): void => {
  Cookies.set(TOKEN_KEY, token, { expires: COOKIE_EXPIRY })
}

export const getToken = (): string | undefined => {
  
  return Cookies.get(TOKEN_KEY)
}

export const removeToken = (): void => {
  Cookies.remove(TOKEN_KEY)
}

export const login = async (credentials: LoginCredentials) => {
 
  try{
    const response = await api.post('/auth/login', credentials) 
    return response
  } catch(err) {
   throw(err)
  }
 
}

export const googleLogin = async () => {
 
  try{
    const response = await api.get('/google-auth/google') 
    return response
  } catch(err) {
   throw(err)
  }
 
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
  localStorage.clear()
  removeToken()

}

export const adminLogin = async (email:string, password:string): Promise<AuthResponse> => {
 const response =  await api.post('/auth/admin/login', {email, password})
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
  console.log("response: ", response)
    return response.data

  } catch(err: any) {
    console.log("ererer: ", err)
    let errMsg = err.response.data
    console.log("errMsg: ", errMsg)
    throw new Error(errMsg)
    // toast.error(errMsg)
  }
  
}

export const changePassword = async (token: string, newPassword: string) => {
  try {
     const response = await api.patch("users/password", {newPassword}, {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
     })

     return response.data
     
  } catch (err) {
     if (err) {
       await logout();
      //  window.location.href = "/login";
     }
  }
}

export const getUserDetails = async ( token: string) => {
   try {
     const response = await api.get("/users", {
       headers: {
         "Authorization": `Bearer ${token}`,
       },
     });
     if (!response.data.ok) {
       await logout();
       window.location.href = "/login";
     }
     return response.data;
   } catch (err) {
     if (err) {
       await logout();
       window.location.href = "/login";
     }
   }
}

export const updateUserDetails = async (data: any, token: string) => {
  try {
    const response = await api.patch("/auth/admin/profile", data, {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });
    // if (!response.data.ok) {
    //   await logout();
    //   window.location.href = "/admin/login";
    // }
    return response;
  } catch (err:any) {
    if (err.response && err.response.data && err.response.data.errors) {
      const errors = err.response.data.errors;
      errors.forEach((error: { message: string }) => {
        if (error.message) {
          toast.error(error.message);
        }
      });
    }

    if (err.response && err.response.data) {
      toast.error(err.response.data.error || err.response.data.message);
    } else {
      toast.error("An unexpected error occurred");
    }

    // if (err) {
    //   await logout();
    //   window.location.href = "/admin/login";
    // }
  }
}

export const updatePassword = async (data: any, token: string) => {
  try {
    const response = await api.patch("/auth/admin/password", data, {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });
    // if (!response.data.ok) {
    //   await logout();
    //   window.location.href = "/admin/login";
    // }
    return response;
  } catch (err:any) {
    if (err.response && err.response.data && err.response.data.errors) {
      const errors = err.response.data.errors;
      errors.forEach((error: { message: string }) => {
        if (error.message) {
          toast.error(error.message);
        }
      });
    }

    if (err.response && err.response.data) {
      toast.error(err.response.data.error || err.response.data.message);
    } else {
      toast.error("An unexpected error occurred");
    }

    // if (err) {
    //   await logout();
    //   window.location.href = "/admin/login";
    // }
  }
}

export const upDateUserProfile = async (data: User, token: string, img?: File | null, ) => {
  try {
    const response = await api.patch("/users", JSON.stringify({data}), {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    // setToken(token)

    let imageResponse;
    if (img) {
      let tempData = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") as string) : null;
      const formData = new FormData()
      formData.append("profile", img); 
      formData.append("userId", tempData.id);

      const image = await api.patch("/users/picture", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`,
        },
      });
      imageResponse = image.data;
    }

    return [response.data, imageResponse];
  } catch (err: any) {
    if (err.response && err.response.data && err.response.data.errors) {
      const errors = err.response.data.errors;
      errors.forEach((error: { message: string }) => {
        if (error.message) {
          toast.error(error.message);
        }
      });
    }
    if (err.response && err.response.data) {
      toast.error(err.response.data.error || err.response.data.message);
    } else {
      toast.error("An unexpected error occurred");
    }

    throw err;
  }
};
