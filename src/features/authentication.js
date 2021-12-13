import { createSlice } from "@reduxjs/toolkit";

const authentication = createSlice({
  name: "user",
  initialState: {
    user: "",
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload
    },
    logout:(state,action) =>{
      state.user = ""
    }
  },
});

export const { login, logout } = authentication.actions;

export const selectUser = (state) => state.user.user;

export default authentication.reducer;
