import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/utils/database";
import { ObjectId } from "mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { title, content, contentID } = req.body;

    const editedData = {
      title: title,
      content: content,
    };

    try {
      const db = (await connectDB).db("forum");
      await db.collection("post").updateOne(
        {
          _id: new ObjectId(contentID),
        },
        {
          $set: editedData,
        }
      );
    } catch (err) {
      console.log("# DB error\n" + err);
    }

    res.status(200).redirect(`/detail/${contentID}`);
  }
}
