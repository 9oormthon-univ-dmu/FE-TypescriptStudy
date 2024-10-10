import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/utils/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { ObjectId } from "mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    // 유저 로그인 확인
    let session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(403).send("User has to log in");
    }

    // 유저 입력 데이터 확인
    const { comment, parentID } = JSON.parse(req.body);
    if (comment === "" || parentID === "") {
      return res.status(400).send("comment is not filled");
    }

    const saveData = {
      content: comment,
      parentID: new ObjectId(parentID),
      author: session.user?.email,
    };

    try {
      const db = (await connectDB).db("forum");
      await db.collection("comment").insertOne(saveData);
    } catch (err) {
      console.log("# DB error\n" + err);
    }

    res.status(200).send("ok");
  }
}
