import { Badge, PrCountType } from "../../interfaces/badge";
import { Collectible, Quality } from "../../interfaces/collectible";

import { allAnimalEmojis } from "../../collectible/constants/collectibles";

export const badges: Badge[] = [
  {
    id: "1e9d9a2e-7b2e-41d9-bd9b-3d1b2c3d4e5f",
    icon: "🎉",
    title: "First Emoji",
    description: "Earn your first emoji",
    type: "collectibles",
    reward: 40,
    condition: (collectibles: Collectible[]) =>
      collectibles.some(({ count }) => count > 0),
  },
  {
    id: "2a4e7d9c-8b4e-47d1-9b6f-5c6d7e8f9g0h",
    icon: "🦄",
    title: "Legendary Collector",
    description: "Earn a legendary emoji",
    type: "collectibles",
    reward: 100,
    condition: (collectibles: Collectible[]) =>
      collectibles.some(
        ({ quality, count }) => quality === Quality.LEGENDARY && count > 0
      ),
  },
  {
    id: "3c5f8a0b-9d6f-48e2-9d8a-6d7e8f9g1h2i",
    icon: "🦆",
    title: "Rare Collector",
    description: "Earn a rare emoji",
    type: "collectibles",
    reward: 100,
    condition: (collectibles: Collectible[]) =>
      collectibles.some(
        ({ quality, count }) => quality === Quality.RARE && count > 0
      ),
  },
  {
    id: "4e6f9b1c-0a7f-49e3-9e9b-7e8f9g1h3i4j",
    icon: "🐵",
    title: "Animal Master",
    description: "Collect all animal emojis",
    type: "collectibles",
    reward: 200,
    condition: (collectibles: Collectible[]) =>
      collectibles.length === allAnimalEmojis.length,
  },
  {
    id: "0141c4ab-dd19-4368-bcb3-7e043e2ac530",
    icon: "🚀",
    title: "Feature Creator",
    description: "Merged a feat pull request.",
    reward: 40,
    type: "feat",
    condition: (prCountType: PrCountType) => prCountType.feat >= 1,
  },
  {
    id: "1331e54f-2b28-40ea-a1df-bc27ed19d9a8",
    icon: "🎖️",
    title: "Chore Legend",
    description: "Merged 100 chore pull requests.",
    reward: 2000,
    type: "chore",
    condition: (prCountType: PrCountType) => prCountType.chore >= 100,
  },
  {
    id: "3aab3c00-a3eb-4b28-977d-cc365b61e482",
    icon: "🔄",
    title: "Refactor Expert",
    description: "Merged a refactor pull request.",
    reward: 40,
    type: "refactor",
    condition: (prCountType: PrCountType) => prCountType.refactor >= 1,
  },
  {
    id: "4adcddd2-368b-4ee1-bb9d-18c6f08ecbb1",
    icon: "🐛",
    title: "Bugfix Specialist",
    description: "Merged a fix pull request.",
    reward: 40,
    type: "fix",
    condition: (prCountType: PrCountType) => prCountType.fix >= 1,
  },
  {
    id: "6182c957-cdfb-4ca2-923d-76dcd4be13cd",
    icon: "⚙️",
    title: "Chore Pro",
    description: "Merged 10 chore pull requests.",
    reward: 400,
    type: "chore",
    condition: (prCountType: PrCountType) => prCountType.chore >= 10,
  },
  {
    id: "799dc5a3-4a00-44fd-9fac-8596de526a3a",
    icon: "🏆",
    title: "Bugfix Legend",
    description: "Merged 100 fix pull requests.",
    reward: 2000,
    type: "fix",
    condition: (prCountType: PrCountType) => prCountType.fix >= 100,
  },
  {
    id: "93178402-e541-42c4-98f2-504016a6b260",
    icon: "🧹",
    title: "Chore Master",
    description: "Merged a chore pull request.",
    reward: 40,
    type: "chore",
    condition: (prCountType: PrCountType) => prCountType.chore >= 1,
  },
  {
    id: "bf9bef58-b1a3-425d-8140-0c88ed35070d",
    icon: "🔧",
    title: "Bugfix Pro",
    description: "Merged 10 fix pull requests.",
    reward: 400,
    type: "fix",
    condition: (prCountType: PrCountType) => prCountType.fix >= 10,
  },
  {
    id: "cbe482f2-40fe-4641-a231-bf96753b7206",
    icon: "🌟",
    title: "Feature Pro",
    description: "Merged 10 feat pull requests.",
    reward: 200,
    type: "feat",
    condition: (prCountType: PrCountType) => prCountType.feat >= 10,
  },
  {
    id: "dd0aa8bf-9120-41b9-b99a-ce6b9b64d9fa",
    icon: "♻️",
    title: "Refactor Pro",
    description: "Merged 10 refactor pull requests.",
    reward: 400,
    type: "refactor",
    condition: (prCountType: PrCountType) => prCountType.refactor >= 10,
  },
  {
    id: "fbae5858-0baa-4a79-b633-00adda275aeb",
    icon: "🏗",
    title: "Refactor Legend",
    description: "Merged 100 refactor pull requests.",
    reward: 2000,
    type: "refactor",
    condition: (prCountType: PrCountType) => prCountType.refactor >= 100,
  },
  {
    id: "fce138e7-7efe-4612-89a6-ca2f8a149626",
    icon: "🏅",
    title: "Feature Legend",
    description: "Merged 100 feat pull requests.",
    reward: 2000,
    type: "feat",
    condition: (prCountType: PrCountType) => prCountType.feat >= 100,
  },
];
