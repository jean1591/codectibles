"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/app/lib/store/store";
import { Library } from "./components/library";
import { CollectibleType } from "@/app/api/interfaces/collectible";

const allAnimals = [
  "🐌",
  "🐙",
  "🐛",
  "🐝",
  "🐞",
  "🐡",
  "🐢",
  "🐨",
  "🐭",
  "🐮",
  "🐯",
  "🐰",
  "🐱",
  "🐳",
  "🐵",
  "🐶",
  "🐷",
  "🐸",
  "🐹",
  "🐻",
  "🐻‍❄️",
  "🐼",
  "🦀",
  "🦁",
  "🦊",
  "🦞",
  "🦭",
  "🪲",
];
const AllLegends = ["🐲", "🐉", "🦕", "🦄", "🦖", "🦠"];
const AllFlowers = [
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

export default function Collection() {
  const { collectibles } = useSelector((state: RootState) => state.user);
  const animals = collectibles.filter(
    (collectible) => collectible.type === CollectibleType.ANIMALS
  );
  const flowers = collectibles.filter(
    (collectible) => collectible.type === CollectibleType.FLOWERS
  );

  return (
    <div>
      <Library collectibles={animals} maxCollectiblesSize={allAnimals.length} />
    </div>
  );
}
