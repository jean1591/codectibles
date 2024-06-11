import { Kingdom, KingdomCellInterface } from "../interfaces";
import {
  setKingdom,
  setSelectedCell,
} from "../lib/store/features/kingdom/slice";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../lib/store/store";
import { classNames } from "@/utils";
import { useEffect } from "react";

const formatGrid = (index: number): string | undefined => {
  const GRID_SIZE = 7;

  if (index === 0) {
    return "rounded-tl-xl";
  }

  if (index === GRID_SIZE - 1) {
    return "rounded-tr-xl";
  }

  if (index === GRID_SIZE ** 2 - GRID_SIZE) {
    return "rounded-bl-xl";
  }

  if (index === GRID_SIZE ** 2 - 1) {
    return "rounded-br-xl";
  }
};

interface KingdomCellProps {
  cell?: KingdomCellInterface;
  index: number;
}

export const KingdomCell = ({ cell, index }: KingdomCellProps) => {
  const dispatch = useDispatch();
  const { kingdom, selectedCell } = useSelector(
    (state: RootState) => state.kingdom
  );

  const borderStyle = formatGrid(index);

  const handleCellOnClick = () => {
    console.log("🚀 handleCellOnClick:", { selectedCell });

    dispatch(setSelectedCell(selectedCell ? null : index));
  };

  useEffect(() => {
    console.log("🚀 useEffect:", { selectedCell });

    if (selectedCell && kingdom[selectedCell] === undefined) {
      const updatedKingdom: Kingdom = [...kingdom];
      updatedKingdom[selectedCell] = { icon: "🌾", size: 1 };

      dispatch(setKingdom(updatedKingdom));
    }
  }, [selectedCell]);

  return (
    <div
      onClick={handleCellOnClick}
      className={classNames(
        borderStyle ? borderStyle : "",
        index === selectedCell ? "bg-black" : "bg-slate-700",
        "relative flex h-12 w-12 sm:h-24 sm:w-24 items-center justify-center border-[1px] border-br border-dashed border-slate-300 "
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
