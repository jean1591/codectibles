import { AssetDetails } from "../interfaces";

export const Asset = ({ asset }: { asset: AssetDetails | null }) => {
  return (
    <div>
      {asset && (
        <div>
          <p className="text-base sm:text-2xl">{asset.icon}</p>
          <p className="text-normal absolute bottom-1 right-1 text-slate-500">
            {asset.level}
          </p>
        </div>
      )}
    </div>
  );
};
