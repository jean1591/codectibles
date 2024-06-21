"use client";

import { useEffect } from "react";
import { BadgesAndNextChallenges } from "./components/badgesAndNextChallenges";
import { LevelAndXp } from "./components/levelAndXp";
import { Milestones } from "./components/milestones";
import { User } from "@/app/api/interfaces/user";
import { useDispatch } from "react-redux";
import { setUser } from "@/app/lib/store/features/user/slice";

export default function Profile() {
  const dispatch = useDispatch();

  useEffect(() => {
    (async function getUser() {
      const userResponse = await fetch("/api/user");
      const user = (await userResponse.json()) as User;

      dispatch(setUser(user));
    })();
  }, []);

  return (
    <div className="lg:flex items-start justify-center gap-4 space-y-4 lg:space-y-0">
      <div className="lg:flex-col flex-1 space-y-4">
        <LevelAndXp />
        <Milestones />
      </div>

      <div className="flex-1">
        <BadgesAndNextChallenges />
      </div>
    </div>
  );
}
