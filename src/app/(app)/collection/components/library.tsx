import { Collectible, Quality } from "@/app/api/interfaces/collectible";
import { QualitySection } from "./quality";
import { LockedCollectible } from "./collectibles";

export const Library = ({
  collectibles,
  maxCollectiblesSize,
}: {
  collectibles: Collectible[];
  maxCollectiblesSize: number;
}) => {
  const missingItemsCount = maxCollectiblesSize - collectibles.length;

  const commonItems = collectibles.filter(
    (item) => item.quality === Quality.COMMON
  );
  const rareItems = collectibles.filter(
    (item) => item.quality === Quality.RARE
  );
  const legendaryItems = collectibles.filter(
    (item) => item.quality === Quality.LEGENDARY
  );
  
  return (
    <div>
      <p className="text-3xl font-medium">Animals</p>

      <div className="mt-4">
        <QualitySection
          quality={Quality.LEGENDARY}
          collectibles={legendaryItems}
        />
      </div>

      <div className="mt-8">
        <QualitySection quality={Quality.RARE} collectibles={rareItems} />
      </div>

      <div className="mt-8">
        <QualitySection quality={Quality.COMMON} collectibles={commonItems} />
      </div>

      <div className="mt-8 flex items-center justify-start gap-x-4 font-medium">
        <p className="bg-gradient-to-tr from-slate-500 to-slate-300 inline-block text-transparent bg-clip-text text-2xl font-medium text-left">
          Locked
        </p>
        <span className="flex items-center justify-center rounded-md h-7 w-7 text-sm text-slate-600 ring-1 ring-inset ring-slate-600/20">
          {missingItemsCount}
        </span>
      </div>

      <div className="mt-4 flex items-center justify-start flex-wrap gap-4">
        {Array.from({ length: missingItemsCount }, (_, index) => index).map(
          (index) => (
            <LockedCollectible key={index} />
          )
        )}
      </div>
    </div>
  );
};
