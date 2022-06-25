import { getDb } from "./server.db";
import crypto from "crypto";

function hash({ password, salt }: { password: string; salt: string }): string {
  return crypto
    .pbkdf2Sync(password, salt, 100000, 64, "sha512")
    .toString("base64");
}

function generateSalt() {
  return crypto.randomBytes(128).toString("base64");
}

export async function signUp(email: string, password: string) {
  const salt = generateSalt();
  const password_hash = hash({ salt, password });
  await getDb()
    .insertInto("users")
    .values({ email, password_hash, salt })
    .execute();
}

// Returns true if signed in
// Returns false if wrong email or password
export async function signIn(
  email: string,
  password: string
): Promise<Boolean> {
  const res = await getDb()
    .selectFrom("users")
    .select(["password_hash", "salt"])
    .executeTakeFirst();
  if (res) {
    const { password_hash, salt } = res;
    return password_hash === hash({ password, salt });
  }
  return false;
}
