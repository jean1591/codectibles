"use client";

import { useDispatch } from "react-redux";
import { setIsPrizesModalOpen } from "../lib/store/features/prize/slice";

export const PrizeButton = () => {
  const dispatch = useDispatch();

  return (
    <button
      className="w-full bg-red-400 hover:bg-red-400/75 text-xl px-4 py-2 rounded-full uppercase"
      onClick={() => dispatch(setIsPrizesModalOpen(true))}
    >
      🎁 Get my prizes 🎁
    </button>
  );
};
