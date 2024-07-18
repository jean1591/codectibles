"use client";

import { Collectible, CollectibleType } from "@/app/api/interfaces/collectible";
import { setCollectibles, setUser } from "@/app/lib/store/features/user/slice";
import { useDispatch, useSelector } from "react-redux";

import { Library } from "./components/library";
import { Library as LibrarySkeleton } from "./components/skeleton/library";
import { RootState } from "@/app/lib/store/store";
import { User } from "@/app/api/interfaces/user";
import { allAnimalEmojis } from "@/app/api/collectible/constants/collectibles";
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
      const user = (await userResponse.json()) as User;

      dispatch(setUser(user));

      const collectiblesResponse = await fetch(
        `/api/users/${user.id}/collectibles`
      );
      const collectibles = (await collectiblesResponse.json()) as Collectible[];

      const formatedCollectibles = collectibles.map((collectible) => ({
        ...collectible,
        icon:
          user.id === "161b45a2-7380-40b3-9a90-bf2e094cc0b1"
            ? "🐛"
            : collectible.icon,
      }));

      dispatch(setCollectibles(formatedCollectibles));
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
