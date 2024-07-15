"use client";

import { FollowAction, Social } from "@/app/api/interfaces/social";
import { gradientBg, gradientText } from "@/app/(app)/ui";
import { setFollows, setProfile } from "@/app/lib/store/features/social/slice";
import { useDispatch, useSelector } from "react-redux";

import { ProfileSkeleton } from "./components/skeleton/userProfile";
import { RootState } from "@/app/lib/store/store";
import { UserProfile as TypeUserProfile } from "@/app/api/interfaces/social";
import { UserWithRelations } from "@/app/api/interfaces/user";
import { classNames } from "@/utils";
import { qualityToThemeMapper } from "@/app/(app)/collection/utils/mappers";
import { setUser } from "@/app/lib/store/features/user/slice";
import { useEffect } from "react";

export default function UserProfile({
  params,
}: {
  params: { username: string };
}) {
  const dispatch = useDispatch();
  const { username } = params;

  const { user } = useSelector((state: RootState) => state.user);
  const { follows, profile } = useSelector((state: RootState) => state.social);

  useEffect(() => {
    (async function getUserProfile() {
      const userWithRelationsResponse = await fetch("/api/users");
      const user =
        (await userWithRelationsResponse.json()) as UserWithRelations;

      dispatch(setUser(user));

      const socialResponse = await fetch(`/api/users/${user.id}/social`);
      const social = (await socialResponse.json()) as Social;

      dispatch(setFollows(social.follows));

      const userProfileResponse = await fetch(`/api/users/${username}`);
      const userProfile = (await userProfileResponse.json()) as TypeUserProfile;

      dispatch(setProfile(userProfile));
    })();
  }, []);

  if (!follows || !profile || !user) {
    return <ProfileSkeleton />;
  }

  const handleOnFollow = () => {
    const relationPayload = {
      action: "",
      followId: profile.id,
      userId: user.id,
    };

    // Unfollow
    if (profile.isRelation) {
      relationPayload.action = FollowAction.DELETE;

      dispatch(
        setFollows([
          ...follows.filter(({ username }) => username !== profile.username),
        ])
      );

      dispatch(setProfile({ ...profile, isRelation: false }));
    }

    // Follow
    if (!profile.isRelation) {
      relationPayload.action = FollowAction.ADD;

      dispatch(
        setFollows([
          ...follows,
          {
            id: profile.id,
            level: profile.level,
            username: profile.username,
            xp: profile.xp,
          },
        ])
      );

      dispatch(setProfile({ ...profile, isRelation: true }));
    }

    (async function addRelation() {
      await fetch(`/api/users/${user.id}/follow`, {
        method: "PUT",
        body: JSON.stringify(relationPayload),
        headers: { "Content-Type": "application/json" },
      });
    })();
  };

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
          <div className="relative">
            <p
              className={classNames(
                gradientText,
                gradientBg,
                "mt-8 text-3xl font-semibold"
              )}
            >
              {profile.username}
            </p>
            <div className="static sm:absolute sm:top-1/2 flex items-center justify-center sm:justify-end mt-2 sm:mt-0 w-full text-sm">
              <button
                onClick={handleOnFollow}
                className={classNames(
                  profile.isRelation
                    ? "bg-none border border-slate-500"
                    : gradientBg,
                  profile.isRelation
                    ? "bg-none border border-slate-500 text-slate-500"
                    : "text-white hover:text-slate-100",
                  " px-4 py-2 font-semibold uppercase rounded-md shadow-md hover:shadow-2xl"
                )}
              >
                {profile.isRelation ? "Following" : "Follow"}
              </button>
            </div>
          </div>
          <p className="mt-2 text-base text-slate-500">
            Joined {profile.createdAt}
          </p>
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
            <p className="text-xl font-medium">#{profile.rank}</p>
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
