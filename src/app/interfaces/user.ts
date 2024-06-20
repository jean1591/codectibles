import { Zoo } from "./zoo";

export interface User {
    authUserId: string;
    coins: number;
    fetchedAt: string;
    userId: string;
    nextPrMilestone: number;
    token: string;
    username: string;
    xp: number;
    zoo: Zoo;
}
