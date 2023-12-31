// pages/api/login.ts

import { NextApiRequest, NextApiResponse } from "next";
import { createToken, setCookie } from "../../app/utils/auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end(); // Method Not Allowed
  }

  const { cin, password } = req.body;

  try {
    // Find the user with the given email
    const user = await prisma.user.findFirst({ where: { cin } });

    if (!user) {
      return res.status(401).json({ error: "CIN is incorrect" });
    }

    // Compare the password with the hashed password in the user data
    const isPasswordValid = password == user.password;

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Password is incorrect" });
    }

    // Create a JWT token
    const token = createToken({
      userId: user.user_id,
      userCin: user.cin,
      firstName: user.first_name,
      lastName: user.last_name,
    });

    // Set the token in a cookie
    setCookie(res, "authToken", token);

    console.log("login", );
    // If the email and password are valid, return a success message or user data
    return res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
