import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { parseCookies, verifyToken } from "@/app/utils/auth";

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
        const { request_message } = req.body;

        const newRequest = await prisma.documentRequests.create({
          data: {
            user_id: Number(userId),
            request_message,
            request_date: new Date(),
            status: "PENDING",
          },
        });

        return res.status(201).json(newRequest);
      } catch (error) {
        return res
          .status(500)
          .json({ error: "Error here adding request" + error });
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
}
