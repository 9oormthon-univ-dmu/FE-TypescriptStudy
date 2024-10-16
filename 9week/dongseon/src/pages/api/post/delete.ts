import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/utils/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(403).send("User has to log in");
    }

    const { contentID } = req.body;

    try {
      const db = (await connectDB).db("forum");
      const selectData = await db
        .collection("post")
        .findOne({ _id: new ObjectId(contentID) });

      // 유저 정보 확인
      if (
        session.user?.role != "admin" &&
        selectData?.author !== session?.user?.email
      ) {
        return res.status(403).send("user doesn't have permission");
      }

      await db.collection("post").deleteOne({ _id: new ObjectId(contentID) });
      res.status(200).redirect("/list");
    } catch (err) {
      console.log("# DB error\n" + err);
    }
  }
}
