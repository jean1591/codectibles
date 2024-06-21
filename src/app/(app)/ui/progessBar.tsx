import { classNames } from "@/utils";
import { gradientBg } from "./constants";

export const ProgressBarWithTitle = ({
  title,
  reward,
  lowerBound,
  upperBound,
  progress,
}: {
  reward: string;
  title: string;
  lowerBound: string;
  upperBound: string;
  progress: number;
}) => {
  // progress >= 100 ✅
  // display claim on reward ✅
  // At claim, update DB with new previous/next milestone
  // Fetch updated user
  // reload component with updated data (miletone, level, xp, coins, ...)

  const handleClaimMilestone = () => {
    console.log(`Claiming ${reward}`);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-xl font-medium text-left">{title}</p>
        {progress >= 100 ? (
          <button
            onClick={handleClaimMilestone}
            className={classNames(
              gradientBg,
              "text-slate-100 py-1 px-4 rounded-md text-base text-right animate-bounce"
            )}
          >
            {reward}
          </button>
        ) : (
          <p className="text-base text-right">{reward}</p>
        )}
      </div>

      <div className="mt-4">
        <ProgressBar
          lowerBound={lowerBound}
          upperBound={upperBound}
          progress={progress}
        />
      </div>
    </div>
  );
};

export const ProgressBar = ({
  lowerBound,
  upperBound,
  progress,
}: {
  lowerBound: string;
  upperBound: string;
  progress: number;
}) => {
  return (
    <div>
      <div className="overflow-hidden rounded-full bg-slate-300">
        <div
          className={classNames(gradientBg, "h-2 rounded-full")}
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="mt-4 flex items-center justify-between text-base font-medium">
        <p
          className={classNames(
            gradientBg,
            "inline-block text-left text-transparent bg-clip-text"
          )}
        >
          {lowerBound}
        </p>
        <p className="text-right">{upperBound}</p>
      </div>
    </div>
  );
};
