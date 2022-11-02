import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    student: {
      isLogin: false,
    },
  },
  reducers: {
    setStudent: (state, action) => {
      const newState = { ...action.payload, isLogin: true };
      state.student = newState;
    },
    removeStudent: (state, action) => {
      const newState = { isLogin: false };
      state.student = newState;
    },
  },
});

export const { setStudent, removeStudent } = loginSlice.actions;

export default loginSlice.reducer;
