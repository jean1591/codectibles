import { classNames } from "@/utils";
import { gradientBg } from "../../ui";


export const LevelAndXp = () => {
    return (
      <div className="bg-slate-200 rounded-lg p-4 lg:p-8">
        <div className="flex items-center justify-between">
          <p className="text-2xl font-medium text-left">Level 76</p>
          <p className="text-xl text-right">3653 XP</p>
        </div>
  
        <div className="mt-8">
          <div className="overflow-hidden rounded-full bg-slate-300">
            <div
              className={classNames(gradientBg, "h-2 rounded-full")}
              style={{ width: "37.5%" }}
            />
          </div>
          <div className="mt-4 flex items-center justify-between text-base font-medium">
            <p
              className={classNames(
                gradientBg,
                "inline-block text-left text-transparent bg-clip-text"
              )}
            >
              3500 XP
            </p>
            <p className="text-right">5000 XP</p>
          </div>
        </div>
      </div>
    );
  };