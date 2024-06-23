"use client";

import { useEffect } from "react";
import { BadgesAndNextChallenges } from "./components/badgesAndNextChallenges";
import { LevelAndXp } from "./components/levelAndXp";
import { Milestones } from "./components/milestones";
import { Stat, User, UserDb } from "@/app/api/interfaces/user";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/app/lib/store/features/user/slice";
import { classNames } from "@/utils";
import { gradientBg } from "../ui";
import { RootState } from "@/app/lib/store/store";

export default function Profile() {
  const dispatch = useDispatch();

  useEffect(() => {
    (async function getUser() {
      const prResponse = await fetch("/api/pr");
      await prResponse.json();

      const userResponse = await fetch("/api/user");
      const user = (await userResponse.json()) as User;

      dispatch(setUser(user));
    })();
  }, []);

  return (
    <div className="lg:flex items-start justify-center gap-4 space-y-4 lg:space-y-0">
      <div className="lg:flex-col flex-1 space-y-4">
        <LevelAndXp />
        <PrToClaim />
        <Milestones />
      </div>

      <div className="flex-1">
        <BadgesAndNextChallenges />
      </div>
    </div>
  );
}

// TODO: extract to component
// TODO: once extracted, delete useless import in this file
// TODO: create constant for merged PR XP (no magix string "40")
const PrToClaim = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.user);

  // TODO: display skeleton
  if (user === null) {
    return <></>;
  }

  const { prToClaim } = user;

  const handleClaimPr = () => {
    const updatedXp: Stat = {
      ...user.stats.xp,
      user: user.stats.xp.user + prToClaim * 40,
    };

    const updatedUser = {
      authUserId: user.authUserId,
      prToClaim: 0,
      stats: { ...user.stats, xp: updatedXp },
    } as UserDb;

    (async function updateUser() {
      await fetch("/api/user", {
        method: "PUT",
        body: JSON.stringify({ user: updatedUser }),
        headers: { "Content-Type": "application/json" },
      });
    })();

    (async function updatePr() {
      await fetch("/api/pr", {
        method: "PUT",
        body: JSON.stringify({
          authUserId: user.authUserId,
          claimed: true,
        }),
        headers: { "Content-Type": "application/json" },
      });
    })();

    const stateUser: User = {
      ...user,
      prToClaim: 0,
      stats: { ...user.stats, xp: updatedXp },
    };

    dispatch(setUser(stateUser));
  };

  if (prToClaim === 0) {
    return (
      <div className="bg-slate-200 rounded-lg p-4 lg:p-8 shadow-lg">
        <div className="flex items-center justify-between">
          <p className="text-xl font-medium text-left">No new merged PR</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-200 rounded-lg p-4 lg:p-8 shadow-lg">
      <div className="flex items-center justify-between">
        <p className="text-xl font-medium text-left">{`${prToClaim} new PR merged`}</p>
        <button
          onClick={handleClaimPr}
          className={classNames(
            gradientBg,
            "text-slate-100 py-1 px-4 rounded-md text-base text-right animate-bounce"
          )}
        >
          {`+ ${prToClaim * 40} XP`}
        </button>
      </div>
    </div>
  );
};
