import { connectDB } from "@/util/database.js";
import { ObjectId } from "mongodb";

export default async function handler(request, response) {
  if (request.method == "DELETE") {
    let db = (await connectDB).db("forum");
    let result = await db.collection("post").deleteOne({_id : new ObjectId(request.body._id)});
    console.log(result);

    response.status(200).json('delete');
  }
}
