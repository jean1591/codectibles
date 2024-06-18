"use client";

import { setIsRewardsModalOpen } from "../lib/store/features/rewards/slice";
import { useDispatch } from "react-redux";

export const RewardButton = () => {
  const dispatch = useDispatch();

  return (
    <button
      className="bg-gradient-to-b from-red-500 to-red-400 hover:from-red-400 hover:to-red-300 px-4 py-1 rounded-full"
      onClick={() => dispatch(setIsRewardsModalOpen(true))}
    >
      🎁
    </button>
  );
};
