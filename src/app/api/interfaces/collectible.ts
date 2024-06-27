export enum CollectibleType {
    ANIMALS = "animals",
    FLOWERS = "flowers"
}
export interface BaseCollectible {
    icon: string;
    label: string;
    quality: Quality;
    type: CollectibleType;
}

export interface Collectible extends BaseCollectible {
    count: number;
}

export enum Quality {
    COMMON = "common",
    LEGENDARY = "legendary",
    RARE = "rare",
}
