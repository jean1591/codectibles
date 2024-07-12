import { Milestones as MilestonesSkeleton } from "./skeleton/milestones";
import { ProgressBarWithTitle } from "../../ui";
import { Resource } from "@/app/api/interfaces/user";
import { RootState } from "@/app/lib/store/store";
import { useSelector } from "react-redux";

export const Milestones = () => {
  const { stats } = useSelector((state: RootState) => state.stats);

  if (!stats) {
    return <MilestonesSkeleton />;
  }

  const prStats = stats.find((stat) => stat.type === Resource.PR);
  const commentsStats = stats.find((stat) => stat.type === Resource.COMMENTS);
  const approvesStats = stats.find((stat) => stat.type === Resource.APPROVES);
  if (!prStats || !commentsStats || !approvesStats) {
    throw new Error("User have no stats");
  }

  return (
    <div className="bg-white rounded-lg p-4 lg:p-8 shadow-lg">
      <ProgressBarWithTitle stat={prStats} />
      <div className="mt-8">
        <ProgressBarWithTitle stat={commentsStats} />
      </div>
      <div className="mt-8">
        <ProgressBarWithTitle stat={approvesStats} />
      </div>
    </div>
  );
};
