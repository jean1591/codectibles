const fakeBadges = [1, 2, 3, 4, 5];

export const Badges = () => {
  return (
    <div className="bg-white rounded-lg p-4 lg:p-8 shadow-lg animate-pulse">
      <p className="text-2xl font-medium">Badges</p>

      <div className="mt-8 grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-4 xl:grid-cols-5 grid-flow-row items-center justify-center gap-4">
        {fakeBadges.map((badge) => (
          <div
            key={badge}
            className="bg-slate-300 text-slate-300 relative flex items-center justify-center h-20 w-20 border-2 border-slate-500 rounded-lg shadow-md hover:cursor-pointer"
          >
            <p className="text-4xl">{badge}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
