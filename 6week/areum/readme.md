## 게시판 프로젝트 (1)

## MongoDB

**비관계형 데이터베이스**

-   Object 형태로 데이터 저장
-   NoSQL
    -   데이터 저장 및 조회하는 방법 별도 제공
    -   자바스크립트 객체 그대로 저장
-   분산 처리 지원 용이

| 관계형               | 비관계형          |
| -------------------- | ----------------- |
| Database             | Database          |
| **Table**            | **Collection**    |
| **tuple/row/record** | **document**      |
| column               | key/field         |
| primary key          | \_id              |
| join(table join)     | embedded document |

### MongoDB CRUD

| 작업       | MongoDB 메서드                              |
| ---------- | ------------------------------------------- |
| **Create** | `save`, `insert`, `insertOne`, `insertMany` |
| **Read**   | `find`, `findByID`                          |
| **Update** | `updateOne`, `updateMany`                   |
| **Delete** | `remove`, `deleteOne`, `deleteMany`         |

## Dynamic Route

고정된 URL이 아닌 사용자가 접근한 경로 또는 특정 값에 따라 동적으로 변화하는 주소 <br/>
단일 페이지, 하나의 컴포넌트를 사용하여 변화하는 데이터를 수용할 수 있는 페이지 구현 가능

예시: `‘/detail/게시물id’` 형태의 URL을 만들고 싶다면 `/detail/[id]/page.js` 이런 식으로 파일 생성

## useRouter

자바스크립트 코드로 페이지 이동을 제어할 수 있는 기능.

### 사용 예시:

```jsx
"use client";

import { useRouter } from "next/navigation";

export default function DetailLink() {
    let router = useRouter();
    return <button onClick={() => router.push("/")}>Button</button>;
}
```

-   `router.push`: 페이지 이동
-   `router.back`: 뒤로 가기
-   `router.forward`: 앞으로 가기
-   `router.refresh`: 새로고침
-   `router.prefetch`: 미리 데이터 로드 (페이지 로드 시간 단축)

## Next.js에서 API 만들기

`pages/api/` 안에 파일을 만들면 자동으로 API URL이 됨.

### 글 작성 페이지 예시:

```jsx
export default function Write() {
    return (
        <div className="p-20">
            <h4>글작성</h4>
            <form action="/api/post/new" method="POST">
                <input name="title" placeholder="제목" />
                <input name="content" placeholder="내용" />
                <button type="submit">완료</button>
            </form>
        </div>
    );
}
```

-   `/api/post/new`로 input 내용 전달

### API 핸들러 예시:

```jsx
import { connectDB } from "@/util/database";

export default async function handler(req, res) {
    if (req.method == "POST") {
        let db = (await connectDB).db("forum");
        let result = db.collection("post").insertOne(req.body);
        res.redirect(302, "/list");
    }
}
```

-   `POST` 요청을 받아 MongoDB에 데이터를 저장
