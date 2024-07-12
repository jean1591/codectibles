import { ProgressBarWithTitle } from "@/app/(app)/ui/skeleton/progressBar";

export const Milestones = () => {
  return (
    <div className="bg-white rounded-lg p-4 lg:p-8 shadow-lg animate-pulse">
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
