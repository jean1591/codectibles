import { ProgressBarWithTitle } from "@/app/(app)/ui/skeleton/progressBar";

export const Milestones = () => {
  return (
    <div className="bg-slate-100 rounded-lg p-4 lg:p-8 shadow-lg">
      <ProgressBarWithTitle />
      <div className="mt-8">
        <ProgressBarWithTitle />
      </div>
      <div className="mt-8">
        <ProgressBarWithTitle />
      </div>
    </div>
  );
};
