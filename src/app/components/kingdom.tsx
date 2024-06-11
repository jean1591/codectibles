"use client";

import { assetPrices, getPriceByAsset } from "@/utils/assetPrices";
import { setCoins, setKingdom } from "../lib/store/features/kingdom/slice";
import { useDispatch, useSelector } from "react-redux";

import { AssetPrice } from "../interfaces";
import { RootState } from "../lib/store/store";
import { classNames } from "@/utils";
import { useState } from "react";

export const Kingdom = () => {
  const dispatch = useDispatch();
  const { kingdom, coins } = useSelector((state: RootState) => state.kingdom);

  const [isPopoverVisible, setIsPopoverVisibe] = useState(false);
  const [selectedCell, setSelectedCell] = useState<number | null>(null);

  const handleCellOnClick = (index: number) => {
    if (selectedCell === index) {
      setIsPopoverVisibe(false);
      setSelectedCell(null);
    } else {
      setIsPopoverVisibe(true);
      setSelectedCell(index);
    }
  };

  const handlePriceOnClick = ({ icon, price }: AssetPrice, index: number) => {
    const updatedKingdom = [...kingdom];

    if (updatedKingdom[index] === null && coins >= price) {
      updatedKingdom[index] = { icon, size: 1 };
      dispatch(setCoins(coins - price));
    } else if (updatedKingdom[index] !== null) {
      updatedKingdom[index] = null;
      dispatch(setCoins(coins + price));
    }

    dispatch(setKingdom(updatedKingdom));
  };

  const handleAssetOnRemove = (index: number) => {
    const updatedKingdom = [...kingdom];
    updatedKingdom[index] = null;

    dispatch(setCoins(coins + getPriceByAsset(kingdom[selectedCell!]?.icon)));
    dispatch(setKingdom(updatedKingdom));
  };

  return (
    <div className="flex items-center justify-center">
      <div className="relative grid grid-cols-7">
        {kingdom.map((cell, index) => (
          <div
            key={index}
            onClick={() => handleCellOnClick(index)}
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

            {/* Select Popover */}
            {selectedCell === index &&
            isPopoverVisible &&
            kingdom[selectedCell] === null ? (
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
                    <p
                      className={classNames(
                        coins >= price
                          ? "bg-gradient-to-r from-slate-300 to-slate-500"
                          : "bg-slate-700",
                        "h-12 w-12 text-3xl rounded-md flex items-center justify-center"
                      )}
                    >
                      {icon}
                    </p>
                    <button
                      onClick={() => handlePriceOnClick({ icon, price }, index)}
                      disabled={price >= coins}
                      className={classNames(
                        coins >= price
                          ? "bg-gradient-to-r from-slate-300 to-slate-500 text-slate-800"
                          : "bg-slate-700 text-slate-500",
                        "h-12 text-2xl text-right px-4 py-2 rounded-md"
                      )}
                    >{`${price} 💎`}</button>
                  </div>
                ))}
              </div>
            ) : (
              <div></div>
            )}

            {selectedCell === index &&
            isPopoverVisible &&
            kingdom[selectedCell] !== null ? (
              <div
                className={classNames(
                  isPopoverVisible ? "visible" : "hidden",
                  selectedCell < 7 ? "top-20" : "bottom-20",
                  "z-50 absolute -left-1/2 bg-slate-800 p-4 rounded-lg w-48 border border-slate-300"
                )}
              >
                <div className="py-2">
                  <p className="text-xl text-slate-400 rounded-md flex items-center justify-center">
                    {`Delete ${kingdom[selectedCell]?.icon},`}
                  </p>
                  <p className="text-xl text-slate-400 rounded-md flex items-center justify-center">
                    {`get ${getPriceByAsset(
                      kingdom[selectedCell]?.icon
                    )} 💎 back`}
                  </p>
                  <div className="mt-4 flex items-center justify-center">
                    <button
                      onClick={() => handleAssetOnRemove(index)}
                      className={classNames(
                        "h-12 text-2xl text-right px-4 py-2 rounded-md bg-gradient-to-r from-slate-300 to-slate-500 text-slate-800"
                      )}
                    >
                      {"Remove"}
                    </button>
                  </div>
                </div>
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
