"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../lib/store/store";
import { setCoins } from "../lib/store/features/kingdom/slice";
import { Prize } from "../interfaces";
import { claimPrize } from "../lib/store/features/prize/slice";

export const PrizeItem = ({ title, prize }: Prize) => {
  const dispatch = useDispatch();
  const { coins } = useSelector((state: RootState) => state.kingdom);

  return (
    <div className="my-8 px-4 flex items-center justify-between">
      <p className="text-left text-base">{title}</p>

      <button
        className="flex items-center justify-center bg-red-400 hover:bg-red-400/75 text-base text-right px-6 py-2 rounded-full uppercase font-semibold"
        onClick={() => {
          dispatch(setCoins(coins + prize));
          dispatch(claimPrize(title))
        }}
      >
        Claim 🎁
      </button>
    </div>
  );
};
