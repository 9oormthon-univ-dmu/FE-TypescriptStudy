import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
    if (req.method == "POST") {
        let session = await getServerSession(req, res, authOptions);
        if (session) {
            req.body.author = session.user.email;
        } else {
            return res.status(403).json("로그인 후 이용 가능");
        }
        if (!req.body.title || !req.body.content) {
            return res.status(500).json("제목 또는 내용을 적어주세요");
        }
        try {
            let date = new Date();
            const db = (await connectDB).db("forum");
            const writeDate = {
                ...req.body,
                date: date,
            };
            await db.collection("post").insertOne(writeDate);
            return res.status(200).redirect("/list");
        } catch (error) {
            return res.status(500).json("DB ERROR");
        }
    }
}
