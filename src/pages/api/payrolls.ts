import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { parseCookies, verifyToken } from "../../app/utils/auth";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const cookie = parseCookies(req);
  const token = await verifyToken(cookie.authToken);
  if (typeof token === "object" && "userId" in token) {
    const { userId } = token;
    console.log("userId: ", userId);

    if (req.method === "GET") {
      const users = await prisma.payroll.findMany({
        where: {
          user_id: Number(userId),
        },
        orderBy: {
          pay_period_end: 'desc',
        },
      });
      try {
        return res.status(200).json(users);
      } catch (error) {
        return res.status(500).json({ error: "Error fetching payrolls" });
      }
    } else if (req.method === "POST") {
      try {
        const {
          user_id,
          pay_period_start,
          pay_period_end,
          bonuses,
          deductions,
        } = req.body;
        const date_start = new Date(pay_period_start);
        const date_end = new Date(pay_period_end);

        const newPayroll = await prisma.payroll.create({
          data: {
            user_id,
            pay_period_start: date_start,
            pay_period_end: date_end,
            bonuses: Number(bonuses),
            deductions: Number(deductions),
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
  }

  return res.status(405).end();
}
