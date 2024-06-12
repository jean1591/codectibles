import { ActivityFeed } from "./components/activityFeed";
import { Kingdom } from "./components/kingdom";
import { RewardButton } from "./components/getRewardsButton";
import { RewardsModal } from "./components/rewardsModal";

export default function Home() {
  return (
    <div>
      <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-x-8">
        <div className="mt-20 sm:mt-0 col-span-1 sm:col-span-2 order-2 sm:order-1">
          <Kingdom />
        </div>

        <div className="col-span-1 order-1 sm:order-2">
          <RewardButton />
          <div className="mt-20 hidden sm:block">
            <ActivityFeed />
          </div>
        </div>
      </div>

      <div className="mt-20 block sm:hidden col-span-1">
        <ActivityFeed />
      </div>

      <RewardsModal />
    </div>
  );
}
