import { gradientBg, gradientText } from "../../ui";

import { Rank } from "@/app/api/interfaces/leaderboard";
import { classNames } from "@/utils";

export const LeaderBoard = () => {
  const user = { username: "jean1591" };
  const { username } = user;

  const leaderboard: Rank[] = [
    {
      rank: "🥇",
      username: "notjean1591",
      xp: 1234,
    },
    {
      rank: "🥈",
      username: "notjean1591",
      xp: 1234,
    },
    {
      rank: "🥉",
      username: "notjean1591",
      xp: 1234,
    },
    {
      rank: 4,
      username: "notjean1591",
      xp: 1234,
    },
    {
      rank: 234,
      username: "jean1591",
      xp: 34,
    },
  ];

  return (
    <div className="bg-slate-100 rounded-lg p-4 lg:p-8 shadow-lg">
      <p className="text-2xl font-medium">Leaderboard</p>

      <div className="mt-8">
        <div className="divide-y divide-slate-200">
          {leaderboard.map((leaderboardUser, index) => (
            <div
              key={leaderboardUser.rank}
              className={classNames(index === 0 ? "pb-4" : "py-4")}
            >
              <LeaderboardUser
                leaderboardUser={leaderboardUser}
                loggedUsername={username}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const LeaderboardUser = ({
  leaderboardUser,
  loggedUsername,
}: {
  leaderboardUser: Rank;
  loggedUsername: string;
}) => {
  const { rank, username, xp } = leaderboardUser;
  const isCurrentUser = username === loggedUsername;

  return (
    <div className="grid grid-cols-4 text-lg font-medium gap-x-4">
      <p
        className={classNames(
          isCurrentUser ? gradientBg : "",
          isCurrentUser ? gradientText : "",
          ["🥇", "🥈", "🥉"].includes(rank.toString()) ? "text-xl" : "text-lg",
          "text-left"
        )}
      >
        {rank}
      </p>
      <div className="col-span-2">
        <p
          className={classNames(
            isCurrentUser ? gradientBg : "",
            isCurrentUser ? gradientText : "",
            "text-left"
          )}
        >
          {username}
        </p>
      </div>
      <p
        className={classNames(
          isCurrentUser ? gradientBg : "",
          isCurrentUser ? gradientText : "",
          "text-right"
        )}
      >
        {xp} XP
      </p>
    </div>
  );
};
