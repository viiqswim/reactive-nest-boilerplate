import { User } from 'types/User';

/* --- STATE --- */
export interface NestJsConnectorState {
  userId: number;
  loading: boolean;
  error?: UserErrorType | null;
  user: User;
}

export enum UserErrorType {
  RESPONSE_ERROR = 1,
  USER_NOT_FOUND = 2,
  USER_ID_EMPTY = 3,
  USER_HAS_NO_USER = 4,
}

/*
  If you want to use 'ContainerState' keyword everywhere in your feature folder,
  instead of the 'HomePageState' keyword.
*/
export type ContainerState = NestJsConnectorState;
