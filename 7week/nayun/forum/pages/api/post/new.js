import { connectDB } from "@/util/database"

export default async function handler(request, response) {
  if (request.method == 'POST'){
    if (request.body.title == '') {
      return response.status(500).json('write title')
    }
    try {
      let db = (await connectDB).db('forum')
      let result = db.collection('post').insertOne(request.body)
      response.redirect(302, '/list')
    } catch (error) {
      console.log('db error')
    } 
  }
} 