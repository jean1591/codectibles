const fakeCollectibles = [1, 2, 3, 4, 5];

export const QualitySection = () => {
  return (
    <div className="animate-pulse">
      <div className="flex items-center justify-start gap-x-4 font-medium">
        <p className="bg-slate-300 text-slate-300 text-2xl text-left capitalize">
          QUALITY
        </p>
      </div>

      <div className="mt-4 flex items-center justify-start flex-wrap gap-4">
        {fakeCollectibles.map((collectible) => (
          <div key={collectible}>
            <div
              key={collectible}
              className="bg-slate-300 text-slate-300 relative flex items-center justify-center h-20 w-20 border-2 border-slate-500 rounded-lg shadow-md hover:cursor-pointer"
            >
              <p className="text-4xl">{collectible}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
