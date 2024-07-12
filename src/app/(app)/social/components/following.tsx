import { Follow } from "@/app/api/interfaces/social";
import Link from "next/link";
import { RootState } from "@/app/lib/store/store";
import { classNames } from "@/utils";
import { useSelector } from "react-redux";

// TODO: create title component for Following, Leaderboard, Badges, ...
export const Following = () => {
  const { follows } = useSelector((state: RootState) => state.social);

  // TODO: create skeleton
  if (!follows) {
    return <>Loading...</>;
  }

  return (
    <div className="bg-slate-100 rounded-lg p-4 lg:p-8 shadow-lg">
      <p className="text-2xl font-medium">Following</p>

      <div className="mt-8">
        <div className="divide-y divide-slate-200">
          {follows.map((user, index) => (
            <div
              key={user.username}
              className={classNames(index === 0 ? "pb-4" : "py-4")}
            >
              <Friend user={user} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Friend = ({ user }: { user: Follow }) => {
  const { username, xp } = user;

  return (
    <Link
      href={`/profile/${username}`}
      target="_blank"
      className="flex items-center justify-between text-lg gap-x-4"
    >
      <div>
        <p className="text-left">{username}</p>
      </div>
      <p className="text-right">{xp} XP</p>
    </Link>
  );
};
