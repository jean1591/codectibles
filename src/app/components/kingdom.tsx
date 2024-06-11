"use client";

import { useDispatch, useSelector } from "react-redux";

import { KingdomCell } from "./kingdomCell";
import { KingdomCellInterface } from "../interfaces";
import { RootState } from "../lib/store/store";
import { setKingdom } from "../lib/store/features/kingdom/slice";

const kingdomFromDB: (KingdomCellInterface | undefined)[] = [
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  { icon: "🌾", size: 2 },
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  { icon: "🌾", size: 1 },
  { icon: "🌾", size: 2 },
  { icon: "🌾", size: 3 },
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  { icon: "🏰", size: 3 },
  undefined,
  undefined,
  { icon: "🌾", size: 1 },
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  { icon: "🌾", size: 2 },
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
];

export const Kingdom = () => {
  // Get kingdom from DB and dispatch to reducer
  const dispatch = useDispatch();
  dispatch(setKingdom(kingdomFromDB));

  const { kingdom } = useSelector((state: RootState) => state.kingdom);

  return (
    <div className="flex items-center justify-center">
      <div className="grid grid-cols-7">
        {kingdom.map((cell, index) => (
          <KingdomCell key={index} cell={cell} index={index} />
        ))}
      </div>
    </div>
  );
};
