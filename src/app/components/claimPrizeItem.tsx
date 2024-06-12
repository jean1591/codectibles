"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../lib/store/store";
import { setCoins } from "../lib/store/features/kingdom/slice";

export const ClaimPrizeItem = ({
  title,
  prize,
}: {
  title: string;
  prize: number;
}) => {
  const dispatch = useDispatch();
  const { coins } = useSelector((state: RootState) => state.kingdom);

  return (
    <div className="my-8 px-4 flex items-center justify-between font-medium">
      <p className="text-left text-slate-300 text-lg">{title}</p>

      <button
        className="flex items-center justify-center bg-red-400/75 hover:bg-red-300/75 text-slate-300 text-lg text-right px-4 py-2 rounded-full uppercase"
        onClick={() => {
          dispatch(setCoins(coins + prize));
        }}
      >
        Claim 🎁 !
      </button>
    </div>
  );
};
