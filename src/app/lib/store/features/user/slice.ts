import { Activity } from "@/app/api/interfaces/activity";
import { Collectible, CollectibleType, Quality } from "@/app/api/interfaces/collectible";
import { User } from "@/app/api/interfaces/user";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

const tmpCollectibles: Collectible[] = [
  { icon: "🐷", quality: Quality.COMMON, count: 3, type: CollectibleType.ANIMALS },
  { icon: "🦁", quality: Quality.COMMON, count: 14, type: CollectibleType.ANIMALS },
  { icon: "🦊", quality: Quality.COMMON, count: 1, type: CollectibleType.ANIMALS },
  { icon: "🐻", quality: Quality.RARE, count: 2, type: CollectibleType.ANIMALS },
  { icon: "🦁", quality: Quality.LEGENDARY, count: 1, type: CollectibleType.ANIMALS },
]

// TODO: change activities: Activity[] | null to activities: Activity[] and use [] as empty state
export interface UserSlice {
  activities: Activity[] | null
  collectibles: Collectible[];
  user: User | null
}

const initialState: UserSlice = {
  activities: null,
  collectibles: tmpCollectibles,
  user: null,
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    addActivity: (state, action: PayloadAction<Activity>) => {
      if (state.activities) {
        state.activities = [action.payload, ...state.activities];
      } else {
        state.activities = [action.payload]
      }
    },
    setActivities: (state, action: PayloadAction<Activity[] | null>) => {
      state.activities = action.payload;
    },
    addCollectible: (state, action: PayloadAction<Collectible>) => {
      state.collectibles = [action.payload, ...state.collectibles];
    },
    setCollectibles: (state, action: PayloadAction<Collectible[]>) => {
      state.collectibles = action.payload;
    },
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
  },
});

export const { addActivity, addCollectible, setActivities, setCollectibles, setUser } = userSlice.actions;

export default userSlice.reducer;
