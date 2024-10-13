import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
    let session = await getServerSession(req, res, authOptions);
    if (req.method == "POST") {
        req.body = JSON.parse(req.body);
        let newComment = {
            content: req.body.comment,
            parent: new ObjectId(req.body._id),
            author: session.user.email,
            author_name: session.user.name,
        };
        let db = (await connectDB).db("forum");
        let result = await db.collection("comment").insertOne(newComment);
        res.status(200).json("저장완");
    }
}
