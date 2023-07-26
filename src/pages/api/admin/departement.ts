import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const departements = await prisma.departments.findMany();
    try {
      return res.status(200).json(departements);
    } catch (error) {
      return res.status(500).json({ error: "Error fetching departements" });
    }
  }
  
  return res.status(405).end();
}
