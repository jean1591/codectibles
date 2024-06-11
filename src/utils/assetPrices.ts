import { AssetPrice } from "@/app/interfaces";

export const assetPrices: AssetPrice[] = [
  { icon: "🌾", price: 2 },
  { icon: "🌳", price: 4 },
  { icon: "🏰", price: 8 },
];

export const getPriceByAsset = (assetIcon: string | undefined): number => {
  const foundAsset = assetPrices.find(({ icon }) => assetIcon === icon);

  if (!foundAsset) {
    throw new Error(`Asset not found: ${assetIcon}`);
  }

  return foundAsset.price;
};
