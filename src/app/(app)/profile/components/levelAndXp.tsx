import { Activity, ActivityType } from "@/app/api/interfaces/activity";
import { ProgressBar, gradientBg, gradientText } from "../../ui";
import { Stat, User, UserDb } from "@/app/api/interfaces/user";
import {
  addActivity,
  setCollectiblesToClaim,
  setUser,
} from "@/app/lib/store/features/user/slice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";

import JSConfetti from "js-confetti";
import { LevelAndXp as LevelAndXpSkeleton } from "./skeleton/levelAndXp";
import { RootState } from "@/app/lib/store/store";
import { classNames } from "@/utils";
import { getRandomEmojis } from "../utils/getRandomEmojis";
import { setDisplayGetEmojisModal } from "@/app/lib/store/features/interactions/slice";

export const LevelAndXp = () => {
  const { user } = useSelector((state: RootState) => state.user);

  if (!user) {
    return <LevelAndXpSkeleton />;
  }

  const {
    level,
    stats: { xp },
  } = user;

  const progress = Math.ceil(
    ((xp.user - xp.previousmilestone) /
      (xp.nextmilestone - xp.previousmilestone)) *
      100
  );

  return (
    <div className="bg-slate-100 rounded-lg p-4 lg:p-8 shadow-lg">
      <div className="flex items-center justify-between">
        <p
          className={classNames(
            gradientText,
            gradientBg,
            "text-3xl font-medium text-left"
          )}
        >
          {`Level ${level}`}
        </p>
        {progress >= 100 ? <NextLevelButton /> : <Xp value={xp.user} />}
      </div>

      <div className="mt-4">
        <ProgressBar
          lowerBound={`${xp.previousmilestone} XP`}
          upperBound={`${xp.nextmilestone} XP`}
          progress={progress}
        />
      </div>
    </div>
  );
};

const NextLevelButton = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.user);

  const jsConfetti = useRef<JSConfetti | null>(null);

  useEffect(() => {
    jsConfetti.current = new JSConfetti();
  }, []);

  if (!user) {
    return <></>;
  }

  const handleClaimLevel = () => {
    jsConfetti.current && jsConfetti.current.addConfetti();

    const {
      id: userId,
      level,
      stats: { xp: xpStat },
    } = user;

    const updatedLevel = level + 1;

    const updatedXp: Stat = {
      ...xpStat,
      nextmilestone: updatedLevel ** 2 * 10,
      previousmilestone: xpStat.nextmilestone,
    };

    const updatedUser = {
      authUserId: user.authUserId,
      level: updatedLevel,
      stats: { ...user.stats, xp: updatedXp },
    } as UserDb;

    const activity = {
      authUserId: user.authUserId,
      createdAt: new Date().toISOString(),
      details: `level ${updatedLevel}`,
      type: ActivityType.LEVEL_UP,
      userId,
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

    const stateUser: User = {
      ...user,
      level: updatedLevel,
      stats: { ...user.stats, xp: updatedXp },
    };

    dispatch(
      addActivity({ ...activity, createdAt: activity.createdAt.slice(0, 10) })
    );
    dispatch(setUser(stateUser));

    dispatch(setDisplayGetEmojisModal(true));
    dispatch(setCollectiblesToClaim(getRandomEmojis()));
  };

  return (
    <button
      onClick={handleClaimLevel}
      className={classNames(
        gradientBg,
        "text-slate-100 py-1 px-4 rounded-md text-base uppercase text-right animate-bounce"
      )}
    >
      Level up !
    </button>
  );
};

const Xp = ({ value }: { value: number }) => {
  return (
    <p
      className={classNames(
        gradientText,
        gradientBg,
        "text-xl text-right font-medium "
      )}
    >{`${value} XP`}</p>
  );
};
