import { QualitySection } from "./quality";

export const Library = () => {
  return (
    <div>
      <p className="text-3xl font-medium">Animals</p>

      <div className="mt-4">
        <QualitySection />
      </div>

      <div className="mt-8">
        <QualitySection />
      </div>

      <div className="mt-8">
        <QualitySection />
      </div>

      <div className="mt-8">
        <QualitySection />
      </div>
    </div>
  );
};
