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
  const [admin, setAdmin] = useState<AuthContextType['admin']>(null)
  const [token, setToken] = useState<string | undefined>(
    authService.getToken()
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (
    email: string,
    password: string
  ): Promise<void | number> => {
    try {
      setIsLoading(true);
      setError(null);
      if (!token) {
        const response = await authService.login({ email, password });
        console.log(response);
        setUser(response?.data);
        setToken(response?.data.data.token);
        console.log(response.data.data.token);
        authService.setToken(response.data.data.token);
        return response.data.status;
      }
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.errors) {
        const errors = err.response.data.errors;
        console.log(errors);

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
        console.log(errors);

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
    try {
      console.log(token, email);
      const response = await api.put(`/auth/reset-password`, {
        email: email,
        newPassword: password,
        token: token,
      });
      console.log(response);
      return response;
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.errors) {
        const errors = err.response.data.errors;
        console.log(errors);

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

  const value: AuthContextType = {
    user,
    setUser,
    admin,
    setAdmin,
    login,
    logout,
    register,
    isLoading,
    error,
    verifyEmailToken,
    token: authService.getToken(),
    isAuthenticated: !!authService.getToken(),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
