import { AssetDetails } from "@/app/interfaces";

export const assetPrices: AssetDetails[] = [
  { icon: "🌾", level: 1, price: 2 },
  { icon: "🌾", level: 2, price: 4 },
  { icon: "🌾", level: 3, price: 8 },
  { icon: "🌳", level: 1, price: 4 },
  { icon: "🌳", level: 2, price: 8 },
  { icon: "🌳", level: 3, price: 16 },
  { icon: "🏰", level: 1, price: 8 },
  { icon: "🏰", level: 2, price: 16 },
  { icon: "🏰", level: 3, price: 32 },
];

export const assetPricesLevel1 = assetPrices.filter(({ level }) => level === 1);

export const getPriceByAsset = (assetIcon?: string): number => {
  const foundAsset = assetPrices.find(
    ({ icon, level }) => assetIcon === icon && level === 1
  );

  if (!foundAsset) {
    throw new Error(`Asset not found: ${assetIcon}`);
  }

  return foundAsset.price;
};
