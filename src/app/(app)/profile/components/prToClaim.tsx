import { Stat, User, UserDb } from "@/app/api/interfaces/user";
import { setUser } from "@/app/lib/store/features/user/slice";
import { RootState } from "@/app/lib/store/store";
import { classNames } from "@/utils";
import { useDispatch, useSelector } from "react-redux";
import { gradientBg } from "../../ui";

const REWARD_PER_PR = 40;

export const PrToClaim = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.user);

  // TODO: display skeleton
  if (user === null) {
    return <></>;
  }

  const { prToClaim } = user;

  const handleClaimPr = () => {
    const updatedXp: Stat = {
      ...user.stats.xp,
      user: user.stats.xp.user + prToClaim * REWARD_PER_PR,
    };

    const updatedUser = {
      authUserId: user.authUserId,
      prToClaim: 0,
      stats: { ...user.stats, xp: updatedXp },
    } as UserDb;

    (async function updateUser() {
      await fetch("/api/user", {
        method: "PUT",
        body: JSON.stringify({ user: updatedUser }),
        headers: { "Content-Type": "application/json" },
      });
    })();

    (async function updatePr() {
      await fetch("/api/pr", {
        method: "PUT",
        body: JSON.stringify({
          authUserId: user.authUserId,
          claimed: true,
        }),
        headers: { "Content-Type": "application/json" },
      });
    })();

    const stateUser: User = {
      ...user,
      prToClaim: 0,
      stats: { ...user.stats, xp: updatedXp },
    };

    dispatch(setUser(stateUser));
  };

  if (prToClaim === 0) {
    return (
      <div className="bg-slate-100 rounded-lg p-4 lg:p-8 shadow-lg">
        <div className="flex items-center justify-between">
          <p className="text-xl font-medium text-left">No new merged PR</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-200 rounded-lg p-4 lg:p-8 shadow-lg">
      <div className="flex items-center justify-between">
        <p className="text-xl font-medium text-left">{`${prToClaim} new PR merged`}</p>
        <button
          onClick={handleClaimPr}
          className={classNames(
            gradientBg,
            "text-slate-100 py-1 px-4 rounded-md text-base text-right animate-bounce"
          )}
        >
          {`+ ${prToClaim * REWARD_PER_PR} XP`}
        </button>
      </div>
    </div>
  );
};
