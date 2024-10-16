import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/utils/database";
import { ObjectId } from "mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { id } = req.query;

    const db = (await connectDB).db("forum");
    let result = await db
      .collection("comment")
      .find({ parentID: new ObjectId(id as string) })
      .toArray();

    res.status(200).json(result);
  } catch (err) {
    console.log("DB error");
  }
}
