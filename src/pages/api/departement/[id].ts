import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PATCH") {
    try {
      const { department_id, department_name } =
        req.body;

      const newDepartement = await prisma.departments.update({
        data: {
          department_name,
        },
        where: {
          department_id,
        },
      });

      return res.status(201).json(newDepartement);
    } catch (error) {
      return res.status(500).json({ error: "Error here updating departement" });
    }
  }

  return res.status(405).end();
}
