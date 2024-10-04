import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/utils/database";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    let data;
    try {
      const db = (await connectDB).db("forum");
      data = await db.collection("post").find().toArray();
    } catch (err) {
      console.log("# DB error\n" + err);
    }

    res.status(200).json(data);
  }
}
