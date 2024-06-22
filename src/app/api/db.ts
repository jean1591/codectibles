import { Badge, RewardType, UserDb } from "./interfaces/user"

// TODO: delete this file
export const user: UserDb = {
    id: "azerty",
    username: "josebove",
    token: "token",
    level: 76,
    stats: {
        xp: {
            user: 3653,
            nextmilestone: 5000,
            previousmilestone: 3500,
            reward: 250,
            rewardType: RewardType.XP,
        },
        pr: {
            user: 138,
            nextmilestone: 200,
            previousmilestone: 100,
            reward: 250,
            rewardType: RewardType.XP,
        },
        comments: {
            user: 510,
            nextmilestone: 500,
            previousmilestone: 200,
            reward: 250,
            rewardType: RewardType.XP,
        },
        approves: {
            user: 245,
            nextmilestone: 500,
            previousmilestone: 200,
            reward: 250,
            rewardType: RewardType.XP,
        }
    },
    badges: [
        {
            id: "azerty",
            icon: "🤓",
            unlockedAt: "2024-01-01",
            title: "code conqueror",
            description: "merge the most pull requests within a month",
            rewardType: RewardType.XP,
            reward: 500
        }
    ]
}

export const badges: Badge[] = [
    {
        id: "azerty",
        icon: "🤓",
        title: "code conqueror",
        description: "merge the most pull requests within a month",
        rewardType: RewardType.XP,
        reward: 500

    },
    {
        id: "zertyu",
        icon: "🤓",
        title: "pr power-up",
        description: "approve the most pull requests in a week",
        rewardType: RewardType.XP,
        reward: 250

    },
    {
        id: "ertyui",
        icon: "🤓",
        title: "merge master",
        description: "merge at least 20 pull requests in two weeks",
        rewardType: RewardType.XP,
        reward: 100

    },
    {
        id: "rtyuio",
        icon: "🤓",
        title: "commit champion",
        description: "make the highest number of commits in a month",
        rewardType: RewardType.XP,
        reward: 500

    },
    {
        id: "tyuiop",
        icon: "🤓",
        title: "issue resolver",
        description: "close the most issues in a week",
        rewardType: RewardType.XP,
        reward: 300

    },
    {
        id: "qsdfgh",
        icon: "🤓",
        title: "branch brilliance",
        description: "create and merge the most branches in a month",
        rewardType: RewardType.XP,
        reward: 1000

    },
]
