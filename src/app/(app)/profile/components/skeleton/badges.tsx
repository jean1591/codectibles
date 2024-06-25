const fakeBadges = [1, 2, 3, 4, 5]

export const Badges = () => {
  return (
    <div className="bg-slate-100 rounded-lg p-4 lg:p-8 shadow-lg">
      <p className="text-2xl font-medium">Badges</p>
      <div className="mt-4">
        {fakeBadges.map((badge) => (
          <div key={badge}>
            <Badge />
          </div>
        ))}
      </div>
    </div>
  );
};

const Badge = () => {
  return (
    <div
      className="rounded-lg p-[2px] mt-2 shadow-md"
    >
      <div className="flex items-center justify-between p-4 bg-slate-100 rounded-lg">
        <div>
          <p className="bg-slate-300 text-slate-300 text-lg font-medium capitalize">Badge name</p>
          <p className="bg-slate-300 text-slate-300 text-xs capitalize">Long badge description</p>
        </div>
        <div>
          <p className="bg-slate-300 text-slate-300 text-lg text-nowrap">+ 100 XP</p>
        </div>
      </div>
    </div>
  );
};
