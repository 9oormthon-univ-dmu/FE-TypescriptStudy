# [Next.js] 2주차 - 게시판 프로젝트

### 프로젝트 생성

npx create-next-app@latest

### MongoDB 연결

**MongoDB**

- 비관계형 데이터베이스
- collection(폴더) -> document(파일) 형식으로 데이터 저장

**MongoDB 세팅**

- mongodb.com
- Database Access 메뉴 -> atlas admin 아이디 생성
- Network Access 메뉴 -> IP 추가

### MongoDB 연결

**mongodb 라이브러리 설치**  
npm install mongodb

**database.js**

```javascript
import { MongoClient } from "mongodb";
const url = "URL";
const options = { useNewUrlParser: true };
let connectDB;

if (process.env.NODE_ENV === "development") {
  if (!global._mongo) {
    global._mongo = new MongoClient(url, options).connect();
  }
  connectDB = global._mongo;
} else {
  connectDB = new MongoClient(url, options).connect();
}
export { connectDB };
```

**connectDB 사용**

```javascript
let db = (await connectDB).db("forum");
let result = await db.collection("post").find().toArray();
```

### MongoDB 데이터 출력

```javascript
let db = (await connectDB).db("forum");
let result = await db.collection("post").find().toArray();
```

**id로 데이터 찾기**

```javascript
import { ObjectId } from "mongodb";
import { connectDB } from "@/util/database.js";

let db = (await connectDB).db("forum");
let result = await db
  .collection("post")
  .findOne({ _id: new ObjectId("63ce8d2b10e3e9fd2d7e0c0b") });
```

**await**  
자바스크립트 내에서 늦게 처리되는 코드를 바로 실행시킨다

### dynamic route

**폴더 이름**  
detail/[id]

**URL 가져오기**

```javascript
export default async function Detail(props) {
  let db = (await connectDB).db('forum')
  let result = await db.collection('post').findOne({_id : new ObjectId(props.params.id)});

  return (
    ...
  )
}
```

**\<Link>**  
페이지 자동 load는 prefetch={false}로 조절

```javascript
<Link href={"/detail/" + result[i]._id}></Link>
```

### useRouter

\<Link>외에 페이지 이동 시킬 수 있는 방법

```javascript
"use client";

import { useRouter } from "next/navigation";

export default function DetailLink() {
  let router = useRouter();
  return (
    <button
      onClick={() => {
        router.push("/");
      }}
    >
      버튼
    </button>
  );
}
```

- push : 경로로 이동
- back : 뒤로 가기
- forward : 앞으로 가기
- refresh : 새로고침
- prefetch : 페이지 내용 미리 load

**URL 관련 함수**

```javascript
let a = usePathname(); //현재 URL 출력
let b = useSearchParams(); //search 파라미터 출력
let c = useParams(); //url 파라미터 출력
```

### 서버 만들기

**기능**

- 입력 : POST
- 수정 : PUT
- 삭제 : DELETE

**Next.js server**

1. pages/api 폴더 안에 js 파일 생성
2. 요청 및 응답
   ```javascript
   export default function handler(request, response) {
     if (request.method == "GET") {
       response.status(200).json({ name: "안녕" });
     }
     if (request.method == "POST") {
       response.status(200).json({ name: "바보" });
     }
   }
   ```
   - 200 : 서버 기능 성공
   - 500 : 서버 기능 실패
   - 400 : 유저 요청 실패

### MongoDB 데이터 저장
예외처리까지 하기!
```javascript
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
```