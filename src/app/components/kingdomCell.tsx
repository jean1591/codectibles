"use client";

import { KingdomCellInterface } from "../interfaces";
import { classNames } from "@/utils";

const formatGrid = (index: number): string | undefined => {
  const GRID_SIZE = 7;

  if (index === 0) {
    return "rounded-tl-3xl";
  }

  if (index === GRID_SIZE - 1) {
    return "rounded-tr-3xl";
  }

  if (index === GRID_SIZE ** 2 - GRID_SIZE) {
    return "rounded-bl-3xl";
  }

  if (index === GRID_SIZE ** 2 - 1) {
    return "rounded-br-3xl";
  }
};

interface KingdomCellProps {
  cell?: KingdomCellInterface;
  index: number;
}

export const KingdomCell = ({ cell, index }: KingdomCellProps) => {
  const borderStyle = formatGrid(index);

  return (
    <div
      onClick={() => console.log("Clicked", index)}
      className={classNames(
        borderStyle ? borderStyle : "",
        "relative flex h-12 w-12 sm:h-24 sm:w-24 items-center justify-center border-[1px] border-br border-dashed border-slate-300 bg-slate-700"
      )}
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
  );
};
