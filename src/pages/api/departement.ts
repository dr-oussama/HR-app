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
      return res.status(500).json({ error: "Error fetching users" });
    }
  } else if (req.method === "POST") {
    try {
      const { department_name } = req.body;

      const newPayroll = await prisma.departments.create({
        data: {
          department_name,
        },
      });

      return res.status(201).json(newPayroll);
    } catch (error) {
      return res.status(500).json({ error: "Error here adding payroll" });
    }
  } 
  return res.status(405).end();
}
