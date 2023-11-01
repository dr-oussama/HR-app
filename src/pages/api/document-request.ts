import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const documentRequests = await prisma.documentRequests.findMany({
      include: {
        user: true,
      },
    });
    try {
      return res.status(200).json(documentRequests);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Error fetching document requests" });
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
  } else if (req.method === "PATCH") {
    try {
      const { status, request_id } = req.body;

      const newPayroll = await prisma.documentRequests.update({
        data: {
          status,
        },
        where: {
          request_id,
        },
      });

      return res.status(201).json(newPayroll);
    } catch (error) {
      return res.status(500).json({ error: "Error here adding payroll" });
    }
  }
  return res.status(405).end();
}
