"use client";

import { useEffect } from "react";
import { BadgesAndNextChallenges } from "./components/badgesAndNextChallenges";
import { LevelAndXp } from "./components/levelAndXp";
import { Milestones } from "./components/milestones";
import { User } from "@/app/api/interfaces/user";
import { useDispatch } from "react-redux";
import { setUser } from "@/app/lib/store/features/user/slice";
import { classNames } from "@/utils";
import { gradientBg } from "../ui";

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
        <LatestPr />
        <Milestones />
      </div>

      <div className="flex-1">
        <BadgesAndNextChallenges />
      </div>
    </div>
  );
}

const LatestPr = () => {
  return (
    <div className="bg-slate-200 rounded-lg p-4 lg:p-8 shadow-lg">
      <div className="flex items-center justify-between">
        <p className="text-xl font-medium text-left">4 new PR merged</p>
        <button
          className={classNames(
            gradientBg,
            "text-slate-100 py-1 px-4 rounded-md text-base text-right animate-bounce"
          )}
        >
          + 160 XP
        </button>
      </div>
    </div>
  );
};
