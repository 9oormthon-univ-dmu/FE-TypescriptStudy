import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/utils/database";
import { ObjectId } from "mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    const { contentID } = req.body;

    try {
      const db = (await connectDB).db("forum");
      await db.collection("post").deleteOne({ _id: new ObjectId(contentID) });
    } catch (err) {
      console.log("# DB error\n" + err);
    }

    res.status(200).redirect("/list");
  }
}
