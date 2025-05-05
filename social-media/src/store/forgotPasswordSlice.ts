import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: '',
  isOTPSent: false,
  isOTPVerified: false,
};

const forgotPasswordSlice = createSlice({
  name: 'forgotPassword',
  initialState,
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setOTPSent: (state, action) => {
      state.isOTPSent = action.payload;
    },
    setOTPVerified: (state, action) => {
      state.isOTPVerified = action.payload;
    },
  },
});

export const { setEmail, setOTPSent, setOTPVerified } = forgotPasswordSlice.actions;
export default forgotPasswordSlice.reducer;
