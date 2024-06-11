"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../lib/store/store";
import { setCoins, setKingdom } from "../lib/store/features/kingdom/slice";
import { classNames } from "@/utils";
import { useState } from "react";

export const Kingdom = () => {
  const dispatch = useDispatch();
  const { kingdom, coins } = useSelector((state: RootState) => state.kingdom);

  const [isPopoverVisible, setIsPopoverVisibe] = useState(false);
  const [selectedCell, setSelectedCell] = useState<number | null>(null);

  return (
    <div className="flex items-center justify-center">
      <div className="relative grid grid-cols-7">
        {kingdom.map((cell, index) => (
          <div
            key={index}
            onClick={() => {
              // Displaying popover
              if (selectedCell === index) {
                setIsPopoverVisibe(false);
                setSelectedCell(null);
              } else {
                setIsPopoverVisibe(true);
                setSelectedCell(index);
              }

              // Updating kingdom
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
            className={classNames(
              selectedCell === index ? "bg-slate-800" : "bg-slate-700",
              "relative h-24 w-24 flex items-center justify-center border-[1px] border-slate-300 hover:bg-slate-800"
            )}
          >
            {/* Asset */}
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

            {/* Popover */}
            {selectedCell === index && isPopoverVisible ? (
              <div
                className={classNames(
                  isPopoverVisible ? "visible" : "hidden",
                  selectedCell < 7 ? "top-20" : "bottom-20",
                  "z-50 absolute -left-1/2 bg-slate-800 p-4 rounded-lg w-48 border border-slate-300"
                )}
              >
                {assetPrices.map(({ icon, price }) => (
                  <div
                    key={icon}
                    className="py-2 flex items-center justify-between"
                  >
                    <p className="h-12 w-12 text-3xl bg-gradient-to-r from-slate-500 to-slate-300 rounded-md flex items-center justify-center">
                      {icon}
                    </p>
                    <button className="h-12 text-2xl text-right text-slate-800 bg-gradient-to-r from-slate-300 to-slate-500 px-4 py-2 rounded-md">{`${price} 💎`}</button>
                  </div>
                ))}
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

const assetPrices = [
  { icon: "🌾", price: 2 },
  { icon: "🌳", price: 4 },
  { icon: "🏰", price: 8 },
];
