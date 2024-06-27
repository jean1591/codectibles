import { classNames } from "@/utils";
import { qualityToThemeMapper } from "../utils/mappers";
import { Quality } from "../interface/tmp";

const LockedBgTheme =
  "bg-gradient-to-tr from-slate-300 via-slate-100 to-slate-300 border-slate-300";

export const UnlockedCollectible = ({
  count,
  icon,
  quality,
}: {
  count: number;
  icon: string;
  quality: Quality;
}) => {
  const qualityTheme = qualityToThemeMapper[quality];

  return (
    <div
      className={classNames(
        qualityTheme,
        "relative border-2 flex items-center justify-center h-20 w-20 rounded-lg shadow-md"
      )}
    >
      <p className="text-4xl">{icon}</p>
      <p
        className={classNames(
          quality === Quality.COMMON ? "border-violet-500" : "",
          quality === Quality.RARE ? "border-red-500" : "",
          quality === Quality.LEGENDARY ? "border-yellow-400" : "",
          "absolute flex items-center justify-center h-5 w-5 bg-slate-200 rounded-full border-[1px] text-semibold text-xs bottom-1 right-1"
        )}
      >
        {count}
      </p>
    </div>
  );
};

export const LockedCollectible = () => {
  return (
    <div
      className={classNames(
        LockedBgTheme,
        "border-2 relative flex items-center justify-center h-20 w-20 rounded-lg shadow-md text-center"
      )}
    >
      <p className="opacity-50 text-3xl">🙈</p>
    </div>
  );
};
