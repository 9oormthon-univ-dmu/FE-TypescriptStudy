import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/utils/database";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { title, content } = req.body;

    if (title === "" || content === "") {
      return res.status(400).send("title or content is not filled");
    }

    let data;
    try {
      const db = (await connectDB).db("forum");
      data = await db.collection("post").insertOne({
        title: title,
        content: content,
      });
    } catch (err) {
      console.log("# DB error\n" + err);
    }

    return res.status(201).redirect("/list");
  }
}
