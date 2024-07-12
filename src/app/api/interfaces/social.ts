export interface Rank {
  rank: number | "🥇" | "🥈" | "🥉" | "?";
  username: string;
  xp: number;
}

export interface Follow {
  level: number;
  username: string;
  xp: number;
}

export interface Social {
  leaderboard: Rank[];
  follows: Follow[];
}
