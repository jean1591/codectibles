export type Asset = "🌾" | "🌳" | "🏰";

export type AssetPrice = { icon: Asset; price: number };
export interface KingdomCellInterface {
  icon: string;
  size: number;
}

export type Kingdom = (KingdomCellInterface | null)[];
