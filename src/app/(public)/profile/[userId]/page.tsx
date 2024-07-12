"use client";

import { gradientBg, gradientText } from "@/app/(app)/ui";

import { badges } from "@/app/api/badges/constants/badges";
import { classNames } from "@/utils";
import { getRandomEmojis } from "@/app/(app)/profile/utils/getRandomEmojis";
import { qualityToThemeMapper } from "@/app/(app)/collection/utils/mappers";
import { useEffect } from "react";

const fakeBadges = badges.slice(0, 25);
const fakeCollectibles = getRandomEmojis(20);

export default function UserProfile({
  params,
}: {
  params: { userId: string };
}) {
  const { userId } = params;

  useEffect(() => {
    (async function getUser() {
      const userResponse = await fetch(`/api/users/${userId}`);
      const user = await userResponse.json();
    })();
  }, []);

  return (
    <div className="mt-20">
      <div>
        {/* PROFILE */}
        <div className="text-center">
          <div className="flex items-center justify-center">
            <p className="h-32 w-32 text-7xl rounded-full bg-slate-500 p-8">
              🦖
            </p>
          </div>
          <p
            className={classNames(
              gradientText,
              gradientBg,
              "mt-8 text-3xl font-semibold"
            )}
          >
            jean1591
          </p>
          <p className="mt-2 text-base text-slate-500">2020-01-01</p>
        </div>
        {/* STATS */}
        <div className="mt-16 flex items-center justify-between gap-x-4">
          <div className="bg-white rounded-lg p-4 w-full shadow-lg">
            <p className="text-xl font-medium">12</p>
            <p className="text-base">Level</p>
          </div>
          <div className="bg-white rounded-lg p-4 w-full shadow-lg">
            <p className="text-xl font-medium">1234</p>
            <p className="text-base">XP</p>
          </div>
          <div className="bg-white rounded-lg p-4 w-full shadow-lg">
            <p className="text-xl font-medium">#1</p>
            <p className="text-base">Rank</p>
          </div>
        </div>
        {/* BADGES */}
        <div className="mt-16 bg-white rounded-lg p-4 w-full shadow-lg">
          <p className="text-xl font-medium">Badges</p>

          <div className="mt-4 flex items-center justify-start flex-wrap gap-2">
            {fakeBadges.map(({ icon }) => (
              <div
                key={icon}
                className={classNames(
                  gradientBg,
                  "flex items-center justify-center h-16 w-16 border-2 border-slate-500 rounded-lg shadow-md"
                )}
              >
                <p className="text-3xl">{icon}</p>
              </div>
            ))}
          </div>
        </div>
        {/* COLLECTION */}
        <div className="mt-16 bg-white rounded-lg p-4 w-full shadow-lg">
          <p className="text-xl font-medium">Collection</p>

          <div className="mt-4 flex items-center justify-start flex-wrap gap-2">
            {fakeCollectibles.map(({ icon, quality }) => (
              <div
                key={icon}
                className={classNames(
                  qualityToThemeMapper[quality],
                  "flex items-center justify-center h-16 w-16 border-2 border-slate-500 rounded-lg shadow-md"
                )}
              >
                <p className="text-3xl">{icon}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FOLLOWS */}
        <div className="mt-16"></div>
      </div>
    </div>
  );
}
