// pages/api/logout.ts

import { NextApiRequest, NextApiResponse } from "next";
import { setCookie, parseCookies, verifyToken } from "../../app/utils/auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Clear the authToken cookie
  //setCookie(res, 'authToken', '');
  const cookie = parseCookies(req);
  console.log("cookie: ", verifyToken(cookie.authToken));
  res.status(200).end();
}
