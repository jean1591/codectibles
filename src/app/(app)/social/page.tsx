import { LeaderBoard } from "./components/leaderboard";

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
