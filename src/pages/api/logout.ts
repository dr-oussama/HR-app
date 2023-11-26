// pages/api/logout.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { createToken, setCookie } from '../../app/utils/auth';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Clear the authToken cookie
  setCookie(res, 'authToken', '');

  res.status(200).end();
}
