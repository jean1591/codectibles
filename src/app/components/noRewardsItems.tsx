import { Reward, RewardType } from "../interfaces";

import { RootState } from "../lib/store/store";
import { useSelector } from "react-redux";

export const NoRewardsItem = () => {
  const { nextRewards } = useSelector((state: RootState) => state.rewards);

  const nextPrMergeMilestone = nextRewards.find(
    (nextReward) => nextReward.type === RewardType.MILESTONE
  );

  return (
    <div>
      <p className="text-base text-center">
        All rewards have been <span className="text-red-400">claimed</span> 🦁
      </p>

      <div className="mt-8">
        {nextPrMergeMilestone && (
          <NextPRMergeMilestone nextPrMergeMilestone={nextPrMergeMilestone} />
        )}
      </div>
    </div>
  );
};

const NextPRMergeMilestone = ({
  nextPrMergeMilestone,
}: {
  nextPrMergeMilestone: Reward;
}) => {
  // @ts-expect-error Properties exist in details
  const { lowerBound, progress, upperBound } = nextPrMergeMilestone.details;

  return (
    <div>
      <p className="text-base">{nextPrMergeMilestone.title}</p>
      <div className="mt-4">
        <div className="overflow-hidden rounded-full bg-gray-200">
          <div
            className="h-2 rounded-full bg-red-400"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-2 grid grid-cols-2 text-sm font-medium">
          <div className="text-red-400">{`${lowerBound} PR`}</div>
          <div className="text-right">{`${upperBound} PR`}</div>
        </div>
      </div>
    </div>
  );
};
