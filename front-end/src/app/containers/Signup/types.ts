import { User } from 'types/User';

/* --- STATE --- */
export interface SignupState {
  id?: string;
  isLoggedIn?: boolean;
  userEmail?: string;
  password?: string;
  passwordConfirm?: string;
  loading?: boolean;
  error?: UserErrorType | null;
  user?: User;
}

export enum UserErrorType {
  RESPONSE_ERROR = 1,
  USER_NOT_FOUND = 2,
  PASSWORDS_DO_NOT_MATCH = 3,
  USER_HAS_NO_USER = 4,
}

/*
  If you want to use 'ContainerState' keyword everywhere in your feature folder,
  instead of the 'HomePageState' keyword.
*/
export type ContainerState = SignupState;
