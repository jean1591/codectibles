"use client";

import { setCollectibles, setUser } from "@/app/lib/store/features/user/slice";
import { useDispatch, useSelector } from "react-redux";

import { CollectibleType } from "@/app/api/interfaces/collectible";
import { Library } from "./components/library";
import { Library as LibrarySkeleton } from "./components/skeleton/library";
import { RootState } from "@/app/lib/store/store";
import { UserWithRelations } from "@/app/api/interfaces/user";
import { allAnimalEmojis } from "@/app/api/collectible/constants/collectibles";
import { setBadges } from "@/app/lib/store/features/badges/slice";
import { setStats } from "@/app/lib/store/features/stats/slice";
import { useEffect } from "react";

export default function Collection() {
  const dispatch = useDispatch();

  const { collectibles } = useSelector((state: RootState) => state.user);
  const animals = collectibles.filter(
    (collectible) => collectible.type === CollectibleType.ANIMALS
  );

  useEffect(() => {
    (async function getCollectibles() {
      const userResponse = await fetch("/api/users");
      const user = (await userResponse.json()) as UserWithRelations;

      dispatch(setUser(user));
      dispatch(setBadges(user.badges));
      dispatch(setStats(user.stats));
      dispatch(setCollectibles(user.collectibles));
    })();
  }, []);

  if (collectibles.length === 0) {
    return <LibrarySkeleton />;
  }

  return (
    <div>
      <Library
        collectibles={animals}
        maxCollectiblesSize={allAnimalEmojis.length}
      />
    </div>
  );
}
