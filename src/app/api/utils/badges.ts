import {
  ConventionalCommitType,
  conventionalCommitType,
} from "../interfaces/github";

import { Badge } from "../interfaces/badge";
import { badges } from "../badges/constants/badges";

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
  prTypeCount: PrTypeCount[]
): LockedAndUnlockedBadges => {
  const lockedBadges = badges.filter(
    ({ title }) => !claimedTitles.includes(title)
  );

  return getConventionalCommitBadgesToClaim(lockedBadges, prTypeCount);
};

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
  }, {} as Record<ConventionalCommitType, number>);

  return conventionalCommitBadges.reduce(
    (acc, current) => {
      if (formatedPrTypeCount[current.type] >= current.threshold) {
        acc.unlocked.push(current);
      } else {
        acc.locked.push(current);
      }
      return acc;
    },
    { locked: [], unlocked: [] } as LockedAndUnlockedBadges
  );
};
