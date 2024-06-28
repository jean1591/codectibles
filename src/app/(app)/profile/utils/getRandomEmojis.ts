import { BaseCollectible, Quality } from "@/app/api/interfaces/collectible"
import { allAnimalEmojis } from "../../collection/utils/collectibles";

const getRandomQuality = (legendaryThreshold: number = 10): Quality => {
  const num = Math.round(Math.random() * 100)

  if (num < legendaryThreshold) {
    return Quality.LEGENDARY
  }

  if (num < 20 + legendaryThreshold) {
    return Quality.RARE
  }

  return Quality.COMMON
}

export const getRandomEmojis = (count: number = 3, ): BaseCollectible[] => {
  const shuffled = allAnimalEmojis.sort(() => 0.5 - Math.random());

  return shuffled.slice(0, count).map(animal => ({...animal, quality: getRandomQuality()}));
}