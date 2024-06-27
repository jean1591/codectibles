import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { PiCheck } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/lib/store/store";
import { setDisplayGetEmojisModal } from "@/app/lib/store/features/interactions/slice";

export const EmojiCardsModal = () => {
  const dispatch = useDispatch();
  const { displayGetEmojisModal } = useSelector(
    (state: RootState) => state.interactions
  );

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
            className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-sm sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div>
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <PiCheck
                  className="h-6 w-6 text-green-600"
                  aria-hidden="true"
                />
              </div>
              <div className="mt-3 text-center sm:mt-5">
                <DialogTitle
                  as="h3"
                  className="text-base font-semibold leading-6 text-gray-900"
                >
                  Payment successful
                </DialogTitle>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Consequatur amet labore.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-5 sm:mt-6">
              <button
                type="button"
                className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={() => dispatch(setDisplayGetEmojisModal(false))}
              >
                Go back to dashboard
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};
