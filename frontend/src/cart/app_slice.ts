import { createSlice } from '@reduxjs/toolkit'



export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: [],
    total:0,

  },
  reducers: {
    add_product: (state:any,action) => {
      
      state.cart = state.cart.push(action.payload)
    },
    
  }
})

export const { add_product } = cartSlice.actions

export default cartSlice.reducer