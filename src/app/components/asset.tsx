import { classNames } from "@/utils";
import { AssetDetails } from "../interfaces";

export const Asset = ({ asset }: { asset: AssetDetails | null }) => {
  return (
    <div>
      {asset && (
        <div>
          <p
            className={classNames(
              asset.level === 1 ? "text-base sm:text-xl" : "",
              asset.level === 2 ? "text-base sm:text-4xl" : "",
              asset.level === 3 ? "text-base sm:text-6xl" : ""
            )}
          >
            {asset.icon}
          </p>
          <p className="text-normal absolute bottom-1 right-1 text-slate-500">
            {asset.level}
          </p>
        </div>
      )}
    </div>
  );
};
