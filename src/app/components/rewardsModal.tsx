"use client";

import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";

import { PiGift } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../lib/store/store";
import { setIsRewardsModalOpen } from "../lib/store/features/rewards/slice";
import { Rewards } from "./rewards";

export const RewardsModal = () => {
  const dispatch = useDispatch();
  const { isRewardsModalOpen } = useSelector(
    (state: RootState) => state.rewards
  );

  return (
    <Transition show={isRewardsModalOpen}>
      <Dialog
        className="relative z-50"
        onClose={() => dispatch(setIsRewardsModalOpen(false))}
      >
        <TransitionChild
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel className="relative transform overflow-hidden rounded-lg bg-slate-800 px-4 py-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md sm:p-6">
                <div>
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                    <PiGift
                      className="h-12 w-12 text-red-400"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-4 text-center sm:mt-8">
                    <DialogTitle
                      as="h3"
                      className="text-lg font-semibold leading-6 text-slate-300"
                    >
                      Collect your prizes !
                    </DialogTitle>
                    <div className="mt-4">
                      <p className="text-base">
                        Merge, approve or comment PR to earn prizes !
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-8 sm:mt-16">
                  <div className="my-16">
                    <Rewards />
                  </div>

                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-red-400 px-3 py-2 text-base font-medium text-slate-100 shadow-sm hover:bg-red-400"
                    onClick={() => dispatch(setIsRewardsModalOpen(false))}
                  >
                    Return to kingdom 👑
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
