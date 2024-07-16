import { conventionalCommitType } from "../interfaces/github";

export const getPrType = (title: string): string | null => {
  for (let conventionalCommit of conventionalCommitType) {
    const regex = new RegExp(`^${conventionalCommit}[\\(/:]`);
    if (regex.test(title)) {
      return conventionalCommit;
    }
  }

  return null;
};
