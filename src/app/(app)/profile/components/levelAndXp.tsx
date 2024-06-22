import { classNames } from "@/utils";
import { ProgressBar, gradientBg } from "../../ui";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/lib/store/store";
import { Stat, User, UserDb } from "@/app/api/interfaces/user";
import { setUser } from "@/app/lib/store/features/user/slice";

export const LevelAndXp = () => {
  const { user } = useSelector((state: RootState) => state.user);

  // TODO: display skeleton
  if (!user) {
    return <></>;
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
    <div className="bg-slate-200 rounded-lg p-4 lg:p-8 shadow-lg">
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
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.user);

  if (!user) {
    return <></>;
  }

  const handleClaimLevel = () => {
    const {
      level,
      stats: { xp: xpStat },
    } = user;

    const updatedLevel = level + 1

    const updatedXp: Stat = {
      ...xpStat,
      nextmilestone: updatedLevel ** 3 * 10,
      previousmilestone: xpStat.nextmilestone,
    };

    const updatedUser = {
      authUserId: user.authUserId,
      level: updatedLevel,
      stats: { ...user.stats, xp: updatedXp },
    } as UserDb;


    (async function updateUser() {
      await fetch("/api/user", {
        method: "PUT",
        body: JSON.stringify({ user: updatedUser }),
        headers: { "Content-Type": "application/json" },
      });
    })();

    const stateUser: User = {
      ...user,
      level: updatedLevel,
      stats: { ...user.stats, xp: updatedXp },
    };

    dispatch(setUser(stateUser));
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
  return <p className="text-xl text-right">{`${value} XP`}</p>;
};
