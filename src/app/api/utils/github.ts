import { conventionalCommitType } from "../interfaces/github";

export const getPrType = (title: string): string | null => {
  try {
    const prType = title.split(":")[0];

    if (conventionalCommitType.includes(prType)) {
      return prType;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};
