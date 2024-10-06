import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
    if (req.method == "DELETE") {
        try {
            const db = (await connectDB).db("forum");
            let result = await db.collection("post").deleteOne({ _id: new ObjectId(req.query) });
            res.status(200).json("삭제완료");
        } catch (error) {
            console.error(error);
            res.status(500).json("서버 오류");
        }
    }
}
