import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    student: {
      isLogin: false,
    },
    manager: {
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
    setManager: (state, action) => {
      const newState = { ...action.payload, isLogin: true };
      state.manager = newState;
    },
    removeManager: (state, action) => {
      const newState = { isLogin: false };
      state.manager = newState;
    },
  },
});

export const { setStudent, removeStudent, setManager, removeManager } = loginSlice.actions;

export default loginSlice.reducer;
