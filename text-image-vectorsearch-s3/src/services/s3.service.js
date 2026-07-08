const fs = require("fs");
const { PutObjectCommand } = require("@aws-sdk/client-s3");

const s3Client = require("../config/aws");
const { generatePresignedUrl } = require("./presigned-url.service");

async function uploadFile(file) {
  const fileBuffer = fs.readFileSync(file.path);

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: file.filename,
    Body: fileBuffer,
    ContentType: file.mimetype,
  });

  await s3Client.send(command);

  fs.unlinkSync(file.path);

  const imageUrl = await generatePresignedUrl(file.filename);

  return {
    key: file.filename,
    imageUrl,
  };
}

module.exports = {
  uploadFile,
};