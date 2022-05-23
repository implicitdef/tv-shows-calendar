import type { NextApiRequest, NextApiResponse } from "next";
import { loadData } from "../../../../server.core";
import { Season } from "../../../../structs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Season<string>[] | { error: string }>
) {
  const { id } = req.query;
  if (!id || typeof id !== "string") {
    throw new Error("Invalid id parameter");
  }
  const data = await loadData();
  const serieAndSeason = data.find((_) => String(_.serie.id) === id);
  if (!serieAndSeason) {
    return res.status(404).json({ error: "not found" });
  }
  return res.json(serieAndSeason.seasons);
}
