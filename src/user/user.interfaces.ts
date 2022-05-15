import { isError } from 'lodash';

export interface UserData {
  tag: 'data';
  _id: string;
  email: string;
  admin: boolean;
}
export interface UserLoading {
  tag: 'loading';
}
export interface UserEmpty {
  tag: 'empty';
}
export interface UserError {
  tag: 'error';
}
export interface UserLoggedOut {
  tag: 'loggedOut';
}

export type User = UserData | UserLoading | UserEmpty | UserError | UserLoggedOut;
