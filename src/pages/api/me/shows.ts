import type { NextApiRequest, NextApiResponse } from "next";
import { loadData } from "../../../server.core";
import { getDb } from "../../../server.db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    {
      id: number;
      name: string;
    }[]
  >
) {
  // TODO faire une vraie authentication plutôt qu'un paramètre de query
  const { userId } = req.query;
  if (!userId || typeof userId !== "string") {
    throw new Error("missing user id");
  }

  const userSeriesIds: number[] = (
    await getDb()
      .selectFrom("users_series")
      .select("serie_id")
      .where("user_id", "=", parseInt(userId, 10))
      .orderBy("serie_id", "asc")
      .execute()
  ).map((_) => _.serie_id);

  const series = (await loadData())
    .map((_) => _.serie)
    .filter((_) => userSeriesIds.includes(_.id));

  res.json(series);
}
