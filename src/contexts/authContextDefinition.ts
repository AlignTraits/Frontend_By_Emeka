import { createContext } from "react";
import { User } from "../types/auth.types";
// interface User {
//   firstName: string;
//   lastName: string;
//   email: string;
//   gender: string;
//   image: string;
//   dateOfBirth: string;
//   bio: string;
//   region: string;
//   currentSkill: string;
//   courseOfInterest: string;
// }

export  interface Admin {
    email: string
    image: string | null
    role: string
    id: string
    username: string
}

export interface AuthContextType {
  user: User | null;
  admin: Admin | null
  setUser: React.Dispatch<React.SetStateAction<User | null>>
  setCurrentCourseID: React.Dispatch<React.SetStateAction<string | null>>
  setCreatingCourseClicked: React.Dispatch<React.SetStateAction<boolean>>
  setAdmin: React.Dispatch<React.SetStateAction<Admin | null>>
  login: (email: string, password: string) => Promise<void | number>;
  googleLogin: () => Promise<void | number>;
  logout: () => Promise<void>;
  register: (
    firstname: string,
    lastname: string,
    email: string,
    password: string
  ) => Promise<void>;
  verifyEmailToken: (
    email: string,
    password: string,
    token: string
  ) => Promise<{ status: number }>;
  isLoading: boolean;
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  token: string | undefined;
  isAuthenticated: boolean;
  currentCourseID: string | null;
  creatingCourseClicked: boolean;
  setEndDate: React.Dispatch<React.SetStateAction<string>>;
  setStartDate: React.Dispatch<React.SetStateAction<string>>
  startDate: string;
  endDate: string;
  setDatePickerClicked: React.Dispatch<React.SetStateAction<boolean>>;
  datePickerClicked: boolean;

}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  admin: null,
  setAdmin: () => {},
  setUser: ()=> {},
  login: async () => {},
  googleLogin: async () => {},
  logout: async () => {},
  register: async () => {},
  verifyEmailToken: async () => ({ status: 0 }), 
  isLoading: false,
  error: null,
  token: undefined,
  isAuthenticated: false,
  currentCourseID: null,
  creatingCourseClicked: false,
  setCurrentCourseID: () => {},
  setCreatingCourseClicked: () => {},
  setError: () => {},
  setEndDate: () => {},
  setStartDate: () => {},
  endDate: "",
  startDate: "",
  setDatePickerClicked: () => {},
  datePickerClicked: false,
});
