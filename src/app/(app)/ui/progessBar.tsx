import { useDispatch, useSelector } from "react-redux";

import JSConfetti from "js-confetti";
import { Resource } from "@/app/api/interfaces/user";
import { RootState } from "@/app/lib/store/store";
import { Stat } from "@/app/api/interfaces/stats";
import { classNames } from "@/utils";
import { computeNextLevel } from "@/utils/computeNextLevel";
import { computeProgress } from "@/utils/computeProgress";
import { gradientBg } from "./constants";
import { updateStat } from "@/app/lib/store/features/stats/slice";

export const ProgressBarWithTitle = ({ stat }: { stat: Stat }) => {
  let jsConfetti = new JSConfetti();

  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.user);
  const { stats } = useSelector((state: RootState) => state.stats);

  if (!stats || !user) {
    return <></>;
  }

  const handleClaimMilestone = () => {
    jsConfetti.addConfetti();

    const { id: userId } = user;

    const xpStats = stats.find((stat) => stat.type === Resource.XP);
    if (!xpStats) {
      throw new Error("User have no XP stats");
    }

    const nextLevel = computeNextLevel(stat.nextMilestone);

    (async function milestoneUpdate() {
      const milestonePayload = {
        xp: {
          value: xpStats.value + stat.reward,
        },
        milestone: {
          type: stat.type,
          nextMilestone: nextLevel,
          previousMilestone: stat.nextMilestone,
        },
      };

      await fetch(`/api/users/${userId}/milestone`, {
        method: "PUT",
        body: JSON.stringify(milestonePayload),
        headers: { "Content-Type": "application/json" },
      });
    })();

    const updatedXp: Stat = {
      ...xpStats,
      value: xpStats.value + stat.reward,
    };

    const updatedStat: Stat = {
      ...stat,
      nextMilestone: nextLevel,
      previousMilestone: stat.nextMilestone,
    };

    // TODO: confirm if this works
    dispatch(updateStat(updatedXp));
    dispatch(updateStat(updatedStat));
  };

  const progress = computeProgress(
    stat.nextMilestone,
    stat.previousMilestone,
    stat.value
  );

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-start gap-x-4 text-xl font-medium text-left">
          <p>{statTypeToTitle(stat.type)}</p>
          <span className="inline-flex items-center rounded-md bg-white px-2 py-1 text-xs font-medium text-slate-700 ring-1 ring-inset ring-slate-600/20">
            {stat.value}
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
            {`+ ${stat.reward} XP`}
          </button>
        ) : (
          <p className="text-base text-right">{`+ ${stat.reward} XP`}</p>
        )}
      </div>

      <div className="mt-4">
        <ProgressBar
          lowerBound={stat.previousMilestone.toString()}
          upperBound={stat.nextMilestone.toString()}
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
