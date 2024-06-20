import { emptyZoo } from "@/app/api/constants/emptyZoo";
import { User, Zoo } from "@/app/interfaces";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface UserSlice {
  coins: number;
  user: User | null;
  username: string | null;
  zoo: Zoo;
}

const initialState: UserSlice = {
  coins: 0,
  user: null,
  username: null,
  zoo: emptyZoo,
};

// TODO: merge with zoo
export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      if (action.payload) {
        state.coins = action.payload.coins
        state.username = action.payload.username
        state.zoo = action.payload.zoo
      }
    },
    setUsername: (state, action: PayloadAction<string | null>) => {
      state.username = action.payload;
    },
  },
});

export const { setUser, setUsername } = userSlice.actions;

export default userSlice.reducer;
