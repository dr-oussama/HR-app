import { NextApiRequest, NextApiResponse } from "next";
import formidable, { Fields, Files } from "formidable";
import fs from "fs";
import path from "path";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const form = formidable({ multiples: false, uploadDir: "./public/uploads" });

    form.parse(req, (err: any, fields: Fields, files: Files) => {
      if (err) {
        return res.status(500).json({ error: "Error uploading file" });
      }

      const avatar = Array.isArray(files.avatar) ? files.avatar[0] : files.avatar;
      if (!avatar || !avatar.name) {
        return res.status(400).json({ error: "No file selected" });
      }

      const oldPath = avatar.path;
      const extension = path.extname(avatar.name);
      const fileName = `avatar-${Date.now()}${extension}`;
      const newPath = path.join("./public/uploads", fileName);

      fs.rename(oldPath, newPath, (renameErr) => {
        if (renameErr) {
          return res.status(500).json({ error: "Error moving file to destination" });
        }

        return res.status(200).json({ fileName });
      });
    });
  } else {
    return res.status(405).end();
  }
}
