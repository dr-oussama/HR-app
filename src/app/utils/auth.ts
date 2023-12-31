import { sign, verify } from "jsonwebtoken";
import cookie from "cookie";
import { NextApiResponse } from "next";

const TOKEN_SECRET = "your_secret_key";

export const createToken = (data: Record<string, any>) => {
  return sign(data, TOKEN_SECRET, { expiresIn: "7d" });
};

export const verifyToken = (token: string) => {
  return verify(token, TOKEN_SECRET);
};

export const setCookie = (
  res: NextApiResponse,
  name: string,
  value: string,
  options?: any
) => {
  const cookies = cookie.serialize(name, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    ...options,
  });

  res.setHeader("Set-Cookie", cookies);
};

export const parseCookies = (req: { headers: { cookie?: string } }) => {
  return cookie.parse(req.headers.cookie || "");
};

