import { useDispatch, useSelector } from "react-redux";

import { AssetDetails, User } from "../interfaces";
import { Popover } from "./ui/popover";
import { RootState } from "../lib/store/store";
import { assetPricesLevel1 } from "@/utils/assetPrices";
import { classNames } from "@/utils";
import { setUser } from "../lib/store/features/user/slice";

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
  const { user } = useSelector((state: RootState) => state.user);

  const handlePriceOnClick = ({ icon, price }: AssetDetails, index: number) => {
    const updatedZoo = [...user!.zoo];

    if (updatedZoo[index] === null && user!.coins >= price) {
      updatedZoo[index] = { icon, level: 1, price };
      dispatch(setUser({ ...user, coins: user!.coins - price, zoo: updatedZoo } as User));
    } else if (updatedZoo[index] !== null) {
      updatedZoo[index] = null;
      dispatch(setUser({ ...user, coins: user!.coins + price, zoo: updatedZoo } as User));
    }
  };

  return (
    <div>
      {selectedCell === index &&
        isPopoverVisible &&
        user!.zoo[selectedCell] === null && (
          <Popover
            isPopoverVisible={isPopoverVisible}
            selectedCell={selectedCell}
          >
            {assetPricesLevel1.map((asset) => (
              <button
                key={asset.icon}
                onClick={() => handlePriceOnClick(asset, index)}
                disabled={asset.price > user!.coins}
                className={classNames(
                  user!.coins >= asset.price
                    ? "bg-gradient-to-r from-slate-300 to-slate-500 text-slate-800"
                    : "bg-slate-700 text-slate-500",
                  "my-2 py-1 px-2 w-full flex items-center justify-between font-medium text-2xl rounded-md"
                )}
              >
                <p className="text-left text-3xl">{asset.icon}</p>
                <p className="text-right">{`${asset.price} 💎`}</p>
              </button>
            ))}
          </Popover>
        )}
    </div>
  );
};
