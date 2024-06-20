import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface NavigationSlice {
  currentPage: string;
}

const initialState: NavigationSlice = {
  currentPage: "profile",
};

export const navigationSlice = createSlice({
  name: "navigationSlice",
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<string>) => {
      state.currentPage = action.payload;
    },
  },
});

export const { setCurrentPage } = navigationSlice.actions;

export default navigationSlice.reducer;
