import { useSelector } from "react-redux";
import { RewardItem } from "./rewardItem";
import { RootState } from "../lib/store/store";
import { NoRewardsItem } from "./noRewardsItems";

export const Rewards = () => {
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
