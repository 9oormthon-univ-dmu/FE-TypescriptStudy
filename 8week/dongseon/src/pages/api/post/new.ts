import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/utils/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

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

    req.body.author = session.user?.email;

    console.log(req.body);

    // 유저 입력 데이터 확인
    const { title, content } = req.body;
    if (title === "" || content === "") {
      return res.status(400).send("title or content is not filled");
    }

    try {
      const db = (await connectDB).db("forum");
      await db.collection("post").insertOne(req.body);
    } catch (err) {
      console.log("# DB error\n" + err);
    }

    res.status(201).redirect("/list");
  }
}
