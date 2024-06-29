"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/lib/store/store";
import { Library } from "./components/library";
import { Collectible, CollectibleType } from "@/app/api/interfaces/collectible";
import { allAnimalEmojis } from "./utils/collectibles";
import { useEffect } from "react";
import { setCollectibles, setUser } from "@/app/lib/store/features/user/slice";
import { User } from "@/app/api/interfaces/user";

export default function Collection() {
  const dispatch = useDispatch();
  
  const { collectibles } = useSelector((state: RootState) => state.user);
  const animals = collectibles.filter(
    (collectible) => collectible.type === CollectibleType.ANIMALS
  );
  
  useEffect(() => {
    (async function getCollectibles() {
      const userResponse = await fetch("/api/user");
      const user = (await userResponse.json()) as User;

      dispatch(setUser(user));

      const collectiblesResponse = await fetch(`/api/collectible/user/${user.authUserId}`);
      const collectibles = (await collectiblesResponse.json()) as Collectible[];

      dispatch(setCollectibles(collectibles));
    })();
  }, []);

  return (
    <div>
      <Library collectibles={animals} maxCollectiblesSize={allAnimalEmojis.length} />
    </div>
  );
}
