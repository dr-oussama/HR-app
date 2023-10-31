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
  } else if (req.method === "PATCH") {
    try {
      const {
        payroll_id,
        pay_period_start,
        pay_period_end,
        bonuses,
        deductions,
      } = req.body;
      const date_start = new Date(pay_period_start);
      const date_end = new Date(pay_period_end);

      const newPayroll = await prisma.payroll.update({
        data: {
          pay_period_start: date_start,
          pay_period_end: date_end,
          bonuses: Number(bonuses),
          deductions: Number(deductions),
        },
        where: {
          payroll_id,
        },
      });

      return res.status(201).json(newPayroll);
    } catch (error) {
      return res.status(500).json({ error: "Error here updating payroll" });
    }
  }

  return res.status(405).end();
}
