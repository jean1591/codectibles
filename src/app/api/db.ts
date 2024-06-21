import { Badge, RewardType, UserDb } from "./interfaces/user"

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
            reward: {
                type: RewardType.XP,
                value: 250
            }
        },
        pr: {
            user: 138,
            nextmilestone: 200,
            previousmilestone: 100,
            reward: {
                type: RewardType.XP,
                value: 250
            }
        },
        comments: {
            user: 510,
            nextmilestone: 500,
            previousmilestone: 200,
            reward: {
                type: RewardType.XP,
                value: 250
            }
        },
        approves: {
            user: 245,
            nextmilestone: 500,
            previousmilestone: 200,
            reward: {
                type: RewardType.XP,
                value: 250
            }
        }
    },
    badges: [
        {
            id: "azerty",
            icon: "🤓",
            unlockedAt: "2024-01-01",
            title: "code conqueror",
            description: "merge the most pull requests within a month",
            reward: {
                type: RewardType.XP,
                value: 500
            }
        }
    ]
}

export const badges: Badge[] = [
    {
        id: "azerty",
        icon: "🤓",
        title: "code conqueror",
        description: "merge the most pull requests within a month",
        reward: {
            type: RewardType.XP,
            value: 500
        }
    },
    {
        id: "zertyu",
        icon: "🤓",
        title: "pr power-up",
        description: "approve the most pull requests in a week",
        reward: {
            type: RewardType.XP,
            value: 250
        }
    },
    {
        id: "ertyui",
        icon: "🤓",
        title: "merge master",
        description: "merge at least 20 pull requests in two weeks",
        reward: {
            type: RewardType.XP,
            value: 100
        }
    },
    {
        id: "rtyuio",
        icon: "🤓",
        title: "commit champion",
        description: "make the highest number of commits in a month",
        reward: {
            type: RewardType.XP,
            value: 500
        }
    },
    {
        id: "tyuiop",
        icon: "🤓",
        title: "issue resolver",
        description: "close the most issues in a week",
        reward: {
            type: RewardType.XP,
            value: 300
        }
    },
    {
        id: "qsdfgh",
        icon: "🤓",
        title: "branch brilliance",
        description: "create and merge the most branches in a month",
        reward: {
            type: RewardType.XP,
            value: 1000
        }
    },
]