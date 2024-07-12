import { Activity, ActivityType } from "@/app/api/interfaces/activity";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";

import { Badge } from "@/app/api/interfaces/badge";
import { Badges as BadgesSkeleton } from "./skeleton/badges";
import JSConfetti from "js-confetti";
import { Resource } from "@/app/api/interfaces/user";
import { RootState } from "@/app/lib/store/store";
import { Stat } from "@/app/api/interfaces/stats";
import { addActivity } from "@/app/lib/store/features/user/slice";
import { claimBadge } from "@/app/lib/store/features/badges/slice";
import { classNames } from "@/utils";
import { gradientBg } from "../../ui";
import { updateStat } from "@/app/lib/store/features/stats/slice";

// TODO: add progress (with % or progres bar)
export const Badges = () => {
  const { locked, unlocked } = useSelector((state: RootState) => state.badges);

  if (!locked || !unlocked) {
    return <BadgesSkeleton />;
  }

  return (
    <div className="bg-white rounded-lg p-4 lg:p-8 shadow-lg">
      <p className="text-2xl font-medium">Badges</p>
      <div className="mt-8">
        {unlocked &&
          unlocked.length > 0 &&
          unlocked.map((badge) => (
            <div key={badge.id}>
              <BadgeToClaim badge={badge} />
            </div>
          ))}

        <div className="mt-2">
          {locked.map((badge) => (
            <div key={badge.id}>
              <BadgeComponent badge={badge} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const BadgeToClaim = ({ badge }: { badge: Badge }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.user);
  const { stats } = useSelector((state: RootState) => state.stats);

  const jsConfetti = useRef<JSConfetti | null>(null);

  useEffect(() => {
    jsConfetti.current = new JSConfetti();
  }, []);

  if (!stats || !user) {
    return <></>;
  }

  const handleClaimBadge = () => {
    jsConfetti.current && jsConfetti.current.addConfetti();

    const xpStats = stats.find((stat) => stat.type === Resource.XP);
    if (!xpStats) {
      throw new Error("User have no XP stats");
    }

    (async function badgeClaimedUpdate() {
      const badgeClaimedPayload = {
        badge,
        updatedXpValue: xpStats.value + badge.reward,
      };

      await fetch(`/api/users/${user.id}/badge-claimed`, {
        method: "PUT",
        body: JSON.stringify(badgeClaimedPayload),
        headers: { "Content-Type": "application/json" },
      });
    })();

    const activity = {
      createdAt: new Date().toISOString(),
      details: badge.title,
      type: ActivityType.BADGE_CLAIMED,
      userId: user.id,
    } as Activity;

    const updatedXp: Stat = {
      ...xpStats,
      value: xpStats.value + badge.reward,
    };

    // TODO: move .slice(0, 10) to slice
    dispatch(
      addActivity({ ...activity, createdAt: activity.createdAt.slice(0, 10) })
    );
    dispatch(updateStat(updatedXp));
    dispatch(claimBadge(badge));
  };

  const { description, reward, title } = badge;

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
          <p className="text-lg text-nowrap">{`+ ${reward} XP`}</p>
        </div>
      </button>
    </div>
  );
};

const BadgeComponent = ({ badge }: { badge: Badge }) => {
  const { description, reward, title } = badge;

  return (
    <div
      className={classNames(gradientBg, "rounded-lg p-[2px] mt-2 shadow-md")}
    >
      <div className="flex items-center justify-between p-4 bg-white rounded-lg">
        <div>
          <p className="text-lg font-medium capitalize">{title}</p>
          <p className="text-xs capitalize text-slate-600">{description}</p>
        </div>
        <div>
          <p className="text-lg text-nowrap">{`+ ${reward} XP`}</p>
        </div>
      </div>
    </div>
  );
};
