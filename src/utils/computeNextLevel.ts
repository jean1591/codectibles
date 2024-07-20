// TODO: deploy and update DB with update stats milestone % 5
export const computeNextLevel = (level: number): number => {
  if (level === 0) {
    return 1;
  }

  if (level < 4) {
    return Math.max(1, level) * 2;
  }

  // Make sure next level is divisible by 5
  return level + (5 - (level % 5));
};
