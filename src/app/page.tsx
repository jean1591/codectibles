import { ActivityFeed } from "./components/activityFeed";
import { Kingdom } from "./components/kingdom";
import { RewardsModal } from "./components/rewardsModal";

export default function Home() {
  return (
    <div>
      <Kingdom />

      <div className="mt-16">
        <ActivityFeed />
      </div>

      <RewardsModal />
    </div>
  );
}
