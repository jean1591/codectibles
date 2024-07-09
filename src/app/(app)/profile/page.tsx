"use client";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { Activities } from "./components/activities";
import { Badges } from "./components/badges";
import { EmojiCardsModal } from "./components/emojiCardsModal";
import { LevelAndXp } from "./components/levelAndXp";
import { RootState } from "@/app/lib/store/store";
import { User } from "@/app/api/interfaces/user";
import { redirect } from "next/navigation";
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
        const tokenResponse = await fetch("/api/user/token");
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

      // TODO: change state with stats from db table and not from user
      const userResponse = await fetch("/api/user");
      const user = (await userResponse.json()) as User;

      dispatch(setUser(user));
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
