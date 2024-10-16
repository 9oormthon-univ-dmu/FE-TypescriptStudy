import { connectDB } from "@/utils/database";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { id, password, email } = req.body;
      if (id === "" || password === "" || email === "") {
        res.status(400).send("form is not filled");
      }

      // 이메일 중복 확인
      const db = (await connectDB).db("forum");
      const isEmail = await db
        .collection("user_cred")
        .findOne({ email: email });

      console.log(isEmail);
      if (isEmail) {
        res.status(400).send("user already signed in");
      }

      // password hashing
      const hash = await bcrypt.hash(password, 10);
      req.body.password = hash;

      await db.collection("user_cred").insertOne(req.body);
      res.status(200).redirect("/");
    } catch (err) {
      console.log(err);
    }
  }
}
