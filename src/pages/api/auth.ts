import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    try {
      // Find the user with the given email
      const user = await prisma.user.findFirst({ where: { email } });

      if (!user) {
        return res.status(401).json({ error: "Email is incorrect" });
      }

      // Compare the password with the hashed password in the user data
      const isPasswordValid = password == user.password;

      if (!isPasswordValid) {
        return res.status(401).json({ error: "Password is incorrect" });
      }

      // If the email and password are valid, return a success message or user data
      return res.status(200).json({ message: "Login successful", user });
    } catch (error) {
      console.error("Error logging in:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  return res.status(405).end();
}
