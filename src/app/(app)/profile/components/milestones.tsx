import { useSelector } from "react-redux";
import { ProgressBarWithTitle } from "../../ui";
import { RootState } from "@/app/lib/store/store";

export const Milestones = () => {
  const { user } = useSelector((state: RootState) => state.user);

  // TODO: display skeleton
  if (!user) {
    return <></>;
  }

  const {
    stats: { pr, comments, approves },
  } = user;

  return (
    <div className="bg-slate-200 rounded-lg p-4 lg:p-8 shadow-lg">
      <ProgressBarWithTitle stat={pr} />
      <div className="mt-8">
        <ProgressBarWithTitle stat={comments} />
      </div>
      <div className="mt-8">
        <ProgressBarWithTitle stat={approves} />
      </div>
    </div>
  );
};
