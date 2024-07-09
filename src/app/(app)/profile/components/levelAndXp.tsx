import { Activity, ActivityType } from "@/app/api/interfaces/activity";
import { ProgressBar, gradientBg, gradientText } from "../../ui";
import { Resource, User } from "@/app/api/interfaces/user";
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
import { Stat } from "@/app/api/interfaces/stats";
import { classNames } from "@/utils";
import { computeProgress } from "@/utils/computeProgress";
import { getRandomEmojis } from "../utils/getRandomEmojis";
import { setDisplayGetEmojisModal } from "@/app/lib/store/features/interactions/slice";
import { updateStat } from "@/app/lib/store/features/stats/slice";

export const LevelAndXp = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const { stats } = useSelector((state: RootState) => state.stats);

  if (!stats || !user) {
    return <LevelAndXpSkeleton />;
  }

  const { level } = user;

  const xpStats = stats.find((stat) => stat.type === Resource.XP);
  if (!xpStats) {
    throw new Error("User have no XP stats");
  }
  const { nextMilestone, previousMilestone, value } = xpStats;

  const progress = computeProgress(nextMilestone, previousMilestone, value);

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
        {progress >= 100 ? <NextLevelButton /> : <Xp value={value} />}
      </div>

      <div className="mt-4">
        <ProgressBar
          lowerBound={`${previousMilestone} XP`}
          upperBound={`${nextMilestone} XP`}
          progress={progress}
        />
      </div>
    </div>
  );
};

const NextLevelButton = () => {
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

  const handleClaimLevel = () => {
    jsConfetti.current && jsConfetti.current.addConfetti();

    const { id: userId, level } = user;

    const xpStats = stats.find((stat) => stat.type === Resource.XP);
    if (!xpStats) {
      throw new Error("User have no XP stats");
    }
    const { nextMilestone } = xpStats;

    const updatedLevel = level + 1;

    (async function levelUpUpdate() {
      const levelUpPayload = {
        level: updatedLevel,
        xp: {
          nextMilestone: updatedLevel ** 2 * 10,
          previousMilestone: nextMilestone,
        },
      };

      await fetch(`/api/user/${userId}/level-up`, {
        method: "PUT",
        body: JSON.stringify(levelUpPayload),
        headers: { "Content-Type": "application/json" },
      });
    })();

    const activity = {
      createdAt: new Date().toISOString(),
      details: `level ${updatedLevel}`,
      type: ActivityType.LEVEL_UP,
      userId,
    } as Activity;

    const stateUser: User = {
      ...user,
      level: updatedLevel,
    };

    const updatedXp: Stat = {
      ...xpStats,
      nextMilestone: updatedLevel ** 2 * 10,
      previousMilestone: nextMilestone,
    };

    dispatch(
      addActivity({ ...activity, createdAt: activity.createdAt.slice(0, 10) })
    );
    dispatch(setUser(stateUser));
    dispatch(updateStat(updatedXp));

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
