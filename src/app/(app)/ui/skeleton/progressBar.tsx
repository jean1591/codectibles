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
