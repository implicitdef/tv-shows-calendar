import { NextApiRequest } from "next";

// TODO faire une vraie authentication plutôt qu'un paramètre de query
// Utiliser "https://next-auth.js.org/" pour le mode passwordless
// voir aussi https://nextjs.org/docs/authentication

export function getConnectedUserId(req: NextApiRequest): string {
  const { userId } = req.query;
  if (!userId || typeof userId !== "string") {
    throw new Error("missing user id");
  }
  return userId;
}
