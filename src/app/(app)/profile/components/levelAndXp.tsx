import { classNames } from "@/utils";
import { ProgressBar, gradientBg } from "../../ui";
import { useSelector } from "react-redux";
import { RootState } from "@/app/lib/store/store";

export const LevelAndXp = () => {
  const { user } = useSelector((state: RootState) => state.user);

  // TODO: display skeleton
  if (!user) {
    return <></>;
  }

  const {
    level,
    stats: { xp },
  } = user;

  const progress = Math.ceil(
    ((xp.user - xp.previousmilestone) /
      (xp.nextmilestone - xp.previousmilestone)) *
      100
  );

  return (
    <div className="bg-slate-200 rounded-lg p-4 lg:p-8 shadow-lg">
      <div className="flex items-center justify-between">
        <p
          className={classNames(
            gradientBg,
            "inline-block text-transparent bg-clip-text text-3xl font-medium text-left"
          )}
        >
          {`Level ${level}`}
        </p>
        <p className="text-xl text-right">{`${xp.user} XP`}</p>
      </div>

      <div className="mt-4">
        <ProgressBar
          lowerBound={`${xp.previousmilestone} XP`}
          upperBound={`${xp.nextmilestone} XP`}
          progress={progress}
        />
      </div>
    </div>
  );
};
