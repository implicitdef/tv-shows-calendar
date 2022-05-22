import type { NextApiRequest, NextApiResponse } from "next";
import {
  defaultShowsIds as DEFAULT_SHOWS_IDS,
  loadData,
} from "../../../server.core";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    {
      id: number;
      name: string;
    }[]
  >
) {
  const data = await loadData();
  const series = data.map((_) => _.serie);
  const seriesFiltered = series.filter((serie) =>
    DEFAULT_SHOWS_IDS.includes(serie.id)
  );
  res.json(seriesFiltered);
}
