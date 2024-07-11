"use client";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { Activities } from "./components/activities";
import { Badges } from "./components/badges";
import { EmojiCardsModal } from "./components/emojiCardsModal";
import { LevelAndXp } from "./components/levelAndXp";
import { RootState } from "@/app/lib/store/store";
import { UserWithRelations } from "@/app/api/interfaces/user";
import { redirect } from "next/navigation";
import { setBadges } from "@/app/lib/store/features/badges/slice";
import { setStats } from "@/app/lib/store/features/stats/slice";
import { setUser } from "@/app/lib/store/features/user/slice";

export default function Profile() {
  const dispatch = useDispatch();
  const { displayGetEmojisModal } = useSelector(
    (state: RootState) => state.interactions
  );
  const [missingTokenRedirect, setMissingTokenRedirect] = useState(false);

  useEffect(() => {
    (async function getUser() {
      try {
        const tokenResponse = await fetch("/api/users/token");
        const { token } = (await tokenResponse.json()) as {
          token: string | null;
        };

        if (token === null) {
          setMissingTokenRedirect(true);

          return;
        }
      } catch (error) {
        console.error(error);
        setMissingTokenRedirect(true);

        return;
      }

      const userWithRelationsResponse = await fetch("/api/users");
      const user =
        (await userWithRelationsResponse.json()) as UserWithRelations;

      dispatch(setUser(user));
      dispatch(setBadges(user.badges));
      dispatch(setStats(user.stats));
    })();
  }, []);

  useEffect(() => {
    if (missingTokenRedirect) {
      redirect("/token");
    }
  }, [missingTokenRedirect]);

  return (
    <div className="lg:flex items-start justify-center gap-4 space-y-4 lg:space-y-0">
      <div className="lg:flex-col flex-1 space-y-4">
        <LevelAndXp />
        <Activities />
      </div>

      <div className="flex-1">
        <Badges />
      </div>

      {displayGetEmojisModal && <EmojiCardsModal />}
    </div>
  );
}
