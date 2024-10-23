import { connectDB } from "@/util/database"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(request, response) {
  let session = await getServerSession(request, response, authOptions);
  if (request.method == 'POST'){
    if (request.body.title == '') {
      return response.status(500).json('write title')
    }
    try {
      let db = (await connectDB).db('forum')
      if(session){
        request.body.author = session.user.email
      }
      let result = db.collection('post').insertOne(request.body)
      response.redirect(302, '/list')
    } catch (error) {
      console.log('db error')
    } 
  }
} 