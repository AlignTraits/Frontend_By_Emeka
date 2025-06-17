import { ReactNode, useState } from "react";
import { AuthContext, AuthContextType } from "./authContextDefinition";
// import { AuthError } from '../types/auth.types'
import * as authService from "../services/auth.service";
import api from "../api/axios";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<AuthContextType["user"]>(null);
  const [pageDesc, setPageDesc] = useState<AuthContextType["pageDesc"]>(null)
  const [admin, setAdmin] = useState<AuthContextType['admin']>(null)
  const [token, setToken] = useState<string | undefined>(
    authService.getToken()
  );
  const [currentCourseID, setCurrentCourseID] = useState<string | null>(null);
  const [creatingCourseClicked, setCreatingCourseClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [datePickerClicked, setDatePickerClicked] = useState(false);
  
  const [error, setError] = useState<string | null>(null);

  const today = new Date();
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const formattedToday = `${monthNames[today.getMonth()].slice(0, 3)} ${today.getDate()}, ${today.getFullYear()}`;

  const [startDate, setStartDate] = useState<string>(formattedToday);
  const [endDate, setEndDate] = useState<string>(formattedToday);

const login = async (email: string, password: string): Promise<number> => {
  try {
    setIsLoading(true);
    setError(null);
    if (!token) {
      const response = await authService.login({ email, password });
      setToken(response?.data.data.token);

      authService.setToken(response.data.data.token);
      return response.data.status; // Ensure status is always returned
    }
    return 200; 
  } catch (err: any) {
    if (err.response && err.response.data && err.response.data.errors) {
      const errors = err.response.data.errors;


      errors.forEach((error: { message: string }) => {
        if (error.message) {
          setError(error.message);
        }
      });
    }

    if (
      err.response &&
      err.response.data.message &&
      !err.response.data.errors
    ) {
      setError(err.response.data.message);
    }

    setTimeout(() => setError(null), 4000);
    throw err;
  } finally {
    setIsLoading(false);
  }
};

const googleLogin = async () => {
    try {
    setIsLoading(true);
    setError(null);
    if (!token) {
      const response = await authService.googleLogin();
      console.log("google Login: ", response)
      // setToken(response?.data.data.token);
      // authService.setToken(response.data.data.token);
      // return response.data.status; // Ensure status is always returned
    }
    return 200; 
  } catch (err: any) {
    if (err.response && err.response.data && err.response.data.errors) {
      const errors = err.response.data.errors;


      errors.forEach((error: { message: string }) => {
        if (error.message) {
          setError(error.message);
        }
      });
    }

    if (
      err.response &&
      err.response.data.message &&
      !err.response.data.errors
    ) {
      setError(err.response.data.message);
    }

    setTimeout(() => setError(null), 2000);
    throw err;
  } finally {
    setIsLoading(false);
  }
}

  const logout = async () => {
    try {
      setIsLoading(true);
      setError(null);
      await authService.logout();
      
      setUser(null);
    } catch (err) {
      setError("Failed to logout. Please try again.");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (
    firstname: string,
    lastname: string,
    email: string,
    password: string
  ) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await authService.register({
        firstname,
        lastname,
        email,
        password,
      });
      setUser(response.user);
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.errors) {
        const errors = err.response.data.errors;
  

        errors.forEach((error: { message: string }) => {
          if (error.message) {
            setError(error.message);
          }
        });
      }

      if (
        err.response &&
        err.response.data.message &&
        !err.response.data.errors
      ) {
        setError(err.response.data.message);
      }

      setTimeout(() => setError(null), 2000);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const verifyEmailToken = async (
    token: string,
    email: string,
    password: string
  ) => {
    setIsLoading(true)
    try {
      const response = await api.put(`/auth/reset-password`, {
        email: email,
        newPassword: password,
        token: token,
      });
      return response;
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.errors) {
        const errors = err.response.data.errors;
        
        errors.forEach((error: { message: string }) => {
          if (error.message) {
            setError(error.message);
          }
        });
      }

      if (
        err.response &&
        err.response.data.message &&
        !err.response.data.errors
      ) {
        setError(err.response.data.message);
      }

      setTimeout(() => setError(null), 4000);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    pageDesc,
    setPageDesc,
    setUser,
    admin,
    setAdmin,
    login,
    logout,
    register,
    isLoading,
    error,
    setError,
    verifyEmailToken,
    token: authService.getToken(),
    isAuthenticated: !!authService.getToken(),
    currentCourseID,
    setCurrentCourseID,
    setCreatingCourseClicked,
    creatingCourseClicked,
    setEndDate,
    setStartDate,
    endDate,
    startDate,
    setDatePickerClicked,
    datePickerClicked,
    googleLogin,
    setToken
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
