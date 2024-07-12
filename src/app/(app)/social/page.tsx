"use client";

import {
  setFollows,
  setLeaderboard,
} from "@/app/lib/store/features/social/slice";

import { LeaderBoard } from "./components/leaderboard";
import { Social as SocialType } from "@/app/api/interfaces/social";
import { UserWithRelations } from "@/app/api/interfaces/user";
import { setUser } from "@/app/lib/store/features/user/slice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

export default function Social() {
  const dispatch = useDispatch();

  useEffect(() => {
    (async function getLeaderBoard() {
      const userWithRelationsResponse = await fetch("/api/users");
      const user =
        (await userWithRelationsResponse.json()) as UserWithRelations;

      dispatch(setUser(user));

      const socialResponse = await fetch(`/api/users/${user.id}/social`);
      const social = (await socialResponse.json()) as SocialType;

      dispatch(setFollows(social.follows));
      dispatch(setLeaderboard(social.leaderboard));
    })();
  }, []);

  return (
    <div className="lg:flex items-start justify-center gap-4 space-y-4 lg:space-y-0">
      <div className="flex-1">
        <LeaderBoard />
      </div>

      {/* Following / Followers */}
      <div className="lg:flex-col flex-1 space-y-4"></div>
    </div>
  );
}
