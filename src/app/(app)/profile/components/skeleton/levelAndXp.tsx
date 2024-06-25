import { ProgressBar } from "../../../ui/skeleton/progressBar";

export const LevelAndXp = () => {
  return (
    <div className="bg-slate-100 rounded-lg p-4 lg:p-8 shadow-lg animate-pulse">
      <div className="flex items-center justify-between">
        <p className="bg-slate-300 text-slate-300 rounded text-3xl text-left font-medium">Level 00</p>
        <p className="bg-slate-300 text-slate-300 rounded text-xl text-right font-medium">0000 XP</p>
      </div>

      <div className="mt-4">
        <ProgressBar
        />
      </div>
    </div>
  );
};
