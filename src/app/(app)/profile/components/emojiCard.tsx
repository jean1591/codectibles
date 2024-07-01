import { BaseCollectible } from "@/app/api/interfaces/collectible";
import { classNames } from "@/utils";
import { qualityToThemeMapper } from "../../collection/utils/mappers";

export const EmojiCard = ({ collectible }: { collectible: BaseCollectible }) => {
    const { icon, label, quality } = collectible;
  
    return (
      <div
        className={classNames(
          qualityToThemeMapper[quality],
          "rounded-lg p-1 mt-2 shadow-xl"
        )}
      >
        <div className="py-8 px-12 flex items-start justify-center bg-slate-50 rounded-lg">
          <div>
            <p className="text-9xl">{icon}</p>
  
            <div className="mt-4 text-left">
              <p className="text-2xl font-semibold leading-6 uppercase">
                {label}
              </p>
              <p className="text-slate-500 text-sm font-semibold capitalize">
                type
              </p>
            </div>
  
            <div className="mt-2 text-left">
              <p
                className={classNames(
                  qualityToThemeMapper[quality],
                  "inline-block text-transparent bg-clip-text text-2xl font-semibold leading-6 uppercase"
                )}
              >
                {quality}
              </p>
              <p className="text-slate-500 text-sm font-medium capitalize">
                Rarity
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export const SmallEmojiCard = ({ collectible }: { collectible: BaseCollectible }) => {
    const { icon, label, quality } = collectible;
  
    return (
      <div
        className={classNames(
          qualityToThemeMapper[quality],
          "rounded-lg p-1 mt-2 shadow-md"
        )}
      >
        <div className="p-4 bg-slate-50 rounded-lg">
          <div>
            <div className="grid grid-cols-3">
              <p className="text-left text-5xl">{icon}</p>
  
              <div className="text-left">
                <p className="text-lg font-semibold leading-6 uppercase">
                  {label}
                </p>
                <p className="text-slate-500 text-xs font-semibold capitalize">
                  type
                </p>
              </div>
  
              <div className="text-right">
                <p
                  className={classNames(
                    qualityToThemeMapper[quality],
                    "inline-block text-transparent bg-clip-text text-lg font-semibold leading-6 uppercase"
                  )}
                >
                  {quality}
                </p>
                <p className="text-slate-500 text-xs font-medium capitalize">
                  Rarity
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  