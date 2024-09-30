
# Next.js 게시판(Forum) 만들기

## 📋 기능 설계

1. **글 작성 페이지 레이아웃**  
   - 글 작성 폼과 전송 버튼이 포함된 레이아웃을 만든다.

2. **폼 제출 시 서버로 데이터 전송**  
   - 전송 버튼을 누르면 서버로 입력된 데이터를 전송한다.

3. **서버에서 데이터 확인 및 DB 저장**  
   - 서버에서 데이터 유효성을 확인하고 이상이 없으면 데이터베이스(DB)에 저장한다.

---

## 💻 코드 구현 예시

### 1️⃣ 글 작성 페이지 만들기 (`/write/page.js`)

- `<form>` 태그를 사용하여 입력 폼과 전송 버튼을 생성한다.  
- `action`과 `method` 속성으로 데이터를 보낼 URL과 HTTP 메서드를 지정한다.

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

---

### 2️⃣ 서버 기능 구현하기 (`/api/post/new.js`)

- **서버에서 폼 데이터를 받는 방법**  
  - `request.body`로 `<form>` 태그에서 전송한 데이터를 확인할 수 있음

```javascript
import { connectDB } from "@/util/database";

export default async function handler(request, response) {
  if (request.method == 'POST') {
    console.log(request.body);  // 요청 데이터 확인
  }
}
```

---

### 3️⃣ MongoDB에 데이터 저장하기

- `await db.collection('컬렉션이름').insertOne(저장할object자료)`  
  - 이 코드로 데이터베이스에 글 데이터를 저장할 수 있음음

```javascript
import { connectDB } from "@/util/database";

export default async function handler(request, response) {
  if (request.method == 'POST') {
    try {
      let db = (await connectDB).db('forum');
      let result = await db.collection('post').insertOne(request.body);
      response.redirect(302, '/list');  // 글 목록 페이지로 이동
    } catch (error) {
      console.error("DB 저장 중 오류 발생:", error);
      response.status(500).json("DB 저장 실패");
    }
  }
}
```

---

## ⚠️ 예외 처리 및 유효성 검사

1. **빈 칸 방지**  
   - 유저가 제목이나 내용을 입력하지 않은 경우 저장을 막는다.

```javascript
if (request.body.title === '') {
  return response.status(500).json('제목을 입력해주세요');
}
```

2. **기타 유효성 검사**  
   - 제목이 너무 길거나 특수문자 포함 여부를 검사하여 악성 유저를 방지한다.

3. **서버 측 유효성 검사**  
   - 프론트엔드에서만 유효성 검사를 할 경우, 유저가 데이터를 조작할 수 있으므로 **서버에서도 필수로 검사를 해야** 한다.

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
      let db = (await connectDB).db('forum');
      let result = await db.collection('post').insertOne(request.body);
      response.redirect(302, '/list');  // 글 목록 페이지로 이동
    } catch (error) {
      console.error("DB 저장 중 오류 발생:", error);
      response.status(500).json("DB 저장 실패");
    }
  }
}
```
