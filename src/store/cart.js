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
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
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

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "Pending",
        title: "Pending...",
        message: "Sending cart data",
      })
    );

    const sendData = async () => {
      const response = await fetch(
        "https://react-http-fe5e1-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
    };

    try {
      await sendData();
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Cart data sent successfully!",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Sending cart data failed!",
        })
      );
    }
  };
};

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
