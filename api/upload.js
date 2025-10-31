import formidable from "formidable";
import fs from "fs";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

export const config = {
  api: {
    bodyParser: false,
  },
};

// Inicializa o S3 (pode ficar aqui mesmo)
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const form = formidable({ multiples: true });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      res.status(500).json({ error: "Erro ao processar upload" });
      return;
    }

    try {
      const uploadResults = await Promise.all(
        Object.keys(files).map(async (key) => {
          const file = files[key][0];
          const fileStream = fs.createReadStream(file.filepath);

          const command = new PutObjectCommand({
            Bucket: process.env.BUCKET_NAME,
            Key: file.originalFilename,
            Body: fileStream,
          });

          await s3.send(command);
          return file.originalFilename;
        })
      );

      res.status(200).json({
        message: "Arquivos enviados com sucesso!",
        files: uploadResults,
      });
    } catch (uploadErr) {
      console.error(uploadErr);
      res.status(500).json({ error: "Falha no upload" });
    }
  });
}
