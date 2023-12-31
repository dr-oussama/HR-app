
import { NextApiRequest, NextApiResponse } from "next";
import { parseCookies, verifyToken } from "../../app/utils/auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const cookie = parseCookies(req);
  const token = verifyToken(cookie.authToken);
  //console.log("cookie: ", token);
  return res.status(200).json(token);
}
