export const conventionalCommitType = ["build", "chore", "docs", "feat", "fix", "ops", "refactor", "style", "test"]
export const conventionalCommitTypeConst = [...conventionalCommitType] as const

export type ConventionalCommitType = typeof conventionalCommitTypeConst[number];
