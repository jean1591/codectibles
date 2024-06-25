import { ConventionalCommitType, conventionalCommitType } from "../interfaces/github";
import { Badge } from "../interfaces/user"

interface PrTypeCount { prType: string; count: number }

export const computeUserBadges = (userBadges: Badge[], badges: Badge[], prTypeCount: PrTypeCount[]): Badge[] => {
    const claimedBadges = userBadges.map(userBadge => userBadge.id)
    const lockedBadges = badges.filter(badge => !claimedBadges.includes(badge.id))

    return [...getConventionalCommitBadgesToClaim(lockedBadges, prTypeCount)]
}

const getConventionalCommitBadgesToClaim = (lockedBadges: Badge[], prTypeCount: PrTypeCount[]): Badge[] => {
    const conventionalCommitBadges = lockedBadges.filter(badge => conventionalCommitType.includes(badge.type))

    // Reformat prTypeCount to be search O(1)
    const formatedPrTypeCount = prTypeCount.reduce((acc, current) => {
        return { ...acc, [current.prType]: current.count }
    }, {} as Record<ConventionalCommitType, number>)

    return conventionalCommitBadges
        .map(badge => ({ ...badge, unlocked: formatedPrTypeCount[badge.type] >= badge.threshold }))
        .sort((a, b) => a.threshold - b.threshold);
}