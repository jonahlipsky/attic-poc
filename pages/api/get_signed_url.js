import { S3Client } from "@aws-sdk/client-s3";
const REGION = "us-east-2";

import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  if (req.method == "POST") {
    const prisma = new PrismaClient();

    const { accessKey, secretAccessKey, fileName } = req.body;

    const sessionToken = req.cookies["next-auth.session-token"];
    const session = await prisma.session.findUnique({
      where: { sessionToken: sessionToken },
    });

    console.log(session.sessionToken);

    const file = await prisma.file.create({
      data: {
        name: fileName,
        userId: session.userId,
      },
    });

    console.log(file);

    const bucketParams = {
      Bucket: `attic-dev`,
      Key: file.s3Identifier,
    };

    try {
      const command = new PutObjectCommand(bucketParams);
      const s3Client = new S3Client({
        region: REGION,
        credentials: {
          accessKeyId: accessKey,
          secretAccessKey: secretAccessKey,
        },
      });

      const signedUrl = await getSignedUrl(s3Client, command, {
        expiresIn: 3600,
      });
      console.log("Sending signed URL");
      res.status(200).json({
        signedUrl,
      });
    } catch (err) {
      res.status(500).send({ error: err });
    }
  } else {
    console.log("Not a GET Request.");
  }
}
