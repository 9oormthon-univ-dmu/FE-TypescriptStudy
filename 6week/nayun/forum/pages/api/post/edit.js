import { connectDB } from "@/util/database.js"
import { ObjectId } from "mongodb";

export default async function handler(request, response) {
  if (request.method == 'POST'){

    let setInfo = {title : request.body.title, content : request.body.content}
    let db = (await connectDB).db('forum')
    let result = await db.collection('post').updateOne(
      {_id : new ObjectId(request.body._id)}, 
      { $set : setInfo} 
    );
    console.log(result)

    response.redirect(302, '/list')
  }
}