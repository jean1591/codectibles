export const ProgressBarWithTitle = () => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-start gap-x-4 text-xl font-medium text-left">
          <p className="bg-slate-300 text-slate-300">USER DETAILS</p>
        </div>
        <p className="bg-slate-300 text-slate-300 text-base text-right">+ 100 XP</p>
      </div>

      <div className="mt-4">
        <ProgressBar
        />
      </div>
    </div>
  );
};

export const ProgressBar = () => {
  return (
    <div>
      <div>
        <div
          className="h-2 bg-slate-300 rounded-full"
          style={{ width: "100%" }}
        />
      </div>
      <div className="mt-2 flex items-center justify-between text-sm font-medium">
        <p className="text-left bg-slate-300 text-salte-300 rounded"></p>
        <p className="text-right bg-slate-300 text-salte-300 rounded"></p>
      </div>
    </div>
  );
};
