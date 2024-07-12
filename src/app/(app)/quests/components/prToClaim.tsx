import { Resource, User } from "@/app/api/interfaces/user";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";

import JSConfetti from "js-confetti";
// TODO: put skeleton back
import { PrToClaim as PrToClaimSkeleton } from "./skeleton/prToClaim";
import { RootState } from "@/app/lib/store/store";
import { Stat } from "@/app/api/interfaces/stats";
import { classNames } from "@/utils";
import { gradientBg } from "../../ui";
import { setUser } from "@/app/lib/store/features/user/slice";
import { updateStat } from "@/app/lib/store/features/stats/slice";

const REWARD_PER_PR = 40;

export const PrToClaim = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.user);
  const { stats } = useSelector((state: RootState) => state.stats);

  const jsConfetti = useRef<JSConfetti | null>(null);

  useEffect(() => {
    jsConfetti.current = new JSConfetti();
  }, []);

  if (!stats || !user) {
    return <></>;
  }

  const { prToClaim } = user;

  const handleClaimPr = () => {
    jsConfetti.current && jsConfetti.current.addConfetti();

    const xpStats = stats.find((stat) => stat.type === Resource.XP);
    if (!xpStats) {
      throw new Error("User have no XP stats");
    }

    const updatedXp: Stat = {
      ...xpStats,
      value: xpStats.value + prToClaim * REWARD_PER_PR,
    };

    (async function prClaimedUpdate() {
      const prClaimedPayload = {
        updatedXpValue: xpStats.value + prToClaim * REWARD_PER_PR,
      };

      await fetch(`/api/users/${user.id}/pr-claimed`, {
        method: "PUT",
        body: JSON.stringify(prClaimedPayload),
        headers: { "Content-Type": "application/json" },
      });
    })();

    const stateUser: User = {
      ...user,
      prToClaim: 0,
    };

    dispatch(setUser(stateUser));
    dispatch(updateStat(updatedXp));
  };

  if (prToClaim === 0) {
    return (
      <div className="bg-white rounded-lg p-4 lg:p-8 shadow-lg">
        <div className="flex items-center justify-between">
          <p className="text-xl font-medium text-left">No new merged PR</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-4 lg:p-8 shadow-lg">
      <div className="flex items-center justify-between">
        <p className="text-xl font-medium text-left">{`${prToClaim} new PR merged`}</p>
        <button
          onClick={handleClaimPr}
          className={classNames(
            gradientBg,
            "text-slate-100 py-1 px-4 rounded-md text-base text-right animate-bounce"
          )}
        >
          {`+ ${prToClaim * REWARD_PER_PR} XP`}
        </button>
      </div>
    </div>
  );
};
