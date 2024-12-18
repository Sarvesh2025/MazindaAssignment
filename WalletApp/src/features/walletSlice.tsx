import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Transaction {
  id: string;
  type: 'Debit' | 'Credit';
  amount: number;
  category: string;
  date: string;
}

interface WalletState {
  balance: number;
  transactions: Transaction[];
}

const initialState: WalletState = {
  balance: 0,
  transactions: [],
};

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    addTransaction(state, action: PayloadAction<Transaction>) {
      state.transactions.push(action.payload);
      if (action.payload.type === 'Credit') {
        state.balance += action.payload.amount;
      } else {
        state.balance -= action.payload.amount;
      }
    },
  },
});

export const { addTransaction } = walletSlice.actions;
export default walletSlice.reducer;
