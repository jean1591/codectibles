"use client";

import { useDispatch, useSelector } from "react-redux";

import { Reward, User } from "../interfaces";
import { RootState } from "../lib/store/store";
import { claimReward } from "../lib/store/features/rewards/slice";
import { setUser } from "../lib/store/features/user/slice";

export const RewardItem = ({ reward }: { reward: Reward }) => {
  const { details, reward: rewardValue, title, type } = reward;
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.user);

  const onClaimReward = async () => {
    // Update state
    dispatch(setUser({...user, coins: user!.coins + rewardValue} as User));
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
        className="bg-gradient-to-b from-red-500 to-red-400 hover:from-red-400 hover:to-red-300 animate-[wiggle_2s_ease-in-out_infinite] flex items-center justify-center text-base text-right px-6 py-2 rounded-full uppercase font-semibold"
        onClick={onClaimReward}
      >
        Claim 🎁
      </button>
    </div>
  );
};
