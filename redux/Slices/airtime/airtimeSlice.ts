import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BalanceState {
  phone: string | null;
  amount: number | null;
}

const initialState: BalanceState = {
  phone: null,
  amount: null,
};

export const airtimeSlice = createSlice({
  name: "airtime",
  initialState: initialState,
  reducers: {
    buyairtime: (
      state,
      action: PayloadAction<{ phone: string; amount: number }>
    ) => {
      // Update phone and amount based on action payload
      state.phone = action.payload.phone;
      state.amount = action.payload.amount;
    },
    airtimeHistory: (
      state,
      action: PayloadAction<{ phone: string; amount: number }>
    ) => {
      // Update phone and amount based on action payload
      state.phone = action.payload.phone;
      state.amount = action.payload.amount;
    },
  },
});

// Action creators are generated for each case reducer function
export const { buyairtime, airtimeHistory } = airtimeSlice.actions;

// We export the reducer function so that it can be added to the store
export default airtimeSlice.reducer;
