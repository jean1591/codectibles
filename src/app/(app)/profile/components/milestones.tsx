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
        reward={`+ ${pr.reward.value} ${pr.reward.type.toUpperCase()}`}
        lowerBound={pr.previousmilestone.toString()}
        upperBound={pr.nextmilestone.toString()}
        progress={prProgress}
      />
      <div className="mt-8">
        <ProgressBarWithTitle
          title={`${comments.user} PR merged`}
          reward={`+ ${comments.reward.value} ${comments.reward.type.toUpperCase()}`}
          lowerBound={comments.previousmilestone.toString()}
          upperBound={comments.nextmilestone.toString()}
          progress={commentsProgress}
        />
      </div>
      <div className="mt-8">
        <ProgressBarWithTitle
          title={`${approves.user} PR merged`}
          reward={`+ ${approves.reward.value} ${approves.reward.type.toUpperCase()}`}
          lowerBound={approves.previousmilestone.toString()}
          upperBound={approves.nextmilestone.toString()}
          progress={approvesProgress}
        />
      </div>
    </div>
  );
};
