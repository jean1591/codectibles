import { classNames } from "@/utils";
import { UnlockedCollectible } from "./collectibles";
import { qualityToThemeMapper } from "../utils/mappers";
import { Collectible, Quality } from "../interface/tmp";

export const QualitySection = ({
  collectibles,
  quality,
}: {
  collectibles: Collectible[];
  quality: Quality;
}) => {
  const qualityTheme = qualityToThemeMapper[quality];

  return (
    <div>
      <div className="flex items-center justify-start gap-x-4 font-medium">
        <p
          className={classNames(
            qualityTheme,
            "inline-block text-transparent bg-clip-text text-2xl text-left capitalize"
          )}
        >
          {quality}
        </p>
        <span className="flex items-center justify-center rounded-md h-7 w-7 text-sm text-slate-600 ring-1 ring-inset ring-slate-600/20">
          {collectibles.length}
        </span>
      </div>

      <div className="mt-4 flex items-center justify-start flex-wrap gap-4">
        {collectibles.map(({ count, icon, quality }) => (
          <div key={icon}>
            <UnlockedCollectible count={count} icon={icon} quality={quality} />
          </div>
        ))}
      </div>
    </div>
  );
};
