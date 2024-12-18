import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  userInfo: { username: string; email: string } | null;
}

const initialState: UserState = {
  userInfo: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<{ username: string; email: string }>) {
      state.userInfo = action.payload;
    },
    clearUser(state) {
      state.userInfo = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
