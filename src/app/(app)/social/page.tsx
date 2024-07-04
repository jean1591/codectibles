import { gradientBg, gradientText } from "../ui";

import { classNames } from "@/utils";

export default function Social() {
  return (
    <div className="lg:flex items-start justify-center gap-4 space-y-4 lg:space-y-0">
      <div className="flex-1">
        <LeaderBoard />
      </div>

      {/* Following / Followers */}
      <div className="lg:flex-col flex-1 space-y-4"></div>
    </div>
  );
}

interface Rank {
  rank: number | "🥇" | "🥈" | "🥉";
  username: string;
  xp: number;
}

const LeaderBoard = () => {
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
              {leaderboardUser.username === username ? (
                <LeaderboardLoggedUser leaderboardUser={leaderboardUser} />
              ) : (
                <LeaderboardUser leaderboardUser={leaderboardUser} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const LeaderboardUser = ({ leaderboardUser }: { leaderboardUser: Rank }) => {
  const { rank, username, xp } = leaderboardUser;

  return (
    <div className="grid grid-cols-4 text-lg font-medium gap-x-4">
      <p
        className={classNames(
          ["🥇", "🥈", "🥉"].includes(rank.toString()) ? "text-xl" : "text-lg",
          "text-left"
        )}
      >
        {rank}
      </p>
      <p className="text-left col-span-2">{username}</p>
      <p className="text-right">{xp} XP</p>
    </div>
  );
};

const LeaderboardLoggedUser = ({
  leaderboardUser,
}: {
  leaderboardUser: Rank;
}) => {
  const { rank, username, xp } = leaderboardUser;

  return (
    <div className="grid grid-cols-4 text-lg font-medium gap-x-4">
      <p
        className={classNames(
          gradientBg,
          gradientText,
          ["🥇", "🥈", "🥉"].includes(rank.toString()) ? "text-xl" : "text-lg",
          "text-left"
        )}
      >
        {rank}
      </p>
      <div className="col-span-2">
        <p className={classNames(gradientBg, gradientText, "text-left")}>
          {username}
        </p>
      </div>
      <p className={classNames(gradientBg, gradientText, "text-right")}>
        {xp} XP
      </p>
    </div>
  );
};
