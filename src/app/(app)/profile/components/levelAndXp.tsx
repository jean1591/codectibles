import JSConfetti from "js-confetti";

import { classNames } from "@/utils";
import { ProgressBar, gradientBg } from "../../ui";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/lib/store/store";
import { Stat, User, UserDb } from "@/app/api/interfaces/user";
import {
  addActivity,
  setCollectiblesToClaim,
  setUser,
} from "@/app/lib/store/features/user/slice";
import { LevelAndXp as LevelAndXpSkeleton } from "./skeleton/levelAndXp";
import { Activity, ActivityType } from "@/app/api/interfaces/activity";
import { setDisplayGetEmojisModal } from "@/app/lib/store/features/interactions/slice";
import { getRandomEmojis } from "../utils/getRandomEmojis";

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
            gradientBg,
            "inline-block text-transparent bg-clip-text text-3xl font-medium text-left"
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
  let jsConfetti = new JSConfetti();

  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.user);

  if (!user) {
    return <></>;
  }

  const handleClaimLevel = () => {
    jsConfetti.addConfetti()

    const {
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

    // TODO: cannot exist emojis modal
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
        gradientBg,
        "text-xl text-right font-medium inline-block text-transparent bg-clip-text"
      )}
    >{`${value} XP`}</p>
  );
};
