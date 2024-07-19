import { DbTable } from "../interfaces/database";
import { SupabaseClient } from "@supabase/supabase-js";
import { UserDbWithRelations } from "../interfaces/user";
import { decrypt } from "@/utils/hash";

export const getUserByAuthUserId = async (
  supabase: SupabaseClient,
  authUserId: string,
  decryptToken: boolean = false
): Promise<UserDbWithRelations> => {
  const { data: users } = await supabase
    .from(DbTable.USER)
    .select(
      "authUserId, fetchedAt, id, level, prToClaim, token, username, badges(*), collectibles(*), stats(*)"
    )
    .eq("authUserId", authUserId);

  if (!users || users.length === 0) {
    throw new Error(`No users found for authUserId ${authUserId}`);
  }

  if (decryptToken) {
    return {
      ...users[0],
      token: decrypt(users[0].token),
    };
  }

  return users[0];
};
