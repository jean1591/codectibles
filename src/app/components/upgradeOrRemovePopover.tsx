import { setCoins, setZoo } from "../lib/store/features/zoo/slice";
import { useDispatch, useSelector } from "react-redux";

import { AssetDetails } from "../interfaces";
import { PiArrowCircleUp } from "react-icons/pi";
import { PiTrash } from "react-icons/pi";
import { Popover } from "./ui/popover";
import { RootState } from "../lib/store/store";
import { classNames } from "@/utils";
import { getPriceByAssetAndLevel } from "@/utils/assetPrices";

export const UpgradeOrRemovePopover = ({
  index,
  isPopoverVisible,
  selectedCell,
}: {
  index: number;
  isPopoverVisible: boolean;
  selectedCell: number | null;
}) => {
  const dispatch = useDispatch();
  const { zoo, coins } = useSelector((state: RootState) => state.zoo);

  const selectedAsset = zoo[index] as AssetDetails;

  const handleAssetUpgrade = (index: number) => {
    const updatedZoo = [...zoo];
    updatedZoo[index] = {
      ...selectedAsset,
      level: selectedAsset.level! + 1,
    };

    dispatch(
      setCoins(coins - getPriceByAssetAndLevel(zoo[selectedCell!]?.icon))
    );
    dispatch(setZoo(updatedZoo));
  };

  const handleAssetOnRemove = (index: number) => {
    const updatedZoo = [...zoo];
    updatedZoo[index] = null;

    const asset = zoo[selectedCell!] as AssetDetails;

    dispatch(
      setCoins(coins + getPriceByAssetAndLevel(asset.icon, asset.level))
    );
    dispatch(setZoo(updatedZoo));
  };

  return (
    <div>
      {selectedCell === index &&
        isPopoverVisible &&
        zoo[selectedCell] !== null && (
          <Popover
            isPopoverVisible={isPopoverVisible}
            selectedCell={selectedCell}
          >
            <div>
              <div className="flex items-center justify-center gap-x-4">
                <button
                  disabled={selectedAsset.level > 2 || selectedAsset.price > coins}
                  onClick={() => handleAssetUpgrade(index)}
                  className={classNames(
                    selectedAsset.level > 2 || selectedAsset.price > coins
                      ? "border-slate-950 text-slate-950"
                      : "hover:bg-slate-700 border-slate-300 text-slate-300",
                    "text-xl px-2 py-1 rounded-md border grid grid-cols-2 text-center"
                  )}
                >
                  <div className="px-1">
                    <p className="text-sm">
                      {`${
                        selectedAsset.level === 3
                          ? selectedAsset.level
                          : selectedAsset.level + 1
                      } ${selectedAsset.icon}`}
                    </p>
                  </div>
                  <div className="px-1 row-span-2 flex items-center justify-center h-full">
                    <PiArrowCircleUp className="h-6 w-6" />
                  </div>
                  <div className="px-1">
                    <p className="text-sm text-nowrap">{`${selectedAsset.price} 💎`}</p>
                  </div>
                </button>
                <button
                  onClick={() => handleAssetOnRemove(index)}
                  className={classNames(
                    "h-12 text-2xl text-right px-4 py-2 rounded-md border border-red-400/75 hover:bg-red-400/10"
                  )}
                >
                  <PiTrash className="h-6 w-6 text-red-400/75" />
                </button>
              </div>
            </div>
          </Popover>
        )}
    </div>
  );
};
