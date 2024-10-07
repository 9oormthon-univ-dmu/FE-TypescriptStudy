# Next.js 기반 게시판 기능 구현하기
---

## 📋 기능 설계

1. **글 작성 페이지 레이아웃**
   - 글 작성 폼과 전송 버튼이 포함된 레이아웃을 구성
   - 유저가 입력한 데이터를 서버로 전송할 수 있는 폼을 생성

2. **폼 제출 시 서버로 데이터 전송**
   - 전송 버튼을 누르면 서버로 입력된 데이터를 전송

3. **서버에서 데이터 확인 및 DB 저장**
   - 서버에서 데이터 유효성을 확인하고 이상이 없으면 DB에 저장
   - 글 작성 시 입력한 데이터를 DB에 기록

---

## 💻 코드 구현 예시

### 1️⃣ 글 작성 페이지 만들기 (`/write/page.js`)

```jsx
export default async function Write() {
  return (
    <div className="p-20">
      <form action="/api/post/new" method="POST">
        <input name="title" placeholder="글제목" />
        <input name="content" placeholder="글내용" />
        <button type="submit">전송</button>
      </form>
    </div>
  );
}
```

- **폼을 구성하는 요소**
  - `<form>` 태그를 사용하여 `action` 속성과 `method` 속성으로 데이터를 전송할 URL과 HTTP 메서드를 지정
  - `input` 요소로 제목과 내용을 입력받아 `POST` 요청으로 서버에 전송

---

### 2️⃣ 서버 기능 구현하기 (`/api/post/new.js`)

```javascript
import { connectDB } from "@/util/database";

export default async function handler(request, response) {
  if (request.method === 'POST') {
    try {
      const db = (await connectDB).db('forum');
      const result = await db.collection('post').insertOne(request.body);
      response.redirect(302, '/list');  // 글 목록 페이지로 이동
    } catch (error) {
      console.error("DB 저장 중 오류 발생:", error);
      response.status(500).json("DB 저장 실패");
    }
  }
}
```

- **서버에서 요청을 처리하는 방식**
  - `request.method`를 통해 요청 메서드를 확인하고, `POST` 요청일 때만 처리
  - 데이터베이스에 연결하여 새로운 문서를 삽입 후 성공 시 리스트 페이지로 리다이렉트

---

### 3️⃣ MongoDB에 데이터 저장하기

> `await db.collection('컬렉션이름').insertOne(저장할 object)`  
> 이 코드로 데이터베이스에 글 데이터를 저장할 수 있음.

```javascript
import { connectDB } from "@/util/database";

export default async function handler(request, response) {
  if (request.method === 'POST') {
    try {
      const db = (await connectDB).db('forum');
      const result = await db.collection('post').insertOne(request.body);
      response.redirect(302, '/list');  // 글 목록 페이지로 이동
    } catch (error) {
      console.error("DB 저장 중 오류 발생:", error);
      response.status(500).json("DB 저장 실패");
    }
  }
}
```

- **코드 설명**
  - `connectDB`를 사용하여 데이터베이스에 연결하고, `request.body`를 `insertOne` 메서드에 전달하여 새로운 문서를 추가함
  - 에러 발생 시 `console.error`로 로그를 출력하고 `500` 상태 코드를 응답

---

## ⚠️ 예외 처리 및 유효성 검사

1. **빈 칸 방지**
   - 유저가 제목이나 내용을 입력하지 않은 경우 저장을 막음
   ```javascript
   if (request.body.title === '') {
     return response.status(500).json('제목을 입력해주세요');
   }
   ```

2. **기타 유효성 검사**
   - 제목이 너무 길거나 특수문자 포함 여부를 검사하여 악성 유저를 방지함

3. **서버 측 유효성 검사**
   - 프론트엔드에서만 유효성 검사를 할 경우, 유저가 데이터를 조작할 수 있으므로 **서버에서도 필수로 검사를 해야** 함

```javascript
import { connectDB } from "@/util/database";

export default async function handler(request, response) {
  if (request.method == 'POST') {
    // 유효성 검사
    if (request.body.title === '') {
      return response.status(500).json('제목을 입력해주세요');
    }
    if (request.body.title.length > 50) {
      return response.status(500).json('제목이 너무 깁니다');
    }

    try {
      const db = (await connectDB).db('forum');
      const result = await db.collection('post').insertOne(request.body);
      response.redirect(302, '/list');  // 글 목록 페이지로 이동
    } catch (error) {
      console.error("DB 저장 중 오류 발생:", error);
      response.status(500).json("DB 저장 실패");
    }
  }
}
```

- **유효성 검사 코드**
  - 빈 칸 확인: `request.body.title === ''`
  - 길이 제한 확인: `request.body.title.length > 50`
  - 검사를 통과하지 못하면 `500` 상태 코드와 에러 메시지 반환

---

## 📌 추가 기능: 글 수정하기

1. **클라이언트에서 수정 폼 구성**

```jsx
<div className="write">
  <form action="/api/post/edit" method="POST">
    <input name="title" defaultValue={result.title} />
    <input name="content" defaultValue={result.content} />
    <input name="_id" defaultValue={result._id.toString()} style={{ display: "none" }} />
    <button type="submit">전송</button>
  </form>
</div>
```

- `defaultValue` 속성을 사용하여 기존 데이터를 폼에 채워넣음
- `style={{ display: "none" }}`을 사용하여 `_id` 필드를 숨겨 유저가 볼 수 없도록 함

2. **서버에서 글 수정 기능 구현**

```javascript
import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(request, response) {
  if (request.method == 'POST') {
    const 바꿀데이터 = { title: request.body.title, content: request.body.content };
    const db = (await connectDB).db('forum');
    const result = await db.collection('post').updateOne(
      { _id: new ObjectId(request.body._id) },
      { $set: 바꿀데이터 }
    );

    response.redirect(302, '/list');  // 글 목록 페이지로 이동
  }
}
```

- **글 수정 코드**
  - `updateOne` 메서드를 사용하여 특정 문서를 찾아 수정함
  - `_id`는 `ObjectId`로 변환하여 DB 쿼리에서 사용할 수 있도록 설정함
  - 수정이 완료되면 리스트 페이지로 리다이렉트
