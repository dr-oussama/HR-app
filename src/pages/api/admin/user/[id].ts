import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const userId = req.query.id; 

  if (req.method === "GET") {
    try {
      const user = await prisma.user.findUnique({
        where: { user_id: Number(userId) },
      });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ error: "Error fetching user" });
    }
  }

  return res.status(405).end();
}
