import { createSlice } from "@reduxjs/toolkit";

const initialCartState = {
  // isOpen: false,
  items: [{
    id: Math.random().toString(),
    title: "Test Item",
    quantity: 3,
    price: 6,
    total: 18
  }],
  totalAmount: 18,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    // toggle(state) {
    //   state.isOpen = !state.isOpen;
    // },
    addItem(state, action) { // action.payload
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index].quantity++;
      } else {
        state.items.push({
          id: Math.random().toString(),
          ...action.payload,
        })
      }
      state.items[index].total += state.items[index].price;
    },
    removeItem(state, action) {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      state.items[index].quantity--;
      state.items[index].total -= state.items[index].price;
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
