import { createSlice } from "@reduxjs/toolkit";

const initialUiState = {
  isCartOpen: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState: initialUiState,
  reducers: {
    toggle(state) {
      state.isCartOpen = !state.isCartOpen;
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;
