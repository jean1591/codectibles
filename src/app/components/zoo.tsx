"use client";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { Asset } from "./asset";
import { RootState } from "../lib/store/store";
import { SelectAssetPopover } from "./selectAssetPopover";
import { UpgradeOrRemovePopover } from "./upgradeOrRemovePopover";
import { classNames } from "@/utils";
import { redirect } from "next/navigation";
import { setUser } from "../lib/store/features/user/slice";
import { User } from "../interfaces";

export const Zoo = () => {
  const dispatch = useDispatch();
  const { zoo } = useSelector((state: RootState) => state.user);

  const [isPopoverVisible, setIsPopoverVisibe] = useState(false);
  const [selectedCell, setSelectedCell] = useState<number | null>(null);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    fetch("/api/user")
      .then((res) => res.json())
      .then(({ user }: { user: User }) => {
        fetch(
          `/api/pr?fetchedAt=${encodeURIComponent(user.fetchedAt)}&userId=${
            user.authUserId
          }&token=${user.token}&username=${user.username}`
        );
        dispatch(setUser({ ...user, fetchedAt: new Date().toISOString() }));
      })
      .catch((error) => {
        console.error(error)
        setShouldRedirect(true)});
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
