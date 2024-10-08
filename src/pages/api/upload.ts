import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import { File } from "formidable";
import { promises as fs } from "fs";
import path from "path";

/* Don't miss that! */
export const config = {
  api: {
    bodyParser: false,
  },
};

type ProcessedFiles = Array<[string, File]>;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  let status = 200;
  let resultBody = {
    status: "ok",
    message: "Files were uploaded successfully",
    file_path: "",
  };

  /* Get files using formidable */
  const files = await new Promise<ProcessedFiles | undefined>(
    (resolve, reject) => {
      const form = formidable({});
      const files: ProcessedFiles = [];
      form.on("file", function (field, file) {
        files.push([field, file]);
      });
      form.on("end", () => resolve(files));
      form.on("error", (err) => reject(err));
      form.parse(req);
    }
  ).catch((e) => {
    console.log(e);
    status = 500;
    resultBody = {
      status: "fail",
      message: "Upload error",
      file_path: "",
    };
  });

  if (files?.length) {
    /* Create directory for uploads */
    const targetPath = path.join(process.cwd(), `public/uploads/`);
    try {
      await fs.access(targetPath);
    } catch (e) {
      await fs.mkdir(targetPath);
    }

    /* Move uploaded files to directory */
    for (const file of files) {
      const tempPath = file[1].filepath;
      const destinPath =
        targetPath +
        Date.now() +
        "." +
        file[1].originalFilename?.split(".")[
          file[1].originalFilename?.split(".").length - 1
        ];
      await fs.rename(tempPath, destinPath);
      resultBody.file_path = await destinPath.split("uploads\\")[1];
      console.log("result: ", resultBody);
    }
  }

  res.status(status).json(resultBody);
};

export default handler;
