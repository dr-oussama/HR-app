// utils/auth.ts

import { sign, verify } from 'jsonwebtoken';
import { serialize, parse } from 'cookie';
import { NextApiResponse } from 'next';

const TOKEN_SECRET = 'your_secret_key'; 

export const createToken = (data: Record<string, any>) => {
  return sign(data, TOKEN_SECRET, { expiresIn: '1h' });
};

export const verifyToken = (token: string) => {
  return verify(token, TOKEN_SECRET);
};

export const setCookie = (res: NextApiResponse, name: string, value: string, options?: any) => {
  const cookie = serialize(name, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 1 week
    ...options,
  });

  res.setHeader('Set-Cookie', cookie);
};

export const parseCookies = (req: { headers: { cookie?: string } }) => {
  return parse(req.headers.cookie || '');
};
