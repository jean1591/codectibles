import { classNames } from "@/utils";

const fakeFollows = [1, 2, 3];

export const Following = () => {
  return (
    <div className="bg-white rounded-lg p-4 lg:p-8 shadow-lg">
      <p className="text-2xl font-medium">Following</p>

      <div className="mt-8">
        <div className="divide-y divide-slate-200">
          {fakeFollows.map((user, index) => (
            <div
              key={user}
              className={classNames(index === 0 ? "pb-2" : "py-2")}
            >
              <Friend />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Friend = () => {
  return (
    <div className="text-lg gap-x-4 animate-pulse">
      <p className="bg-slate-300 text-slate-300">jean1591</p>
    </div>
  );
};
