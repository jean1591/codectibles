
export interface Collectible {
    icon: string;
    quality: Quality;
    count: number;
}

export enum Quality {
    COMMON = "common",
    LEGENDARY = "legendary",
    RARE = "rare",
}