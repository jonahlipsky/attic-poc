// import AWS from "aws-s3";
import stream from "stream";
import fs from "fs";

function uploadFromStream(s3) {
  // const file = document.getElementById("file-upload");
  // const s3 = new AWS.S3({
  //   accessKeyId: process.env.ACCESSKEYID,
  //   secretAccessKey: process.env.SECRETKEY,
  //   region: process.env.REGION,
  // });
  // const input = fs.createReadStream(file);
  // input.pipe(uploadFromStream(s3));

  const pass = new stream.PassThrough();

  const params = { Bucket: process.env.BUCKET, Key: "test123", Body: pass };
  s3.upload(params, function (err, data) {
    console.log(err, data);
  });

  return pass;
}

export default function handler(req, res) {
  console.log("Some request.");
  if (req.method == "POST") {
    console.log("Post Request to File Upload");
    res.send({
      status: true,
      message: "success from the backend!",
    });
  } else {
    console.log("Not Post Request to File Upload");
  }
}
