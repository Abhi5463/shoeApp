// @ts-nocheck
// cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cartItems.push(action.payload);
      console.log(state.cartItems);
    },
    removeFromCart: (state, action) => {
      state.cartItems = state?.cartItems?.filter(item => item?._id !== action?.payload);
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
