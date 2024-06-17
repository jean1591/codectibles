export type Asset = "🦁" | "🐨" | "🐵" | "🐼";

export type AssetDetails = { icon: Asset; level: number; price: number };

export type Zoo = (AssetDetails | null)[];
