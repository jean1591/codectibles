import { useSelector } from "react-redux";
import { ProgressBarWithTitle } from "../../ui";
import { RootState } from "@/app/lib/store/store";
import { computeProgress } from "@/utils/computeProgress";

export const Milestones = () => {
  const { user } = useSelector((state: RootState) => state.user);

  // TODO: display skeleton
  if (!user) {
    return <></>;
  }

  const {
    stats: { pr, comments, approves },
  } = user;

  const prProgress = computeProgress(pr.user, pr.previousmilestone, pr.nextmilestone)
  const commentsProgress = computeProgress(comments.user, comments.previousmilestone, comments.nextmilestone)
  const approvesProgress = computeProgress(approves.user, approves.previousmilestone, approves.nextmilestone)

  return (
    <div className="bg-slate-200 rounded-lg p-4 lg:p-8 shadow-lg">
      <ProgressBarWithTitle
        title={`${pr.user} PR merged`}
        reward={`+ ${pr.reward} ${pr.rewardType.toUpperCase()}`}
        lowerBound={pr.previousmilestone.toString()}
        upperBound={pr.nextmilestone.toString()}
        progress={prProgress}
      />
      <div className="mt-8">
        <ProgressBarWithTitle
          title={`${comments.user} comments made`}
          reward={`+ ${comments.reward} ${comments.rewardType.toUpperCase()}`}
          lowerBound={comments.previousmilestone.toString()}
          upperBound={comments.nextmilestone.toString()}
          progress={commentsProgress}
        />
      </div>
      <div className="mt-8">
        <ProgressBarWithTitle
          title={`${approves.user} PR approved`}
          reward={`+ ${approves.reward} ${approves.rewardType.toUpperCase()}`}
          lowerBound={approves.previousmilestone.toString()}
          upperBound={approves.nextmilestone.toString()}
          progress={approvesProgress}
        />
      </div>
    </div>
  );
};
