import { classNames } from "@/utils";

const commonBgTheme =
  "bg-gradient-to-tr from-violet-500 to-indigo-300 border-violet-500";
const rareBgTheme =
  "bg-gradient-to-tr from-red-500 to-orange-300 border-red-500";
const legendaryBgTheme =
  "bg-gradient-to-tr from-yellow-400 via-amber-300 to-yellow-100 border-yellow-400";
const LockedBgTheme =
  "bg-gradient-to-tr from-slate-300 via-slate-100 to-slate-300 border-slate-300";

enum Quality {
  COMMON = "common",
  LEGENDARY = "legendary",
  RARE = "rare",
}

const allMammals = [
  "🐵",
  "🐶",
  "🦊",
  "🐱",
  "🦁",
  "🐯",
  "🐮",
  "🐷",
  "🐭",
  "🐹",
  "🐰",
  "🐻",
  "🐻‍❄️",
  "🐨",
  "🐼",
];

interface Collectible {
  icon: string;
  quality: Quality;
  count: number;
}

const mammals: Collectible[] = [
  { icon: "🐷", quality: Quality.COMMON, count: 3 },
  { icon: "🐻", quality: Quality.RARE, count: 2 },
  { icon: "🦁", quality: Quality.COMMON, count: 14 },
  { icon: "🦁", quality: Quality.LEGENDARY, count: 1 },
  { icon: "🦊", quality: Quality.COMMON, count: 1 },
];
const marines = [
  "🐸",
  "🐊",
  "🐢",
  "🦎",
  "🐍",
  "🐳",
  "🐋",
  "🐬",
  "🦭",
  "🐟",
  "🐠",
  "🐡",
  "🦈",
  "🐙",
  "🐚",
  "🪸",
  "🦀",
  "🦞",
  "🦐",
  "🦑",
  "🦪",
];
const bugs = [
  "🐌",
  "🦋",
  "🐛",
  "🐜",
  "🐝",
  "🪲",
  "🐞",
  "🦗",
  "🪳",
  "🕷️",
  "🕸️",
  "🦂",
  "🦟",
  "🪰",
  "🪱",
];
const flowers = [
  "💐",
  "🌸",
  "💮",
  "🪷",
  "🏵️",
  "🌹",
  "🌺",
  "🌻",
  "🌼",
  "🌷",
  "🌱",
  "🪴",
  "🌲",
  "🌳",
  "🌴",
  "🌵",
  "🌾",
  "🌿",
  "🍀",
  "🍄",
];
const legends = ["🐲", "🐉", "🦕", "🦄", "🦖", "🦠", "🪨"];

export default function Collection() {
  const collection = {
    mammals,
  };

  const missingAnimalsCount = allMammals.length - collection.mammals.length;

  const commonItems = collection.mammals.filter(
    (item) => item.quality === Quality.COMMON
  );
  const rareItems = collection.mammals.filter(
    (item) => item.quality === Quality.RARE
  );
  const legendaryItems = collection.mammals.filter(
    (item) => item.quality === Quality.LEGENDARY
  );

  return (
    <div>
      <p className="text-3xl font-medium">Animals</p>

      <div className="mt-4">
        <QualitySection
          quality={Quality.LEGENDARY}
          title="Legendary"
          collectibles={legendaryItems}
        />
      </div>

      <div className="mt-8">
        <QualitySection
          quality={Quality.RARE}
          title="Rare"
          collectibles={rareItems}
        />
      </div>

      <div className="mt-8">
        <QualitySection
          quality={Quality.COMMON}
          title="Common"
          collectibles={commonItems}
        />
      </div>

      <div className="mt-8">
        <p className="bg-gradient-to-tr from-slate-500 to-slate-300 inline-block text-transparent bg-clip-text text-2xl font-medium text-left">
          Locked
        </p>
        <div className="mt-4 flex items-center justify-start flex-wrap gap-4">
          {Array.from({ length: missingAnimalsCount }).map((blocked) => (
            <LockedCollectible />
          ))}
        </div>
      </div>
    </div>
  );
}

const qualityToThemeMapper: Record<Quality, string> = {
  [Quality.COMMON]: commonBgTheme,
  [Quality.RARE]: rareBgTheme,
  [Quality.LEGENDARY]: legendaryBgTheme,
};

const QualitySection = ({
  collectibles,
  quality,
  title,
}: {
  collectibles: Collectible[];
  quality: Quality;
  title: string;
}) => {
  const qualityTheme = qualityToThemeMapper[quality];

  return (
    <div>
      <p
        className={classNames(
          qualityTheme,
          "inline-block text-transparent bg-clip-text text-2xl font-medium text-left"
        )}
      >
        {title}
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

const UnlockedCollectible = ({
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

const LockedCollectible = () => {
  return (
    <div
      className={classNames(
        LockedBgTheme,
        "border-2 relative flex items-center justify-center h-20 w-20 rounded-lg shadow-md text-center"
      )}
    >
      <p className="opacity-50 text-3xl">❓</p>
    </div>
  );
};
