import { getPriceByAsset } from "@/utils/assetPrices";
import { setCoins, setKingdom } from "../lib/store/features/kingdom/slice";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../lib/store/store";
import { classNames } from "@/utils";

export const RemoveAssetPopover = ({
  index,
  isPopoverVisible,
  selectedCell,
}: {
  index: number;
  isPopoverVisible: boolean;
  selectedCell: number | null;
}) => {
  const dispatch = useDispatch();
  const { kingdom, coins } = useSelector((state: RootState) => state.kingdom);

  const handleAssetOnRemove = (index: number) => {
    const updatedKingdom = [...kingdom];
    updatedKingdom[index] = null;

    dispatch(setCoins(coins + getPriceByAsset(kingdom[selectedCell!]?.icon)));
    dispatch(setKingdom(updatedKingdom));
  };

  return (
    <div>
      {selectedCell === index &&
        isPopoverVisible &&
        kingdom[selectedCell] !== null && (
          <div
            className={classNames(
              isPopoverVisible ? "visible" : "hidden",
              selectedCell < 7 ? "top-20" : "bottom-20",
              "z-50 absolute -left-1/2 bg-slate-800 p-4 rounded-lg w-48 border border-slate-300"
            )}
          >
            <div>
              <p className="text-xl text-slate-400 rounded-md flex items-center justify-center">
                {`Delete ${kingdom[selectedCell]?.icon},`}
              </p>
              <p className="text-xl text-slate-400 rounded-md flex items-center justify-center">
                {`get ${getPriceByAsset(kingdom[selectedCell]?.icon)} 💎 back`}
              </p>
              <div className="mt-4 flex items-center justify-center">
                <button
                  onClick={() => handleAssetOnRemove(index)}
                  className={classNames(
                    "h-12 text-2xl text-right px-4 py-2 rounded-md bg-gradient-to-r from-slate-300 to-slate-500 text-slate-800"
                  )}
                >
                  {"Remove"}
                </button>
              </div>
            </div>
          </div>
        )}
    </div>
  );
};
