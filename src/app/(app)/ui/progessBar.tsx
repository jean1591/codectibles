import { Resource, Stat, User, UserDb } from "@/app/api/interfaces/user";
import { useDispatch, useSelector } from "react-redux";

import JSConfetti from "js-confetti";
import { RootState } from "@/app/lib/store/store";
import { classNames } from "@/utils";
import { computeProgress } from "@/utils/computeProgress";
import { gradientBg } from "./constants";
import { setUser } from "@/app/lib/store/features/user/slice";

export const ProgressBarWithTitle = ({ stat }: { stat: Stat }) => {
  let jsConfetti = new JSConfetti();

  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.user);

  if (!user) {
    return <></>;
  }

  const handleClaimMilestone = () => {
    jsConfetti.addConfetti();

    const { id: userId, stats } = user;

    const updatedXp: Stat = {
      ...user.stats.xp,
      user: user.stats.xp.user + stat.reward,
    };

    const updatedStat: Stat = {
      ...stat,
      nextmilestone: stat.nextmilestone * 2,
      previousmilestone: stat.nextmilestone,
    };

    (async function milestoneUpdate() {
      const milestonePayload = {
        xp: {
          // TODO: use state.stats when available
          value: stats.xp.user + stat.reward,
        },
        milestone: {
          // TODO: use state.stats when available
          type: stat.id,
          nextMilestone: stat.nextmilestone * 2,
          // TODO: use state.stats when available
          previousMilestone: stat.nextmilestone,
        },
      };

      await fetch(`/api/user/${userId}/milestone`, {
        method: "PUT",
        body: JSON.stringify(milestonePayload),
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
    [Resource.COMMENTS]: "Comments made",
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
