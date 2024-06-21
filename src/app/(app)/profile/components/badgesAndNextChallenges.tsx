"use client";

import { classNames } from "@/utils";
import { gradientBg } from "../../ui";
import { useState } from "react";
import { BadgePopover } from "./badgePopover";
import { Badge } from "@/app/api/interfaces/profile";


const badges: Badge[] = [
  {
    claimedAt: new Date(),
    description: "lorem ipsum lorem ipsum",
    icon: "🤓",
    reward: 250,
    rewardType: "XP",
    title: "lorem",
  },
  {
    claimedAt: new Date(),
    description: "lorem ipsum lorem ipsum",
    icon: "🐙",
    reward: 250,
    rewardType: "XP",
    title: "ipsum",
  },
  {
    claimedAt: new Date(),
    description: "lorem ipsum lorem ipsum",
    icon: "👑",
    reward: 250,
    rewardType: "XP",
    title: "lorem",
  },
  {
    claimedAt: new Date(),
    description: "lorem ipsum lorem ipsum",
    icon: "🤝",
    reward: 250,
    rewardType: "XP",
    title: "ipsum",
  },
  {
    claimedAt: new Date(),
    description: "lorem ipsum lorem ipsum",
    icon: "🤙🏼",
    reward: 250,
    rewardType: "XP",
    title: "lorem",
  },
  {
    claimedAt: new Date(),
    description: "lorem ipsum lorem ipsum",
    icon: "🐶",
    reward: 250,
    rewardType: "XP",
    title: "ipsum",
  },
  {
    claimedAt: new Date(),
    description: "lorem ipsum lorem ipsum",
    icon: "🚨",
    reward: 250,
    rewardType: "XP",
    title: "lorem",
  },
  {
    claimedAt: new Date(),
    description: "lorem ipsum lorem ipsum",
    icon: "💎",
    reward: 250,
    rewardType: "XP",
    title: "lorem",
  },
];

const nextChallenges = [
  {
    badge: "🐙",
    title: "Code Conqueror",
    description: "Merge the most pull requests within a month",
    price: "+ 500 XP",
  },
  {
    badge: "👑",
    title: "PR Power-Up",
    description: "Approve the most pull requests in a week",
    price: "+ 250 XP",
  },
  {
    badge: "🤝",
    title: "Merge Master",
    description: "Merge at least 20 pull requests in two weeks",
    price: "+ 100 XP",
  },
  {
    badge: "🤓",
    title: "Commit Champion",
    description: "Make the highest number of commits in a month",
    price: "+ 500 XP",
  },
  {
    badge: "🐙",
    title: "Issue Resolver",
    description: "Close the most issues in a week",
    price: "+ 300 XP",
  },
  {
    badge: "🤓",
    title: "Branch Brilliance",
    description: "Create and merge the most branches in a month",
    price: "+ 1000 XP",
  },
];

export const BadgesAndNextChallenges = () => {
  const [isPopoverVisible, setIsPopoverVisibe] = useState(false);
  const [selectedCell, setSelectedCell] = useState<number | null>(null);

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
          {badges.map((badge, index) => (
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
          {nextChallenges.map(({ description, price, title }) => (
            <div
              key={title}
              className={classNames(
                gradientBg,
                "rounded-lg p-[2px] mt-2 shadow-md"
              )}
            >
              <div className="flex items-center justify-between p-4 bg-slate-200 rounded-lg">
                <div>
                  <p className="text-lg font-medium">{title}</p>
                  <p className="text-xs text-slate-600">{description}</p>
                </div>
                <div>
                  <p className="text-lg text-nowrap">{price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
