import { User } from 'types/Repo';

/* --- STATE --- */
export interface NestJsConnectorState {
  userId: string;
  loading: boolean;
  error?: RepoErrorType | null;
  user: User;
}

export enum RepoErrorType {
  RESPONSE_ERROR = 1,
  USER_NOT_FOUND = 2,
  USERNAME_EMPTY = 3,
  USER_HAS_NO_REPO = 4,
}

/*
  If you want to use 'ContainerState' keyword everywhere in your feature folder,
  instead of the 'HomePageState' keyword.
*/
export type ContainerState = NestJsConnectorState;
