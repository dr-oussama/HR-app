import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const {
        id
      } = req.headers;

      const payrolls = await prisma.payroll.findMany({
        where: {
          user_id: Number(id),
        },
      });
      try {
        return res.status(200).json(payrolls);
      } catch (error) {
        return res.status(500).json({ error: "Error fetching payrolls" });
      }
    } catch (error) {
      return res.status(500).json({ error: "Error here updating payroll" });
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
