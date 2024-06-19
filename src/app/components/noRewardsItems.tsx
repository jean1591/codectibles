export const NoRewardsItem = () => {
  return (
    <div>
      <p className="block text-base text-center">
        All rewards have been <span className="text-red-400">claimed</span> 🦁
      </p>

      <div className="mt-8">
        <p className="text-base">
          Next milestone in <span className="text-red-400">1</span> PR
        </p>
        <div className="mt-4" aria-hidden="true">
          <div className="overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-2 rounded-full bg-red-400"
              style={{ width: "75%" }}
            />
          </div>
          <div className="mt-2 hidden grid-cols-2 text-sm font-medium sm:grid">
            <div className="text-red-400">4 PR</div>
            <div className="text-right">8 PR</div>
          </div>
        </div>
      </div>
    </div>
  );
};
