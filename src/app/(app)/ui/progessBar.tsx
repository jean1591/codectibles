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
  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-xl font-medium text-left">{title}</p>
        <p className="text-base text-right">{reward}</p>
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

const ProgressBar = ({
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
