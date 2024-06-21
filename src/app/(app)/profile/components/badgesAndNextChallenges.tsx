import { classNames } from "@/utils";
import { gradientBg } from "../../ui";
import { useState } from "react";
import { BadgePopover } from "./badgePopover";
import { useSelector } from "react-redux";
import { RootState } from "@/app/lib/store/store";

export const BadgesAndNextChallenges = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const [isPopoverVisible, setIsPopoverVisibe] = useState(false);
  const [selectedCell, setSelectedCell] = useState<number | null>(null);

  // TODO: display skeleton
  if (!user) {
    return <></>;
  }

  const {
    badges: { locked, unlocked },
  } = user;

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
    <div className="bg-slate-200 rounded-lg p-4 lg:p-8 shadow-lg">
      {/* BADGES */}
      <div>
        <p className="text-2xl font-medium">Badges</p>

        <div className="mt-8 grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-4 xl:grid-cols-5 grid-flow-row items-center justify-center gap-4">
          {unlocked.map((badge, index) => (
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
      </div>

      {/* NEXT BADGES */}
      <div className="mt-12">
        <p className="text-2xl font-medium">Next badges</p>

        <div className="mt-8">
          {locked.map(({ description, reward, title }) => (
            <div
              key={title}
              className={classNames(
                gradientBg,
                "rounded-lg p-[2px] mt-2 shadow-md"
              )}
            >
              <div className="flex items-center justify-between p-4 bg-slate-200 rounded-lg">
                <div>
                  <p className="text-lg font-medium capitalize">{title}</p>
                  <p className="text-xs text-slate-600 capitalize">
                    {description}
                  </p>
                </div>
                <div>
                  <p className="text-lg text-nowrap">{`+ ${reward.value} ${reward.type.toUpperCase()}`}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
