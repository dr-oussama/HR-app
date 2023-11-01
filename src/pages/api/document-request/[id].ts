import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PATCH") {
    try {
      const { status, request_id } = req.body;
      const newRequest = await prisma.documentRequests.update({
        data: {
          status,
        },
        where: {
          request_id,
        },
      });

      return res.status(201).json(newRequest);
    } catch (error) {
      return res.status(500).json({ error: "Error here updating request" });
    }
  }

  return res.status(405).end();
}
