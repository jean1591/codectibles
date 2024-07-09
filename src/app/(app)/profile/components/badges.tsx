import { BadgePopover } from "../../profile/components/badgePopover";
import { Badges as BadgesSkeleton } from "./skeleton/badges";
import { RootState } from "@/app/lib/store/store";
import { classNames } from "@/utils";
import { gradientBg } from "../../ui";
import { useSelector } from "react-redux";
import { useState } from "react";

export const Badges = () => {
  const { claimed } = useSelector((state: RootState) => state.badges);
  const [isPopoverVisible, setIsPopoverVisibe] = useState(false);
  const [selectedCell, setSelectedCell] = useState<number | null>(null);

  if (!claimed) {
    return <BadgesSkeleton />;
  }

  const handleBadgeOnClick = (index: number) => {
    if (selectedCell === index) {
      setIsPopoverVisibe(false);
      setSelectedCell(null);
    } else {
      setIsPopoverVisibe(true);
      setSelectedCell(index);
    }
  };

  return (
    <div className="bg-slate-100 rounded-lg p-4 lg:p-8 shadow-lg">
      <p className="text-2xl font-medium">Badges</p>

      {claimed.length > 0 && (
        <div className="mt-8 grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-4 xl:grid-cols-5 grid-flow-row items-center justify-center gap-4">
          {claimed.map((badge, index) => (
            <div
              onClick={() => handleBadgeOnClick(index)}
              key={badge.icon}
              className={classNames(
                gradientBg,
                "relative flex items-center justify-center h-20 w-20 border-2 border-slate-500 rounded-lg shadow-md hover:cursor-pointer"
              )}
            >
              <p
                className={classNames(
                  selectedCell === index ? "text-5xl" : "text-4xl"
                )}
              >
                {badge.icon}
              </p>
              <BadgePopover
                badge={badge}
                isPopoverVisible={isPopoverVisible && selectedCell === index}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
