import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const userId = req.query.id;

  if (req.method === "GET") {
    try {
      const user = await prisma.user.findUnique({
        where: { user_id: Number(userId) },
        include: {
          payroll: true,
        },
      });
      console.log(user);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ error: "Error fetching user" });
    }
  } else if (req.method === "PATCH") {
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
        department_id,
      } = req.body;
      const date = new Date(hire_date);
      const updatedUser = await prisma.user.update({
        where: { user_id: Number(userId) },
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
          basic_salary: parseFloat(basic_salary),
          department_id: parseInt(department_id),
        },
      });
      console.log("khdam");
      return res.status(200).json(updatedUser);
    } catch (error) {
      return res.status(500).json({ error: "Error updating user" });
    }
  }

  return res.status(405).end();
}
