# [Next.js] 4주차 - 게시판 프로젝트

### 회원기능 방식

**session 방식**
- DB에 유저가 로그인 시 정보 저장 후 유저에게 session id 발급
- 로그인 시 유저의 session id를 DB에서 조회하여 GET/POST 진행
- 장점: 요청할 때마다 DB 확인으로 엄격한 유저 확인
- 단점: 이로 인해 DB의 부담이 심해짐

**token 방식 (JWT)**
- 유저가 로그인 시 정보를 암호화해서 전송 (DB 저장 X)
- 로그인 시 유저의 JWT를 확인 후 GET/POST 진행
- 장점: DB 부담이 적다
- 단점: JWT 도난 시 막을 수 없다

**OAuth**   
유저의 해당 사이트 사용권한을 빌릴 때 정의하는 규칙  
-> 소셜 로그인 구현

**Next-Auth 라이브러리**   
JWT 또는 OAuth 사용해 회원 기능 개발을 도와주는 라이브러리

단점: session 방식 제한으로 JWT 방식을 강제로 사용해야함

### 깃허브 소셜 로그인

**깃허브 앱 생성**
- 우측상단 Settings -> Developer settings -> New OAuth app
- ID와 secret 키 발급

**NextAuth 라이브러리 셋팅**  
```powershell
npm install next-auth 
```
라이브러리 설치  

```javascript
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: 'ID',
      clientSecret: 'Secret',
    }),
  ],
  secret : 'JWT 암호'
};
export default NextAuth(authOptions); 
```
pages/api/auth/[...nextauth].js 파일

**로그인, 로그아웃**

```javascript
import { signIn, signOut } from 'next-auth/react'
```
signIn -> 로그인 페이지 이동
signOut -> 로그아웃

**유저 정보 출력**

```javascript
import { authOptions } from "@/pages/api/auth/[...nextauth].js"
import { getServerSession } from "next-auth"

export default function Page(){
  let session = await getServerSession(authOptions)
}
```

### session 로그인

**MongoDB adapter 설정**  
```powershell
npm install @next-auth/mongodb-adapter 
```
**[...nextauth].js 설정**
```javascript
([...nextauth].js 파일)

import { connectDB } from "@/util/database";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: 'ID',
      clientSecret: 'Secret',
    }),
  ],
  secret : 'JWT 암호'
  adapter : MongoDBAdapter(connectDB), //추가
};

export default NextAuth(authOptions); 
```
-> MongoDB에 sessions, users, accouts 3개의 컬렉션 생성

### 회원 기능이 들어간 게시판
```javascript
(pages/api/post/new.js)
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
```

### 아이디/비번 방식
**아이디 비번 제출**
```javascript
(app/register/page.js)

export default function Register() {
  return (
    <div>
        <form method="POST" action="/api/auth/signup">
          <input name="name" type="text" placeholder="이름" /> 
          <input name="email" type="text" placeholder="이메일" />
          <input name="password" type="password" placeholder="비번" />
          <button type="submit">id/pw 가입요청</button>
        </form>
    </div>
  )
}
```
**DB 저장** 
```powershell
npm install bcrypt
```
암호화 라이브러리

```javascript
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
```
sign up 서버 기능 작성

**Credentials provider 설정**  
[...nextauth].js 설정에 추가(생략)

### 댓글 기능 만들기
**Comment.js로 클라이언트 컴포넌트 작성**
```javascript
"use client";

import { useEffect, useState } from "react";

export default function Comment(props) {
  console.log("id : " + props._id);
  useEffect(() => {
    fetch("/api/comment/list?id=" + props._id)
      .then((r) => r.json())
      .then((result) => {
        console.log("값" + result);
        setData(result);
        setComment("");
      });
  }, []);
  let [comment, setComment] = useState("");
  let [data, setData] = useState([]);
  return (
    <div>
      <div>
        <b>댓글 목록</b>
      </div>
      {data.length > 0
        ? data.map((a, i) => {
            return (
              <p className="comment-box" key={i}>
                {a.name + ' : ' + a.content}
              </p>
            );
          })
        : "댓글 없음"}
      <input
        value={comment}
        onChange={(e) => {
          console.log("입력값:", e.target.value);
          setComment(e.target.value);
        }}
      />
      <button
        onClick={(e) =>
          fetch("/api/comment/new", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ comment: comment, _id: props._id }),
          })
        }
      >
        댓글전송
      </button>
    </div>
  );
}
```

**댓글 전송 서버 기능**
```javascript
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
```

**댓글 보여주기 서버 기능**
```javascript
import { connectDB } from "@/util/database"
import { ObjectId } from "mongodb"

export default async function handler(request, response) {
    const db = (await connectDB).db('forum')
    let result = await db.collection('comment').find({ parent : new ObjectId(request.query.id) }).toArray()
    response.status(200).json(result)
} 
```
