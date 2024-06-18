"use client";

import { setCoins, setZoo } from "../lib/store/features/zoo/slice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { Asset } from "./asset";
import { RootState } from "../lib/store/store";
import { SelectAssetPopover } from "./selectAssetPopover";
import { UpgradeOrRemovePopover } from "./upgradeOrRemovePopover";
import { classNames } from "@/utils";
import { redirect } from "next/navigation";
import { setUsername } from "../lib/store/features/user/slice";

export const Zoo = () => {
  const dispatch = useDispatch();
  const { zoo } = useSelector((state: RootState) => state.zoo);

  const [isPopoverVisible, setIsPopoverVisibe] = useState(false);
  const [selectedCell, setSelectedCell] = useState<number | null>(null);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    fetch("/api/pr")
      .then((res) => res.json())
      .then(({ coins, userName, zoo }) => {
        dispatch(setCoins(coins));
        dispatch(setUsername(userName));
        dispatch(setZoo(zoo));
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
        {zoo.map((asset, index) => (
          <div
            key={index}
            onClick={() => handleCellOnClick(index)}
            className={classNames(
              selectedCell === index ? "bg-slate-800" : "bg-slate-700",
              "relative h-14 w-14 sm:h-24 sm:w-24 flex items-center justify-center border-[1px] border-slate-300 hover:bg-slate-800 transition ease-in-out duration-500"
            )}
          >
            <Asset asset={asset} />
            <SelectAssetPopover
              index={index}
              isPopoverVisible={isPopoverVisible}
              selectedCell={selectedCell}
            />
            <UpgradeOrRemovePopover
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
