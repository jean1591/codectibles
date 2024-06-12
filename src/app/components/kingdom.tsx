"use client";

import { useSelector } from "react-redux";

import { RootState } from "../lib/store/store";
import { classNames } from "@/utils";
import { useState } from "react";
import { SelectAssetPopover } from "./selectAssetPopover";
import { RemoveAssetPopover } from "./removeAssetPopover";
import { Asset } from "./asset";

export const Kingdom = () => {
  const { kingdom } = useSelector((state: RootState) => state.kingdom);

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