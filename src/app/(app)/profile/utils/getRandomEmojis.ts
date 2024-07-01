import { BaseCollectible, Quality } from "@/app/api/interfaces/collectible";

import { allAnimalEmojis } from "../../collection/utils/collectibles";

const getRandomQuality = (legendaryThreshold: number = 5): Quality => {
  const rareThreshold = legendaryThreshold + 15;
  const num = Math.ceil(Math.random() * 100);

  if (num <= legendaryThreshold) {
    return Quality.LEGENDARY;
  }

  if (num <= rareThreshold) {
    return Quality.RARE;
  }

  return Quality.COMMON;
};

export const getRandomEmojis = (count: number = 3): BaseCollectible[] => {
  const shuffled = allAnimalEmojis.sort(() => 0.5 - Math.random());

  return shuffled
    .slice(0, count)
    .map((animal) => ({ ...animal, quality: getRandomQuality() }));
};
