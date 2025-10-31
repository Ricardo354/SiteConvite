import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    console.log("ENV REGION:", process.env.AWS_REGION);
    console.log("ENV BUCKET:", process.env.BUCKET_NAME);
    const command = new ListObjectsV2Command({
      Bucket: process.env.BUCKET_NAME,
    });

    const data = await s3.send(command);

    console.log("S3 Contents:", data.Contents);
    const images =
      data.Contents?.map((item) => {
        const fileName = item.Key; // the S3 file key
        const url = `https://${process.env.BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;

        return {
          url,
          name: decodeURIComponent(fileName),
        };
      }) || [];

    res.status(200).json({ images });
  } catch (error) {

    res.status(500).json({ error: error });
  }
}
