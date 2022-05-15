export interface PasswordOptions {
  upperCase?: boolean;
  numbers?: boolean;
  minLength?: number;
}

export interface PasswordValidationByRule {
  isValidMinLength: boolean;
}

export interface UsernameValidationByRule {
  isValidMinLength: boolean;
}

export interface LoginPostBody {
  email: string;
  password: string;
}

export interface RegisterPostBody {
  username: string;
  email: string;
  password: string;
}
