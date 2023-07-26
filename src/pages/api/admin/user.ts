import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const users = await prisma.user.findMany();
    try {
      return res.status(200).json(users);
    } catch (error) {
      console.log("fuck");
      return res.status(500).json({ error: "Error fetching users" });
    }
  }
  
  return res.status(405).end();
}
