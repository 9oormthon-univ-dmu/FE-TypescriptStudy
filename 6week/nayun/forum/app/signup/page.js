import { connectDB } from "@/util/database";

export default async function Signup() {

   const db = (await connectDB).db('forum');
   let result = await  db.collection('post').find().toArray();

  return (
    <div>
        <h4>회원가입</h4>
        <form action="/api/post/new" method="POST">
          <input name="title" placeholder="아이디"/>
          <input name="content" placeholder="비밀번호"/>
          <button type="submit">회원가입</button>
        </form>
    </div>
  );
}
