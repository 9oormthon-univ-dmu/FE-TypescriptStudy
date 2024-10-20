import { connectDB } from "@/util/database";
import bcrypt from 'bcrypt';
export default async function handler(request, response){
    if(request.method == 'POST'){
        let hash = await bcrypt.hash(request.body.password, 10)
        console.log(hash)
        console.log(request.body)
        request.body.password = hash
        let db = (await connectDB).db('forum');
        await db.collection('user_cred').insertOne(request.body)
        response.status(200).json('가입 완료')
    }
}