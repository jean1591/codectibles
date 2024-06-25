"use client";

import { useEffect, useState } from "react";
import { Badges } from "./components/badges";
import { LevelAndXp } from "./components/levelAndXp";
import { LevelAndXp as LevelAndXpSkeleton } from "./components/skeleton/levelAndXp";
import { PrToClaim as PrToClaimSkeleton } from "./components/skeleton/prToClaim";
import { Milestones } from "./components/milestones";
import { User } from "@/app/api/interfaces/user";
import { useDispatch } from "react-redux";
import { setUser } from "@/app/lib/store/features/user/slice";
import { PrToClaim } from "./components/prToClaim";
import { redirect } from "next/navigation";

export default function Profile() {
  const dispatch = useDispatch();
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    (async function getUser() {
      try {
        const tokenResponse = await fetch("/api/user/token");
        const { token } = (await tokenResponse.json()) as { token: string | null };

        if (token === null) {
          setShouldRedirect(true);

          return
        }
      } catch (error) {
        console.error(error)
        setShouldRedirect(true);

        return
      }

      const prResponse = await fetch("/api/github");
      await prResponse.json();

      const userResponse = await fetch("/api/user");
      const user = (await userResponse.json()) as User;

      dispatch(setUser(user));

      setIsLoading(false)
    })();
  }, []);

  useEffect(() => {
    if (shouldRedirect) {
      redirect("/token");
    }
  }, [shouldRedirect]);

  if (isLoading) {
    return (
      <div className="lg:flex items-start justify-center gap-4 space-y-4 lg:space-y-0 animate-pulse">
      <div className="lg:flex-col flex-1 space-y-4">
        <LevelAndXpSkeleton />
        <PrToClaimSkeleton />
      </div>

      <div className="flex-1">
      </div>
    </div>)
  }

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
