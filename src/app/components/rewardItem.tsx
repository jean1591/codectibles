"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../lib/store/store";
import { setCoins } from "../lib/store/features/kingdom/slice";
import { Reward } from "../interfaces";
import { claimReward } from "../lib/store/features/rewards/slice";

export const RewardItem = ({ title, reward }: Reward) => {
  const dispatch = useDispatch();
  const { coins } = useSelector((state: RootState) => state.kingdom);

  return (
    <div className="my-8 px-4 flex items-center justify-between">
      <p className="text-left text-base">{title}</p>

      <button
        className="flex items-center justify-center bg-red-400 hover:bg-red-400/75 text-base text-right px-6 py-2 rounded-full uppercase font-semibold"
        onClick={() => {
          dispatch(setCoins(coins + reward));
          dispatch(claimReward(title))
        }}
      >
        Claim 🎁
      </button>
    </div>
  );
};
