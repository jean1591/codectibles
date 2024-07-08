import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { EmojiCard, SmallEmojiCard } from "./emojiCard";
import {
  addCollectibles,
  setCollectiblesToClaim,
} from "@/app/lib/store/features/user/slice";
import { gradientBg, gradientText } from "../../ui";
import { useDispatch, useSelector } from "react-redux";

import Link from "next/link";
import { PiGift } from "react-icons/pi";
import { RootState } from "@/app/lib/store/store";
import { classNames } from "@/utils";
import { setDisplayGetEmojisModal } from "@/app/lib/store/features/interactions/slice";

export const EmojiCardsModal = () => {
  const dispatch = useDispatch();

  const { displayGetEmojisModal } = useSelector(
    (state: RootState) => state.interactions
  );
  const { user, collectiblesToClaim, collectibles } = useSelector(
    (state: RootState) => state.user
  );

  if (!user) {
    return <></>;
  }

  const onClaimCollectibles = () => {
    (async function updateCollectibles() {
      await fetch(`/api/collectible/user/${user.id}`, {
        method: "POST",
        body: JSON.stringify({ collectibles: collectiblesToClaim }),
        headers: { "Content-Type": "application/json" },
      });
    })();

    dispatch(addCollectibles(collectiblesToClaim));
    dispatch(setCollectiblesToClaim([]));
  };

  return (
    <Dialog
      className="relative z-10"
      open={displayGetEmojisModal}
      onClose={() => null}
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center lg:items-center lg:p-0">
          <DialogPanel
            transition
            className="w-full lg:w-2/3 relative transform overflow-hidden rounded-lg bg-slate-50 p-4 lg:p-8 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in data-[closed]:lg:translate-y-0 data-[closed]:lg:scale-95"
          >
            <div>
              <div
                className={classNames(
                  gradientBg,
                  "mx-auto flex h-14 w-14 lg:h-20 lg:w-20 items-center justify-center rounded-full"
                )}
              >
                <PiGift className="h-7 w-7 lg:h-10 lg:w-10 text-slate-200" />
              </div>
              <div className="mt-8 text-center">
                <DialogTitle
                  className={classNames(
                    gradientText,
                    gradientBg,
                    "text-2xl lg:text-3xl font-semibold leading-6"
                  )}
                >
                  Level {user.level} unlocked !
                </DialogTitle>
                <div
                  className={classNames(
                    collectiblesToClaim.length > 0 ? "mt-8 lg:mt-12" : ""
                  )}
                >
                  <div className="hidden lg:flex items-center justify-center gap-x-8">
                    {collectiblesToClaim.map((collectible) => (
                      <EmojiCard
                        key={collectible.label}
                        collectible={collectible}
                      />
                    ))}
                  </div>

                  <div className="block lg:hidden">
                    {collectiblesToClaim.map((collectible) => (
                      <SmallEmojiCard
                        key={collectible.label}
                        collectible={collectible}
                      />
                    ))}
                  </div>
                </div>

                <div className="mt-8">
                  {collectiblesToClaim.length > 0 ? (
                    <button
                      onClick={onClaimCollectibles}
                      className={classNames(
                        gradientBg,
                        "rounded-lg w-full lg:w-1/3 shadow-md"
                      )}
                    >
                      <p className="p-2 text-lg text-slate-100 font-semibold uppercase ">
                        🎁 Claim emojis 🎁
                      </p>
                    </button>
                  ) : (
                    <div className="lg:flex items-center justify-end gap-x-4">
                      <Link
                        className={classNames(
                          gradientBg,
                          "p-2 w-full rounded-lg shadow-md"
                        )}
                        href="/collection"
                        onClick={() =>
                          dispatch(setDisplayGetEmojisModal(false))
                        }
                      >
                        <button className="text-lg text-slate-100 font-semibold uppercase text-nowrap px-4">
                          Go to collection
                        </button>
                      </Link>

                      <button
                        onClick={() =>
                          dispatch(setDisplayGetEmojisModal(false))
                        }
                        className="mt-4 lg:mt-0 bg-gradient-to-r from-red-500 to-red-300 p-2 text-lg text-slate-100 font-semibold uppercase rounded-lg w-full shadow-md"
                      >
                        <p className="px-4">Close</p>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};
