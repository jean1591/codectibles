import { Collectible, Quality } from "@/app/api/interfaces/collectible";

import { UnlockedCollectible } from "./collectibles";
import { classNames } from "@/utils";
import { gradientText } from "../../ui";
import { qualityToThemeMapper } from "../utils/mappers";

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
            gradientText,
            qualityTheme,
            "text-2xl text-left capitalize"
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
