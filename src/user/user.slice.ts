import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from './';
import { authenticateUser } from './user.middleware';

const userSlice = createSlice({
  name: 'user',
  initialState: { tag: 'empty' } as User,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      return action.payload;
    },
    logoutUser: () => {
      return { tag: 'loggedOut' as const };
    },
  },
  extraReducers: builder => {
    builder
      .addCase(authenticateUser.pending, (state, action) => {
        return { tag: 'loading' as const };
      })
      .addCase(authenticateUser.rejected, () => {
        return { tag: 'error' as const };
      });
  },
});

export const { setUser, logoutUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
