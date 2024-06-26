"use client";

import { useEffect } from "react";
import { User } from "@/app/api/interfaces/user";
import { useDispatch } from "react-redux";
import { setUser } from "@/app/lib/store/features/user/slice";
import { LevelAndXp } from "../profile/components/levelAndXp";
import { PrToClaim } from "./components/prToClaim";
import { Milestones } from "./components/milestones";
import { Badges } from "./components/badges";

export default function Quests() {
  const dispatch = useDispatch();
  useEffect(() => {
    (async function getUser() {
      const prResponse = await fetch("/api/github");
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
        <Badges />
      </div>
    </div>
  );
}
