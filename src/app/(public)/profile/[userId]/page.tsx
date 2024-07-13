"use client";

import { gradientBg, gradientText } from "@/app/(app)/ui";
import { useDispatch, useSelector } from "react-redux";

import { ProfileSkeleton } from "./components/skeleton/page";
import { RootState } from "@/app/lib/store/store";
import { UserProfile as TypeUserProfile } from "@/app/api/interfaces/social";
import { classNames } from "@/utils";
import { qualityToThemeMapper } from "@/app/(app)/collection/utils/mappers";
import { setProfile } from "@/app/lib/store/features/social/slice";
import { useEffect } from "react";

export default function UserProfile({
  params,
}: {
  params: { userId: string };
}) {
  const dispatch = useDispatch();
  const { profile } = useSelector((state: RootState) => state.social);

  const { userId } = params;

  useEffect(() => {
    (async function getUser() {
      const userProfileResponse = await fetch(`/api/users/${userId}`);
      const userProfile = (await userProfileResponse.json()) as TypeUserProfile;

      dispatch(setProfile(userProfile));
    })();
  }, []);

  if (!profile) {
    return <ProfileSkeleton />;
  }

  return (
    <div className="mt-20">
      <div>
        {/* PROFILE */}
        <div className="text-center">
          <div className="flex items-center justify-center">
            <p
              className={classNames(
                gradientBg,
                "h-32 w-32 text-7xl rounded-full p-8"
              )}
            >
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
            {profile.username}
          </p>
          <p className="mt-2 text-base text-slate-500">{profile.createdAt}</p>
        </div>

        {/* STATS */}
        <div className="mt-16 flex items-center justify-between gap-x-4">
          <div className="bg-white rounded-lg p-4 w-full shadow-lg">
            <p className="text-xl font-medium">{profile.level}</p>
            <p className="text-base">Level</p>
          </div>
          <div className="bg-white rounded-lg p-4 w-full shadow-lg">
            <p className="text-xl font-medium">{profile.xp}</p>
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
            {profile.badges.map(({ icon, id }) => (
              <div
                key={id}
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
            {profile.collectibles.map(({ icon, id, quality }) => (
              <div
                key={id}
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
