import { classNames } from "@/utils";
import { gradientBg } from "../../ui";
import { useState } from "react";
import { BadgePopover } from "./badgePopover";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/lib/store/store";
import {
  Badge as BadgeType,
  RewardType,
  Stat,
  User,
  UserDb,
} from "@/app/api/interfaces/user";
import { setUser } from "@/app/lib/store/features/user/slice";
import { Badges as BadgesSkeleton } from "./skeleton/badges";


export const Badges = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const [isPopoverVisible, setIsPopoverVisibe] = useState(false);
  const [selectedCell, setSelectedCell] = useState<number | null>(null);

  if (!user) {
    return <BadgesSkeleton />
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
    <div className="bg-slate-100 rounded-lg p-4 lg:p-8 shadow-lg">
      <p className="text-2xl font-medium">Badges</p>

      {/* CLAIMED BADGES */}
      {unlocked.length > 0 && (
        <div className="mt-4 grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-4 xl:grid-cols-5 grid-flow-row items-center justify-center gap-4">
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
      )}

      {/* NEXT BADGES */}
      <div className="mt-4">
        {locked.map((badge) => (
          <div key={badge.id}>
            {badge.unlocked ? (
              <BadgeToClaim badge={badge} />
            ) : (
              <Badge badge={badge} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const BadgeToClaim = ({ badge }: { badge: BadgeType }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.user);

  if (!user) {
    return <></>;
  }

  const handleClaimBadge = () => {
    const updatedUser = {
      authUserId: user.authUserId,
      badges: [
        ...user.badges.unlocked,
        { ...badge, unlockedAt: new Date(), unlocked: true },
      ],
    } as UserDb;

    const stateUser: User = {
      ...user,
      badges: {
        unlocked: [
          ...user.badges.unlocked,
          { ...badge, unlockedAt: new Date().toISOString(), unlocked: true },
        ],
        locked: user.badges.locked.filter(({ id }) => id !== badge.id),
      },
    };

    if (badge.rewardType === RewardType.XP) {
      const updatedXp: Stat = {
        ...user.stats.xp,
        user: user.stats.xp.user + badge.reward,
      };

      updatedUser.stats = { ...user.stats, xp: updatedXp };
      stateUser.stats = { ...user.stats, xp: updatedXp };
    }

    (async function updateUser() {
      await fetch("/api/user", {
        method: "PUT",
        body: JSON.stringify({ user: updatedUser }),
        headers: { "Content-Type": "application/json" },
      });
    })();

    dispatch(setUser(stateUser));
  };

  const { description, reward, rewardType, title } = badge;

  return (
    <div
      className={classNames(gradientBg, "rounded-lg p-[2px] mt-2 shadow-md")}
    >
      <button
        onClick={handleClaimBadge}
        className="flex items-center justify-between p-4 rounded-lg bg-none text-slate-100 w-full"
      >
        <div className="text-left">
          <p className="text-lg font-medium capitalize">{title}</p>
          <p className="text-xs capitalize">{description}</p>
        </div>
        <div>
          <p className="text-lg text-nowrap">{`+ ${reward} ${rewardType.toUpperCase()}`}</p>
        </div>
      </button>
    </div>
  );
};

const Badge = ({ badge }: { badge: BadgeType }) => {
  const { description, reward, rewardType, title } = badge;

  return (
    <div
      className={classNames(gradientBg, "rounded-lg p-[2px] mt-2 shadow-md")}
    >
      <div className="flex items-center justify-between p-4 bg-slate-100 rounded-lg">
        <div>
          <p className="text-lg font-medium capitalize">{title}</p>
          <p className="text-xs capitalize text-slate-600">{description}</p>
        </div>
        <div>
          <p className="text-lg text-nowrap">{`+ ${reward} ${rewardType.toUpperCase()}`}</p>
        </div>
      </div>
    </div>
  );
};
