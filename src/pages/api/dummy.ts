import type { NextApiRequest, NextApiResponse } from "next";
import { signIn, signUp } from "../../server.users";

// Dummy api just to test run some code
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const _ = await signIn("foo@gmail.com", "monpassword");
  res.json({ message: _ });
}
