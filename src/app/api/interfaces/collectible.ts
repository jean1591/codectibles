export enum CollectibleType {
    ANIMALS = "animals",
    FLOWERS = "flowers"
}

export interface Collectible {
    count: number;
    icon: string;
    quality: Quality;
    type: CollectibleType;
}

export enum Quality {
    COMMON = "common",
    LEGENDARY = "legendary",
    RARE = "rare",
}
