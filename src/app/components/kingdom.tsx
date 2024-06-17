"use client";

import { setCoins, setKingdom } from "../lib/store/features/kingdom/slice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { Asset } from "./asset";
import { RemoveAssetPopover } from "./removeAssetPopover";
import { RootState } from "../lib/store/store";
import { SelectAssetPopover } from "./selectAssetPopover";
import { classNames } from "@/utils";
import { redirect } from "next/navigation";
import { setUsername } from "../lib/store/features/user/slice";

export const Kingdom = () => {
  const dispatch = useDispatch();
  const { kingdom } = useSelector((state: RootState) => state.kingdom);

  const [isPopoverVisible, setIsPopoverVisibe] = useState(false);
  const [selectedCell, setSelectedCell] = useState<number | null>(null);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    fetch("/api/pr")
      .then((res) => res.json())
      .then(({ coins, kingdom, userName }) => {
        dispatch(setCoins(coins));
        dispatch(setKingdom(kingdom));
        dispatch(setUsername(userName));
      })
      .catch(() => setShouldRedirect(true));
  }, []);

  useEffect(() => {
    if (shouldRedirect) {
      redirect("/token");
    }
  }, [shouldRedirect]);

  const handleCellOnClick = (index: number) => {
    if (selectedCell === index) {
      setIsPopoverVisibe(false);
      setSelectedCell(null);
    } else {
      setIsPopoverVisibe(true);
      setSelectedCell(index);
    }
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
              "relative h-14 w-14 sm:h-24 sm:w-24 flex items-center justify-center border-[1px] border-slate-300 hover:bg-slate-800"
            )}
          >
            <Asset asset={asset} />
            <SelectAssetPopover
              index={index}
              isPopoverVisible={isPopoverVisible}
              selectedCell={selectedCell}
            />
            <RemoveAssetPopover
              index={index}
              isPopoverVisible={isPopoverVisible}
              selectedCell={selectedCell}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
