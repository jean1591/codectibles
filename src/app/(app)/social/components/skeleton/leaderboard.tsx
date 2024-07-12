import { classNames } from "@/utils";

const fakeLeaderboard = [1, 2, 3, 4, 5];

export const LeaderBoard = () => {
  return (
    <div className="bg-slate-100 rounded-lg p-4 lg:p-8 shadow-lg">
      <p className="text-2xl font-medium">Leaderboard</p>

      <div className="mt-8">
        <div className="divide-y divide-slate-200">
          {fakeLeaderboard.map((user, userIndex) => (
            <div
              key={user}
              className={classNames(userIndex === 0 ? "pb-4" : "py-4")}
            >
              <LeaderboardUser />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const LeaderboardUser = () => {
  return (
    <div className="grid grid-cols-1 text-lg font-medium animate-pulse">
      <p className="bg-slate-300 text-slate-300 text-lg">jean1591</p>
    </div>
  );
};
