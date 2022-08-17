import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./ui";

const initialCartState = {
  items: [{
    id: Math.random().toString(),
    title: "Test Item",
    quantity: 3,
    price: 6,
    total: 18
  }],
  totalAmount: 18,
  changed: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    replaceCart(state, action) {
      state.items = action.payload.items;
      state.totalAmount = action.payload.totalAmount;
    },
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
      state.changed = true;
      state.items[index].total += state.items[index].price;
    },
    removeItem(state, action) {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      state.items[index].quantity--;
      state.items[index].total -= state.items[index].price;
      state.changed = true;
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
