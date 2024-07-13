const fakeBadges = [1, 2, 3, 4, 5];
const fakeCollectibles = [1, 2, 3, 4, 5];

export const ProfileSkeleton = () => {
  return (
    <div className="mt-20">
      <div>
        {/* PROFILE */}
        <div className="text-center">
          <div className="flex items-center justify-center animate-pulse">
            <p className="h-32 w-32 text-7xl rounded-full bg-slate-500 p-8"></p>
          </div>
          <p className="bg-slate-300 text-slate-300 mt-8 text-3xl font-semibold animate-pulse">
            jean1591
          </p>
          <p className="bg-slate-300 text-slate-300 mt-2 text-base animate-pulse">
            jean1591
          </p>
        </div>

        {/* STATS */}
        <div className="mt-16 flex items-center justify-between gap-x-4">
          <div className="bg-slate-300 text-slate-300 rounded-lg p-4 w-full shadow-lg animate-pulse">
            <p className="text-xl font-medium">12</p>
            <p className="text-base">Level</p>
          </div>
          <div className="bg-slate-300 text-slate-300 rounded-lg p-4 w-full shadow-lg">
            <p className="text-xl font-medium">1234</p>
            <p className="text-base">XP</p>
          </div>
          <div className="bg-slate-300 text-slate-300 rounded-lg p-4 w-full shadow-lg">
            <p className="text-xl font-medium">#1</p>
            <p className="text-base">Rank</p>
          </div>
        </div>

        {/* BADGES */}
        <div className="mt-16 bg-white rounded-lg p-4 w-full shadow-lg">
          <p className="text-xl font-medium">Badges</p>

          <div className="mt-4 flex items-center justify-start flex-wrap gap-2">
            {fakeBadges.map((badge) => (
              <div
                key={badge}
                className="bg-slate-300 text-slate-300 flex items-center justify-center h-16 w-16 border-2 border-slate-500 rounded-lg shadow-md"
              >
                <p className="text-3xl"></p>
              </div>
            ))}
          </div>
        </div>

        {/* COLLECTION */}
        <div className="mt-16 bg-white rounded-lg p-4 w-full shadow-lg">
          <p className="text-xl font-medium">Collection</p>

          <div className="mt-4 flex items-center justify-start flex-wrap gap-2">
            {fakeCollectibles.map((collectible) => (
              <div
                key={collectible}
                className="bg-slate-300 text-slate-300 flex items-center justify-center h-16 w-16 border-2 border-slate-500 rounded-lg shadow-md"
              >
                <p className="text-3xl"></p>
              </div>
            ))}
          </div>
        </div>

        {/* FOLLOWS */}
        <div className="mt-16"></div>
      </div>
    </div>
  );
};
