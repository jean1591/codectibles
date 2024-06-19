import {
  setNextRewards,
  setRewards,
} from "../lib/store/features/rewards/slice";
import { useDispatch, useSelector } from "react-redux";

import { NoRewardsItem } from "./noRewardsItems";
import { RewardItem } from "./rewardItem";
import { RootState } from "../lib/store/store";
import { useEffect } from "react";

export const Rewards = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    fetch("/api/rewards")
      .then((res) => res.json())
      .then(({ nextRewards, rewards }) => {
        dispatch(setRewards(rewards));
        dispatch(setNextRewards(nextRewards));
      });
  }, []);

  const { rewards } = useSelector((state: RootState) => state.rewards);

  return (
    <div>
      {rewards.length ? (
        rewards.map((reward) => (
          <RewardItem key={reward.title} reward={reward} />
        ))
      ) : (
        <NoRewardsItem />
      )}
    </div>
  );
};
