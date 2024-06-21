import { classNames } from "@/utils";
import { ProgressBar, gradientBg } from "../../ui";

export const LevelAndXp = () => {
  return (
    <div className="bg-slate-200 rounded-lg p-4 lg:p-8 shadow-lg">
      <div className="flex items-center justify-between">
        <p
          className={classNames(
            gradientBg,
            "inline-block text-transparent bg-clip-text text-3xl font-medium text-left"
          )}
        >
          Level 76
        </p>
        <p className="text-xl text-right">3653 XP</p>
      </div>

      <div className="mt-4">
        <ProgressBar
          lowerBound="3500 XP"
          upperBound="5000 XP"
          progress={45.3}
        />
      </div>
    </div>
  );
};
