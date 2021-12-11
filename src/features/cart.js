import { createSlice } from "@reduxjs/toolkit";

const cart = createSlice({
  name: "cart",
  initialState: {
    carts: [],
  },
  reducers: {
    addToCart: (state, action) => {
      return {
        carts: [...state.carts, action.payload],
      };
    },
    updateCart: (state, action) => {
     
      return {carts:[...state.carts.map((cart) => {

        if (cart.id !== action.payload.id) {
          return cart
        }

        return {
          ...cart,
          ...action.payload,
        }
      })]}
    },
    removeFromCart: (state, action) => {
      console.log(action.payload)
      state.carts.splice(state.carts.findIndex(a => a.id === action.payload.id) , 1)
    },
    clearCart:(state)=>{
      state.carts = []
    }
  },
});

export const { addToCart, updateCart, removeFromCart,clearCart, } = cart.actions;

export const selectCarts = (state) => state.cart.carts;

export default cart.reducer;
