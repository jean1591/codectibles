import {
  BaseCollectible
} from "@/app/api/interfaces/collectible";
import { setDisplayGetEmojisModal } from "@/app/lib/store/features/interactions/slice";
import {
  addCollectible,
  setCollectiblesToClaim,
} from "@/app/lib/store/features/user/slice";
import { RootState } from "@/app/lib/store/store";
import { classNames } from "@/utils";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { PiGift } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { qualityToThemeMapper } from "../../collection/utils/mappers";
import { gradientBg } from "../../ui";

export const EmojiCardsModal = () => {
  const dispatch = useDispatch();

  const { displayGetEmojisModal } = useSelector(
    (state: RootState) => state.interactions
  );
  const { user, collectiblesToClaim } = useSelector(
    (state: RootState) => state.user
  );

  if (!user) {
    return <></>;
  }

  return (
    <Dialog
      className="relative z-10"
      open={displayGetEmojisModal}
      onClose={() => dispatch(setDisplayGetEmojisModal(false))}
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-slate-50 p-4 lg:p-8 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in data-[closed]:lg:translate-y-0 data-[closed]:lg:scale-95"
          >
            <div>
              <div
                className={classNames(
                  gradientBg,
                  "mx-auto flex h-20 w-20 items-center justify-center rounded-full"
                )}
              >
                <PiGift className="h-10 w-10 text-slate-200" />
              </div>
              <div className="mt-4 sm:mt-8 text-center">
                <DialogTitle
                  className={classNames(
                    gradientBg,
                    "inline-block text-transparent bg-clip-text text-3xl font-semibold leading-6"
                  )}
                >
                  Level {user.level} unlocked !
                </DialogTitle>
                <div className="mt-8">
                  <div className="hidden lg:flex items-center justify-center gap-x-8">
                    {collectiblesToClaim.map((collectible) => (
                      <EmojiCard
                        key={collectible.label}
                        collectible={collectible}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

const EmojiCard = ({ collectible }: { collectible: BaseCollectible }) => {
  const { icon, label, quality } = collectible;

  const dispatch = useDispatch();
  const { collectiblesToClaim } = useSelector((state: RootState) => state.user);

  const onClaimCollectible = () => {
    dispatch(addCollectible(collectible));
    dispatch(
      setCollectiblesToClaim(
        collectiblesToClaim.filter(
          (collectible) =>
            !(collectible.icon === icon && collectible.quality === quality)
        )
      )
    );

    // Close modal on last emoji claimed
    if (collectiblesToClaim.length === 1) {
      dispatch(setDisplayGetEmojisModal(false));
    }
  };

  return (
    <div
      className={classNames(
        qualityToThemeMapper[quality],
        "rounded-lg p-1 mt-2 shadow-md"
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

          <div className="mt-8">
            <button
              onClick={onClaimCollectible}
              className={classNames(
                qualityToThemeMapper[quality],
                "p-2 text-base text-slate-100 font-semibold uppercase rounded-lg w-full"
              )}
            >
              Get {label}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
