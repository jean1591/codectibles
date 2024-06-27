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
      <p
        className={classNames(
          qualityTheme,
          "inline-block text-transparent bg-clip-text text-2xl font-medium text-left capitalize"
        )}
      >
        {quality}
      </p>
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
