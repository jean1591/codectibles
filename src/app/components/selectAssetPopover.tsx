import { setCoins, setKingdom } from "../lib/store/features/kingdom/slice";
import { useDispatch, useSelector } from "react-redux";
import { assetPricesLevel1 } from "@/utils/assetPrices";

import { AssetDetails } from "../interfaces";
import { RootState } from "../lib/store/store";
import { classNames } from "@/utils";
import { Popover } from "./ui/popover";

export const SelectAssetPopover = ({
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

  const handlePriceOnClick = ({ icon, price }: AssetDetails, index: number) => {
    const updatedKingdom = [...kingdom];

    if (updatedKingdom[index] === null && coins >= price) {
      updatedKingdom[index] = { icon, level: 1, price };
      dispatch(setCoins(coins - price));
    } else if (updatedKingdom[index] !== null) {
      updatedKingdom[index] = null;
      dispatch(setCoins(coins + price));
    }

    dispatch(setKingdom(updatedKingdom));
  };

  return (
    <div>
      {selectedCell === index &&
        isPopoverVisible &&
        kingdom[selectedCell] === null && (
          <Popover
            isPopoverVisible={isPopoverVisible}
            selectedCell={selectedCell}
          >
            {assetPricesLevel1.map((asset) => (
              <div
                key={asset.icon}
                className="py-2 flex items-center justify-between"
              >
                <p
                  className={classNames(
                    coins >= asset.price
                      ? "bg-gradient-to-r from-slate-300 to-slate-500"
                      : "bg-slate-700",
                    "h-12 w-12 text-3xl rounded-md flex items-center justify-center"
                  )}
                >
                  {asset.icon}
                </p>
                <button
                  onClick={() => handlePriceOnClick(asset, index)}
                  disabled={asset.price > coins}
                  className={classNames(
                    coins >= asset.price
                      ? "bg-gradient-to-r from-slate-300 to-slate-500 text-slate-800"
                      : "bg-slate-700 text-slate-500",
                    "h-12 text-2xl text-right px-4 py-2 rounded-md"
                  )}
                >{`${asset.price} 💎`}</button>
              </div>
            ))}
          </Popover>
        )}
    </div>
  );
};
