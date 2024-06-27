"use client";

import { useEffect, useState } from "react";
import { LevelAndXp } from "./components/levelAndXp";
import { User } from "@/app/api/interfaces/user";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/app/lib/store/features/user/slice";
import { redirect } from "next/navigation";
import { Activities } from "./components/activities";
import { Badges } from "./components/badges";
import { RootState } from "@/app/lib/store/store";
import { EmojiCardsModal } from "./components/emojiCardsModal";

export default function Profile() {
  const dispatch = useDispatch();
  const { displayGetEmojisModal } = useSelector(
    (state: RootState) => state.interactions
  );
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    (async function getUser() {
      try {
        const tokenResponse = await fetch("/api/user/token");
        const { token } = (await tokenResponse.json()) as {
          token: string | null;
        };

        if (token === null) {
          setShouldRedirect(true);

          return;
        }
      } catch (error) {
        console.error(error);
        setShouldRedirect(true);

        return;
      }

      const userResponse = await fetch("/api/user");
      const user = (await userResponse.json()) as User;

      dispatch(setUser(user));
    })();
  }, []);

  useEffect(() => {
    if (shouldRedirect) {
      redirect("/login");
    }
  }, [shouldRedirect]);

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
