import { Badge, Resource } from "../interfaces/user"

export const computeUserBadges = (userBadges: Badge[], badges: Badge[], prCount: number): Badge[] => {
    const lockedBadges = badges.filter(badge => !userBadges.map(userBadge => userBadge.id).includes(badge.id))
    const lockedPrBadges = lockedBadges.filter(badge => badge.type === Resource.PR)

    return [...getPrBadgesToClaim(prCount, lockedPrBadges)]
}

const getPrBadgesToClaim = (prCount: number, badges: Badge[]): Badge[] => {
    return badges
        .map(badge => ({ ...badge, unlocked: prCount > badge.threshold }))
        .sort((a, b) => a.threshold - b.threshold);
}