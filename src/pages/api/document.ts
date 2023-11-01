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
