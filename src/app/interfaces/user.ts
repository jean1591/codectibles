import { Zoo } from "./zoo";

export interface User {
    authUserId: string;
    coins: number;
    fetchedAt: Date;
    userId: string;
    nextPrMilestone: number;
    token: string;
    userName: string;
    xp: number;
    zoo: Zoo;
}
