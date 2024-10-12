import { connectDB } from "@/util/database";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
    if (req.method == "POST") {
        if (!req.body.email || !req.body.name || !req.body.password) {
            return res.status(400).json("빈칸을 모두 채워주세요");
        }

        let db = (await connectDB).db("forum");

        const existingUser = await db.collection("user_cred").findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(409).json({ message: "이미 존재하는 이메일입니다" });
        }

        let hash = await bcrypt.hash(req.body.password, 10);
        req.body.password = hash;

        await db.collection("user_cred").insertOne(req.body);
        res.status(200).json("가입 성공");
    }
}
