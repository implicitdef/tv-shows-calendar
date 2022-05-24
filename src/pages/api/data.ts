import type { NextApiRequest, NextApiResponse } from "next";
import { PUSH_DATA_API_KEY } from "../../server.conf";
import { getDb } from "../../server.db";

// Overrides the underlying data (shows, seasons, etc.) in one big HTTP POST
// Actually will just inserts a new line in the DB, for safety
// but only the most recent row is ever read, so be careful, if you push to this
// you have to push ALL the data you need
// You have to send an api key in the param 'key'
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    | {
        message: string;
      }
    | { error: string }
  >
) {
  if (req.method === "POST") {
    const { key } = req.query;
    if (!key || typeof key !== "string" || key !== PUSH_DATA_API_KEY) {
      res.status(401).send({ error: "invalid key" });
    }
    if (typeof req.body !== "string") {
      res
        .status(401)
        .send({ error: "invalid request body, should be a string" });
    }
    await getDb()
      .insertInto("raw_json_data")
      .values({ content: req.body })
      .execute();
    res.json({ message: "Done" });
  } else {
    res.status(404).send({ error: "not found" });
  }
}
