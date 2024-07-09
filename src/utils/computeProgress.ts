export const computeProgress = (
  nextMilestone: number,
  previousMilestone: number,
  value: number
) => {
  return Math.ceil(
    ((value - previousMilestone) / (nextMilestone - previousMilestone)) * 100
  );
};
