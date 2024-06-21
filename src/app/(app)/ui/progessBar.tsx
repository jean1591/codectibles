import { classNames } from "@/utils";
import { gradientBg } from "./constants";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/lib/store/store";
import { Stat, User, UserDb } from "@/app/api/interfaces/user";
import { computeProgress } from "@/utils/computeProgress";
import { setUser } from "@/app/lib/store/features/user/slice";

export const ProgressBarWithTitle = ({ stat }: { stat: Stat }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.user);

  if (!user) {
    return <></>;
  }

  const handleClaimMilestone = () => {
    const updatedXp: Stat = {
      ...user.stats.xp,
      user: user.stats.xp.user + stat.reward,
    };

    const updatedStat: Stat = {
      ...stat,
      nextmilestone: stat.nextmilestone * 2,
      previousmilestone: stat.nextmilestone,
      reward: 100,
    };

    const updatedUser = {
      authUserId: user.authUserId,
      stats: { ...user.stats, xp: updatedXp, [stat.id]: updatedStat },
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
      stats: { ...user.stats, xp: updatedXp, [stat.id]: updatedStat },
    };

    dispatch(setUser(stateUser));
  };

  const progress = computeProgress(
    stat.user,
    stat.previousmilestone,
    stat.nextmilestone
  );

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-xl font-medium text-left">{`${stat.user} PR merged`}</p>
        {progress >= 100 ? (
          <button
            onClick={handleClaimMilestone}
            className={classNames(
              gradientBg,
              "text-slate-100 py-1 px-4 rounded-md text-base text-right animate-bounce"
            )}
          >
            {`+ ${stat.reward} ${stat.rewardType}`}
          </button>
        ) : (
          <p className="text-base text-right">{`+ ${stat.reward} ${stat.rewardType}`}</p>
        )}
      </div>

      <div className="mt-4">
        <ProgressBar
          lowerBound={stat.previousmilestone.toString()}
          upperBound={stat.nextmilestone.toString()}
          progress={progress}
        />
      </div>
    </div>
  );
};

export const ProgressBar = ({
  lowerBound,
  upperBound,
  progress,
}: {
  lowerBound: string;
  upperBound: string;
  progress: number;
}) => {
  return (
    <div>
      <div className="overflow-hidden rounded-full bg-slate-300">
        <div
          className={classNames(gradientBg, "h-2 rounded-full")}
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="mt-4 flex items-center justify-between text-base font-medium">
        <p
          className={classNames(
            gradientBg,
            "inline-block text-left text-transparent bg-clip-text"
          )}
        >
          {lowerBound}
        </p>
        <p className="text-right">{upperBound}</p>
      </div>
    </div>
  );
};
