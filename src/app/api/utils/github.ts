import { DbTable } from "../interfaces/database";
import { SupabaseClient } from "@supabase/supabase-js";
import { User } from "../interfaces/user";
import { conventionalCommitType } from "../interfaces/github";
import { decrypt } from "@/utils/hash";

export const getUserDetails = async (
  supabase: SupabaseClient,
  authUserId: string
): Promise<Pick<User, "fetchedAt" | "id" | "stats" | "token" | "username">> => {
  const { data: users } = await supabase
    .from(DbTable.USER)
    .select("fetchedAt, id, stats, token, username")
    .eq("authUserId", authUserId);

  if (!users || users.length === 0) {
    throw new Error(`No users found for authUserId ${authUserId}`);
  }

  const { fetchedAt, id, stats, token: hashedToken, username } = users[0];

  const token = decrypt(hashedToken);

  return { fetchedAt, id, stats, token, username };
};

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
