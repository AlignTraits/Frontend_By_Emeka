export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
//   provider?: 'email' | 'google' | 'facebook' | 'apple';
}

export interface AuthResponse {
  user: User;
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


