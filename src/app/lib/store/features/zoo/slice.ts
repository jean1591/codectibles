import type { PayloadAction } from "@reduxjs/toolkit";
import { Zoo } from "@/app/interfaces";
import { createSlice } from "@reduxjs/toolkit";
import { emptyZoo } from "@/app/api/constants/emptyZoo";

export interface ZooState {
  coins: number;
  zoo: Zoo;
}

const initialState: ZooState = {
  coins: 0,
  zoo: emptyZoo,
};

export const zooSlice = createSlice({
  name: "zooSlice",
  initialState,
  reducers: {
    setCoins: (state, action: PayloadAction<number>) => {
      state.coins = action.payload;
    },
    setZoo: (state, action: PayloadAction<Zoo>) => {
      state.zoo = action.payload;
    },
  },
});

export const { setCoins, setZoo } = zooSlice.actions;

export default zooSlice.reducer;
