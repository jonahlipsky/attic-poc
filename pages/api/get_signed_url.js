import { S3Client } from "@aws-sdk/client-s3";
// Set the AWS Region.
const REGION = "us-east-2";
// Create an Amazon S3 service client object.
const s3Client = new S3Client({
  region: REGION,
});

import {
  // CreateBucketCommand,
  // DeleteObjectCommand,
  PutObjectCommand,
  // DeleteBucketCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
// import fetch from "node-fetch";

export const bucketParams = {
  Bucket: `attic-dev`,
  Key: `test-object-${Math.ceil(Math.random() * 10 ** 10)}`,
};

export default async function handler(req, res) {
  if (req.method == "GET") {
    try {
      const command = new PutObjectCommand(bucketParams);
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
