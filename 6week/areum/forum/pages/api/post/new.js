import { connectDB } from "@/util/database";

export default async function handler(req, res) {
    if (req.method == "POST") {
        if (req.body.title == "") {
            return res.status(500).json("제목 쓰셈");
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
