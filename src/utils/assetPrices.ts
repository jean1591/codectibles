import { AssetDetails } from "@/app/interfaces";

export const assetPrices: AssetDetails[] = [
  { icon: "🐵", level: 1, price: 100 },
  { icon: "🐨", level: 1, price: 250 },
  { icon: "🐼", level: 1, price: 500 },
  { icon: "🦁", level: 1, price: 1000 },
];

export const assetPricesLevel1 = assetPrices.filter(({ level }) => level === 1);

export const getPriceByAssetAndLevel = (
  assetIcon?: string,
  assetLevel: number = 1
): number => {
  const foundAsset = assetPrices.find(
    ({ icon, level }) => assetIcon === icon && level === 1
  );

  if (!foundAsset) {
    throw new Error(`Asset not found: ${assetIcon}`);
  }

  return foundAsset.price * assetLevel;
};
