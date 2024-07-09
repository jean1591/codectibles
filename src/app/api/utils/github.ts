import { DbTable } from "../interfaces/database";
import { SupabaseClient } from "@supabase/supabase-js";
import { UserWithRelations } from "../interfaces/user";
import { conventionalCommitType } from "../interfaces/github";
import { decrypt } from "@/utils/hash";

export const getUserDetails = async (
  supabase: SupabaseClient,
  authUserId: string
): Promise<UserWithRelations> => {
  const { data: users } = await supabase
    .from(DbTable.USER)
    .select(
      "authUserId, fetchedAt, id, level, prToClaim, token, username, stats(*)"
    )
    .eq("authUserId", authUserId);

  if (!users || users.length === 0) {
    throw new Error(`No users found for id ${authUserId}`);
  }

  return { ...users[0], token: decrypt(users[0].token) };
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
