import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { User, setUser, logoutUser, UserData } from '.';
import { GET_USER_URI, LOGOUT_USER_URI } from './';

const AUTHENTICATE_USER = 'user/AUTHENTICATE_USER';
const LOGOUT = 'user/LOGOUT';

export const authenticateUser = createAsyncThunk(
  AUTHENTICATE_USER,
  async (_, { dispatch, rejectWithValue }) => {
    let error = false;
    await axios
      .get<Omit<UserData, 'tag'>>('/self')
      .then(response => {
        dispatch(setUser({ tag: 'data', ...response.data }));
      })
      .catch(() => {
        error = true;
      });
    if (error) {
      return rejectWithValue({ tag: 'empty' });
    }
  }
);

export const logout = createAsyncThunk(LOGOUT, async (_, { dispatch }) => {
  axios.delete('/logout').then(() => {
    dispatch(logoutUser());
  });
});
