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
      const documents = await prisma.documents.findMany({
        where: {
          user_id: Number(userId),
        },
        orderBy: {
          document_id: "desc",
        },
      });
      try {
        return res.status(200).json(documents);
      } catch (error) {
        return res.status(500).json({ error: "Error fetching documents" });
      }
    } else if (req.method === "POST") {
      try {
        const { user_id, document_name, document_file } = req.body;

        const newDocument = await prisma.documents.create({
          data: {
            user_id,
            document_name,
            document_file,
          },
        });

        return res.status(201).json(newDocument);
      } catch (error) {
        return res.status(500).json({ error: "Error adding document" });
      }
    }
    return res.status(405).end();
  }
}
