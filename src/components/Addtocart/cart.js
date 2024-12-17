import { createSlice } from "@reduxjs/toolkit";

const cart = createSlice({
  name: "cart",
  initialState: {
    cartitems: [], 
  },
  reducers: {
    
    addtocart: (state, action) => {
      state.cartitems.push({ ...action.payload });
    },
    
    removeFromCart: (state, action) => {
      state.cartitems = state.cartitems.filter(item => item.id !== action.payload.id);
    },
  },
});


export const { addtocart, removeFromCart } = cart.actions;


export default cart.reducer;
