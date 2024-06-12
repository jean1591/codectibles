"use client";

import { useDispatch } from "react-redux";
import { setIsRewardsModalOpen } from "../lib/store/features/rewards/slice";

export const RewardButton = () => {
  const dispatch = useDispatch();

  return (
    <button
      className="w-full bg-red-400 hover:bg-red-400/75 text-xl px-4 py-2 rounded-full uppercase"
      onClick={() => dispatch(setIsRewardsModalOpen(true))}
    >
      🎁 Get rewards 🎁
    </button>
  );
};
