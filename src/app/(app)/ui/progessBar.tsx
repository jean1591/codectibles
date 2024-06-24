import { classNames } from "@/utils";
import { gradientBg } from "./constants";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/lib/store/store";
import { Stat, Resource, User, UserDb } from "@/app/api/interfaces/user";
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
        <div className="flex items-center justify-start gap-x-4 text-xl font-medium text-left">
          <p>{statTypeToTitle(stat.id)}</p>
          <span className="inline-flex items-center rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700 ring-1 ring-inset ring-slate-600/20">
            {stat.user}
          </span>
        </div>
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

const statTypeToTitle = (statType: Resource): string => {
  const mapper: Record<Resource, string> = {
    [Resource.APPROVES]: "PR approved",
    [Resource.COMMENTS]: "comments made",
    [Resource.PR]: "PR merged",
    [Resource.XP]: "",
  };

  return mapper[statType];
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
      <div className="mt-2 flex items-center justify-between text-sm font-medium">
        <p className="text-left">{lowerBound}</p>
        <p className="text-right">{upperBound}</p>
      </div>
    </div>
  );
};
