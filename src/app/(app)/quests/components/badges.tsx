import JSConfetti from 'js-confetti'

import { classNames } from "@/utils";
import { gradientBg } from "../../ui";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/lib/store/store";
import {
  Badge as BadgeType,
  RewardType,
  Stat,
  User,
  UserDb,
} from "@/app/api/interfaces/user";
import {
  addActivity,
  setUser,
} from "@/app/lib/store/features/user/slice";
import { Badges as BadgesSkeleton } from "./skeleton/badges";
import { Activity, ActivityType } from "@/app/api/interfaces/activity";

// TODO: add progress (with % or progres bar)
export const Badges = () => {
  const { user } = useSelector((state: RootState) => state.user);

  if (!user) {
    return <BadgesSkeleton />;
  }

  const {
    badges: { locked },
  } = user;

  return (
    <div className="bg-slate-100 rounded-lg p-4 lg:p-8 shadow-lg">
      <p className="text-2xl font-medium">Badges</p>
      <div className="mt-8">
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
  let jsConfetti  = new JSConfetti()

  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.user);

  if (!user) {
    return <></>;
  }

  const handleClaimBadge = () => {
    jsConfetti.addConfetti()

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

    const activity = {
      authUserId: user.authUserId,
      createdAt: new Date().toISOString(),
      details: badge.title,
      type: ActivityType.BADGE_CLAIMED,
    } as Activity;

    (async function updateUser() {
      await fetch("/api/user", {
        method: "PUT",
        body: JSON.stringify({ user: updatedUser }),
        headers: { "Content-Type": "application/json" },
      });

      await fetch("/api/activity", {
        method: "POST",
        body: JSON.stringify({ activity }),
        headers: { "Content-Type": "application/json" },
      });
    })();

    dispatch(
      addActivity({ ...activity, createdAt: activity.createdAt.slice(0, 10) })
    );
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
