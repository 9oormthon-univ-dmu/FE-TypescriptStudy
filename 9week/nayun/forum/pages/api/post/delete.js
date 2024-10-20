import { connectDB } from "@/util/database.js";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(request, response) {
  if (request.method == "DELETE") {
    console.log(request.body)
    const { _id } = JSON.parse(request.body);
    let session = await getServerSession(request, response, authOptions);
    
    let db = (await connectDB).db("forum");
    let find = await db.collection('post').findOne({ _id : new ObjectId(_id) })

    if (session.user.email == find.author) {
      let result = await db
        .collection("post")
        .deleteOne({ _id: new ObjectId(_id) });
        console.log(result);
      return response.status(200).json("delete");
    } else {
      console.log(result);
      return response.status(500).json("현재유저와 작성자 불일치");
    }
  }
}
