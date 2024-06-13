import { useDispatch, useSelector } from "react-redux";

import { NoRewardsItem } from "./noRewardsItems";
import { Reward } from "../interfaces";
import { RewardItem } from "./rewardItem";
import { RootState } from "../lib/store/store";
import { setRewards } from "../lib/store/features/rewards/slice";
import { useEffect } from "react";

export const Rewards = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    fetch("/api/rewards")
      .then((res) => res.json())
      .then((data) => {
        const rewards = rewardsMapper(data);
        dispatch(setRewards(rewards));
      });
  }, []);

  const { rewards } = useSelector((state: RootState) => state.rewards);

  return (
    <div>
      {rewards.length ? (
        rewards.map(({ reward, title }) => (
          <RewardItem key={title} title={title} reward={reward} />
        ))
      ) : (
        <NoRewardsItem />
      )}
    </div>
  );
};

const rewardsMapper = ({
  prMilestone,
  prMerged,
}: {
  prMilestone: number;
  prMerged: number;
}): Reward[] => {
  const rewards: Reward[] = [];

  if (prMerged > 0) {
    rewards.push({ title: prMergedToTitle(prMerged), reward: prMerged * 2 });
  }

  if (prMilestone) {
    rewards.push({
      title: prMilestoneToTitle(prMilestone),
      reward: prMilestoneToReward(prMilestone),
    });
  }

  return rewards;
};

const prMergedToTitle = (prMerged: number) => {
  return `${prMerged} PR merged ✅`;
};

const prMilestoneToTitle = (prMilestone: number) => {
  return `${prMilestone} PR milestone 📍`;
};

const prMilestoneToReward = (prMilestone: number): number => {
  switch (prMilestone) {
    case 1:
      return 10;
    case 2:
      return 10;
    case 4:
      return 20;
    case 8:
      return 40;
    default:
      return 0;
  }
};
