import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
    if (req.method == "DELETE") {
        let session = await getServerSession(req, res, authOptions);
        const db = (await connectDB).db("forum");
        if (session) {
            let check = await db.collection("post").findOne({ _id: new ObjectId(req.query.id) });

            if (check && check.author == session.user.email) {
                let result = await db.collection("post").deleteOne({ _id: new ObjectId(req.query.id) });
                res.status(200).json("삭제완료");
                console.log(result);
            } else {
                return res.status(400).json({ message: "유저 정보가 달라 삭제할 수 없음" });
            }
        } else {
            return res.status(403).json({ message: "로그인 후 삭제 가능" });
        }
    }
}
