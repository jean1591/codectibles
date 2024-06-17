import { AssetDetails } from "../interfaces";
import { classNames } from "@/utils";

export const Asset = ({ asset }: { asset: AssetDetails | null }) => {
  return (
    <div>
      {asset && (
        <div
          className={classNames(
            asset.level === 2 ? "mt-2 sm:mt-3" : "",
            asset.level === 3 ? "mt-4 sm:mt-6" : "",
            "flex items-center justify-center"
          )}
        >
          {Array.from({ length: asset.level }).map((_, index) => (
            <p
              key={index}
              className={classNames(
                index === 0 ? "z-30" : "",
                index === 1 ? "z-20 -ml-2 mb-2 sm:-ml-3 sm:mb-3" : "",
                index === 2 ? "z-10 -ml-2 mb-4 sm:-ml-3 sm:mb-6" : "",
                "text-base sm:text-3xl"
              )}
            >
              {asset.icon}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};
