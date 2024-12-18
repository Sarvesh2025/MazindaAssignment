import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import walletReducer from './features/walletSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    wallet: walletReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
