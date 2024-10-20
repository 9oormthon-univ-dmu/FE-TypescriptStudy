import { connectDB } from "@/util/database"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { ObjectId } from "mongodb";

export default async function handler(request, response) {
  let session = await getServerSession(request, response, authOptions);
  if (request.method == 'POST'){
    let comment = {
        content : request.body.comment,
        parent : new ObjectId(request.body._id),
        author : session.user.email,
        name : session.user.name
    }
    let db = (await connectDB).db("forum");
    let result = db.collection('comment').insertOne(comment)
    response.status(200).json('저장 완료')
    console.log(result)
  }
} 