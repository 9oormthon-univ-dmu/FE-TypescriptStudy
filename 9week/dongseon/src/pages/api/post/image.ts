import aws from "aws-sdk";
import { NextApiRequest, NextApiResponse } from "next";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // AWS 설정
  aws.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY, // AWS AccessKey
    secretAccessKey: process.env.AWS_SECRET_KEY, // AWS SecretKey
    region: "ap-northeast-2", // 원하는 지역
    signatureVersion: "v4",
  });

  const s3 = new aws.S3();

  // Presigned URL 발급
  const url = await s3.createPresignedPost({
    Bucket: process.env.AWS_BUCKET_NAME, // AWS 버킷 이름
    Fields: { key: req.query.file }, // 선택한 파일명
    Expires: 60, // 유효기간 (초단위)
    Conditions: [
      ["content-length-range", 0, 1048576], //파일용량 1MB 까지 제한
    ],
  });

  res.status(200).json(url);
}
