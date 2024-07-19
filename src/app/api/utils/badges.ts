import { Badge, PrCountType } from "../interfaces/badge";

import { Collectible } from "../interfaces/collectible";
import { badges } from "../badges/constants/badges";
import { conventionalCommitType } from "../interfaces/github";

interface PrTypeCount {
  prType: string;
  count: number;
}

interface LockedAndUnlockedBadges {
  locked: Badge[];
  unlocked: Badge[];
}

export const computeLockedAndUnlockedBadges = (
  claimedTitles: string[],
  collectibles: Collectible[],
  prTypeCount: PrTypeCount[]
): LockedAndUnlockedBadges => {
  const lockedBadges = badges.filter(
    ({ title }) => !claimedTitles.includes(title)
  );

  const collectibleBadges = getCollectiblesBadgesToClaim(
    lockedBadges,
    collectibles
  );

  const prBadges = getConventionalCommitBadgesToClaim(
    lockedBadges,
    prTypeCount
  );

  return {
    locked: [...collectibleBadges.locked, ...prBadges.locked],
    unlocked: [...collectibleBadges.unlocked, ...prBadges.unlocked],
  };
};

// TODO: create method to replace all array.reduces
const getConventionalCommitBadgesToClaim = (
  lockedBadges: Badge[],
  prTypeCount: PrTypeCount[]
): LockedAndUnlockedBadges => {
  const conventionalCommitBadges = lockedBadges.filter((badge) =>
    conventionalCommitType.includes(badge.type)
  );

  // Reformat prTypeCount to be search O(1)
  const formatedPrTypeCount = prTypeCount.reduce((acc, current) => {
    return { ...acc, [current.prType]: current.count };
  }, {} as PrCountType);

  return conventionalCommitBadges.reduce(
    (acc, current) => {
      if (current.condition(formatedPrTypeCount)) {
        acc.unlocked.push(current);
      } else {
        acc.locked.push(current);
      }
      return acc;
    },
    { locked: [], unlocked: [] } as LockedAndUnlockedBadges
  );
};

const getCollectiblesBadgesToClaim = (
  lockedBadges: Badge[],
  collectibles: Collectible[]
) => {
  const collectiblesBadges = lockedBadges.filter(
    ({ type }) => type === "collectibles"
  );

  return collectiblesBadges.reduce(
    (acc, current) => {
      if (current.condition(collectibles)) {
        acc.unlocked.push(current);
      } else {
        acc.locked.push(current);
      }
      return acc;
    },
    { locked: [], unlocked: [] } as LockedAndUnlockedBadges
  );
};
