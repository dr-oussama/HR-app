import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const users = await prisma.user.findMany();
    try {
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ error: "Error fetching users" });
    }
  } else if (req.method === "POST") {
    try {
      const {
        cin,
        first_name,
        last_name,
        picture,
        email,
        password,
        phone_number,
        hire_date,
        job_title,
        basic_salary,
        departement_id,
      } = req.body;
      const date = new Date(hire_date);

      const newUser = await prisma.user.create({
        data: {
          cin,
          first_name,
          last_name,
          picture,
          email,
          password,
          phone_number,
          hire_date: date,
          job_title,
          basic_salary,
          role: "user",
          department_id: parseInt(departement_id),
        },
      });

      return res.status(201).json(newUser);
    } catch (error) {
      return res.status(500).json({ error: "Error here adding user" });
    }
  }

  return res.status(405).end();
}
