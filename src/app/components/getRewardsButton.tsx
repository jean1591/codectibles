"use client";

import { setIsRewardsModalOpen } from "../lib/store/features/rewards/slice";
import { useDispatch } from "react-redux";

export const RewardButton = () => {
  const dispatch = useDispatch();

  return (
    <button
      className="bg-red-400 hover:bg-red-400/75 px-4 py-1 sm:px-4 rounded-full uppercase transition ease-in-out duration-500"
      onClick={() => dispatch(setIsRewardsModalOpen(true))}
    >
      🎁
    </button>
  );
};
