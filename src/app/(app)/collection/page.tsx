import { LockedCollectible } from "./components/collectibles";
import { QualitySection } from "./components/quality";
import { Collectible, Quality } from "./interface/tmp";

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
          collectibles={legendaryItems}
        />
      </div>

      <div className="mt-8">
        <QualitySection
          quality={Quality.RARE}
          collectibles={rareItems}
        />
      </div>

      <div className="mt-8">
        <QualitySection
          quality={Quality.COMMON}
          collectibles={commonItems}
        />
      </div>

      <div className="mt-8">
        <p className="bg-gradient-to-tr from-slate-500 to-slate-300 inline-block text-transparent bg-clip-text text-2xl font-medium text-left">
          Locked
        </p>
        <div className="mt-4 flex items-center justify-start flex-wrap gap-4">
          {Array.from({ length: missingAnimalsCount }, (_, index) => index).map((index) => (
            <LockedCollectible key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
