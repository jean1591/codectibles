"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../lib/store/store";
import { setCoins, setKingdom } from "../lib/store/features/kingdom/slice";
import { classNames } from "@/utils";

export const Kingdom = () => {
  const dispatch = useDispatch();
  const { kingdom, coins } = useSelector((state: RootState) => state.kingdom);

  return (
    <div className="flex items-center justify-center">
      <div className="grid grid-cols-7">
        {kingdom.map((cell, index) => (
          <div
            key={index}
            onClick={() => {
              const updatedKingdom = [...kingdom];

              if (updatedKingdom[index] === null && coins >= 5) {
                updatedKingdom[index] = { icon: "🏰", size: 1 };
                dispatch(setCoins(coins - 5));
              } else if (updatedKingdom[index] !== null) {
                updatedKingdom[index] = null;
                dispatch(setCoins(coins + 5));
              }

              dispatch(setKingdom(updatedKingdom));
            }}
            className="relative h-24 w-24 flex items-center justify-center border-[1px] border-slate-300 bg-slate-700 hover:bg-slate-800"
          >
            {cell ? (
              <div>
                <p
                  className={classNames(
                    cell.size === 1 ? "text-base sm:text-xl" : "",
                    cell.size === 2 ? "text-base sm:text-4xl" : "",
                    cell.size === 3 ? "text-base sm:text-6xl" : ""
                  )}
                >
                  {cell.icon}
                </p>
                <p className="text-normal absolute bottom-1 right-1 text-slate-500">
                  {cell.size}
                </p>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
