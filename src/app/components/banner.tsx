"use client";

import { RootState } from "../lib/store/store";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export const Banner = () => {
  const [animation, setAnimation] = useState("");
  const { coins } = useSelector((state: RootState) => state.zoo);
  const { currentPage } = useSelector((state: RootState) => state.navigation);

  useEffect(() => {
    setAnimation("scale-125 text-red-500 transition ease-in-out duration-200");
    const timer = setTimeout(() => {
      setAnimation("");
    }, 200);
    return () => clearTimeout(timer);
  }, [coins]);

  return (
    <div className="pr-4 py-2 mx-auto max-w-7xl flex items-center justify-between text-base sm:text-lg font-medium text-slate-300">
      <p className="uppercase">{currentPage}</p>
      <div className="flex items-center justify-end gap-x-4 sm:gap-x-8">
        <div className={animation}>{coins} 💎</div>
      </div>
    </div>
  );
};
