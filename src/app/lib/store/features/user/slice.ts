import { Activity } from "@/app/api/interfaces/activity";
import { BaseCollectible, Collectible, CollectibleType, Quality } from "@/app/api/interfaces/collectible";
import { User } from "@/app/api/interfaces/user";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

// TODO: change activities: Activity[] | null to activities: Activity[] and use [] as empty state
export interface UserSlice {
  activities: Activity[] | null
  collectibles: Collectible[];
  collectiblesToClaim: BaseCollectible[];
  user: User | null
}

const initialState: UserSlice = {
  activities: null,
  collectibles: [],
  collectiblesToClaim: [],
  user: null,
};

// TODO: create collectible slice
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
    addCollectibles: (state, action: PayloadAction<BaseCollectible[]>) => {
      const collectibles = action.payload

      collectibles.forEach((collectible) => {
        const { icon, quality } = collectible

        const findFunction = (collectible: Collectible) => collectible.icon === icon && collectible.quality === quality
        const excludeFunction = (collectible: Collectible) => !(collectible.icon === icon && collectible.quality === quality)

        const newCollectibleInCollectibles = state.collectibles.find(findFunction)

        if (!newCollectibleInCollectibles) {
          state.collectibles = [...state.collectibles, { ...collectible, count: 1, }];
        } else {
          state.collectibles = [...state.collectibles.filter(excludeFunction),
          { ...newCollectibleInCollectibles, count: newCollectibleInCollectibles.count + 1 }]
        }
      })
    },
    setCollectibles: (state, action: PayloadAction<Collectible[]>) => {
      state.collectibles = action.payload;
    },
    setCollectiblesToClaim: (state, action: PayloadAction<BaseCollectible[]>) => {
      state.collectiblesToClaim = action.payload;
    },
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
  },
});

export const { addActivity, addCollectibles, setActivities, setCollectibles, setCollectiblesToClaim, setUser } = userSlice.actions;

export default userSlice.reducer;
