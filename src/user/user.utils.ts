import { GET_USER_URI } from './user.constants';
export const getUserUriById = (userId: string) => {
  return GET_USER_URI + `/${userId}`;
};
