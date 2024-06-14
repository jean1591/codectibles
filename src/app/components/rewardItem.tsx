"use client";

import { useDispatch, useSelector } from "react-redux";

import { Reward } from "../interfaces";
import { RootState } from "../lib/store/store";
import { claimReward } from "../lib/store/features/rewards/slice";
import { setCoins } from "../lib/store/features/kingdom/slice";

// TODO: use setCoins(rewards) or setCoins(-rewards)
export const RewardItem = ({ reward }: { reward: Reward }) => {
  const { details, reward: rewardValue, title, type } = reward;
  const dispatch = useDispatch();
  const { coins } = useSelector((state: RootState) => state.kingdom);

  const onClaimReward = async () => {
    // Update state
    dispatch(setCoins(coins + rewardValue));
    dispatch(claimReward(title));

    // Update DB
    fetch("/api/pr", {
      method: "PUT",
      body: JSON.stringify({ details, reward: rewardValue, type }),
      headers: { "Content-Type": "application/json" },
    }).then((res) => res.json());
  };

  return (
    <div className="my-8 px-4 flex items-center justify-between">
      <p className="text-left text-base">{title}</p>

      <button
        className="flex items-center justify-center bg-red-400 hover:bg-red-400/75 text-base text-right px-6 py-2 rounded-full uppercase font-semibold"
        onClick={onClaimReward}
      >
        Claim 🎁
      </button>
    </div>
  );
};
