"use client";

import { assetPricesLevel1, getPriceByAsset } from "@/utils/assetPrices";
import { setCoins, setKingdom } from "../lib/store/features/kingdom/slice";
import { useDispatch, useSelector } from "react-redux";

import { AssetDetails } from "../interfaces";
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

  const handlePriceOnClick = ({ icon, price }: AssetDetails, index: number) => {
    const updatedKingdom = [...kingdom];

    if (updatedKingdom[index] === null && coins >= price) {
      updatedKingdom[index] = { icon, level: 1, price };
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
        {kingdom.map((asset, index) => (
          <div
            key={index}
            onClick={() => handleCellOnClick(index)}
            className={classNames(
              selectedCell === index ? "bg-slate-800" : "bg-slate-700",
              "relative h-24 w-24 flex items-center justify-center border-[1px] border-slate-300 hover:bg-slate-800"
            )}
          >
            {/* Asset */}
            {asset ? (
              <div>
                <p
                  className={classNames(
                    asset.level === 1 ? "text-base sm:text-xl" : "",
                    asset.level === 2 ? "text-base sm:text-4xl" : "",
                    asset.level === 3 ? "text-base sm:text-6xl" : ""
                  )}
                >
                  {asset.icon}
                </p>
                <p className="text-normal absolute bottom-1 right-1 text-slate-500">
                  {asset.level}
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
                {assetPricesLevel1.map((asset) => (
                  <div
                    key={asset.icon}
                    className="py-2 flex items-center justify-between"
                  >
                    <p
                      className={classNames(
                        coins >= asset.price
                          ? "bg-gradient-to-r from-slate-300 to-slate-500"
                          : "bg-slate-700",
                        "h-12 w-12 text-3xl rounded-md flex items-center justify-center"
                      )}
                    >
                      {asset.icon}
                    </p>
                    <button
                      onClick={() => handlePriceOnClick(asset, index)}
                      disabled={asset.price > coins}
                      className={classNames(
                        coins >= asset.price
                          ? "bg-gradient-to-r from-slate-300 to-slate-500 text-slate-800"
                          : "bg-slate-700 text-slate-500",
                        "h-12 text-2xl text-right px-4 py-2 rounded-md"
                      )}
                    >{`${asset.price} 💎`}</button>
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
                <div className="mt-4">
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
