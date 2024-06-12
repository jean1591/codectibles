"use client";

import { RewardButton } from "./getRewardsButton";
import { RootState } from "../lib/store/store";
import { useSelector } from "react-redux";

export const Navbar = () => {
  const { coins } = useSelector((state: RootState) => state.kingdom);

  return (
    <div className="px-4 md:px-0 py-4 mx-auto max-w-3xl flex items-center justify-between border-b border-slate-300 text-base sm:text-xl font-medium">
      <div>Code Kingdom 👑</div>
      <div className="flex items-center justify-end gap-x-4 sm:gap-x-8 text-sm sm:text-xl">
        <div>{coins} 💎</div>
        <RewardButton />
      </div>
    </div>
  );
};
