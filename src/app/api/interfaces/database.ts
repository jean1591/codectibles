export enum DbTable {
  ACTIVITY = "activities",
  BADGE = "badges",
  COLLECTIBLE = "collectibles",
  EVENT = "events",
  PR = "pr",
  RELATION = "relations",
  STAT = "stats",
  USER = "users",
}

export enum DbError {
  GET_RPC = "Error fetching data with RPC",
  INSERT = "Error inserting data",
  UPDATE = "Error updating data",
}
