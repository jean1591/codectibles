"use client";

import { useDispatch, useSelector } from "react-redux";

import { Badges } from "./components/badges";
import { EmojiCardsModal } from "../profile/components/emojiCardsModal";
import { LevelAndXp } from "../profile/components/levelAndXp";
import { Milestones } from "./components/milestones";
import { PrToClaim } from "./components/prToClaim";
import { RootState } from "@/app/lib/store/store";
import { UserWithRelations } from "@/app/api/interfaces/user";
import { setBadges } from "@/app/lib/store/features/badges/slice";
import { setStats } from "@/app/lib/store/features/stats/slice";
import { setUser } from "@/app/lib/store/features/user/slice";
import { useEffect } from "react";

export default function Quests() {
  const dispatch = useDispatch();
  const { displayGetEmojisModal } = useSelector(
    (state: RootState) => state.interactions
  );

  useEffect(() => {
    (async function getUser() {
      const prResponse = await fetch("/api/github");
      await prResponse.json();

      const userWithRelationsResponse = await fetch("/api/user");
      const user =
        (await userWithRelationsResponse.json()) as UserWithRelations;

      dispatch(setUser(user));
      dispatch(setBadges(user.badges));
      dispatch(setStats(user.stats));
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

      {displayGetEmojisModal && <EmojiCardsModal />}
    </div>
  );
}
