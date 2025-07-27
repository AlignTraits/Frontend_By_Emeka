export interface User {
  id?: string;
  email?: string;
  firstname?: string;
  lastname?: string;
  image?: string | null | File;
  password?: string;
  username?: string | null;
  emailVerified?: string;
  role?: string | null;
  createdAt?: string | null;
  gender?: string | null;
  dob?: string | null;
  ageRange?: string | null;
  region?: string | null;
  bio?: string | null;
  currentSkill?: string | null;
  courseOfInterest? : string | null
  transactions: Transaction []
  //   provider?: 'email' | 'google' | 'facebook' | 'apple';
}

export interface Transaction {
  id: string;
  amount: number;
  createdAt: string;
  status: 'PENDING' | 'SUCCESS' | 'FAILED';
  paymentPlan: string;
  currency: string;
}

export interface AuthResponse {
  status: number;
  token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignUpCredentials extends LoginCredentials {
  firstname: string;
  lastname: string;
}

export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthError";
  }
}
