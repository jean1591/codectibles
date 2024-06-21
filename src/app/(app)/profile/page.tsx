import { BadgesAndNextChallenges } from "./components/badgesAndNextChallenges";
import { LevelAndXp } from "./components/levelAndXp";
import { Milestones } from "./components/milestones";

export default async function Profile() {
  return (
    <div className="lg:flex items-start justify-center gap-4 space-y-4 lg:space-y-0">
      <div className="lg:flex-col flex-1 space-y-4">
        <LevelAndXp />
        <Milestones />
      </div>

      <div className="flex-1">
        <BadgesAndNextChallenges />
      </div>
    </div>
  );
}


