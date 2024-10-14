# [Next.js] 3주차 - 게시판 프로젝트

### 게시물 수정

**dynamic route 사용**

```javascript
<Link href={"/edit/" + item._id}>🖊️</Link>
```

**수정 페이지**

```javascript
<div className="p-20">
  <h4>수정 페이지</h4>
  <form action="/api/post/edit" method="POST">
    <input name="title" placeholder="글제목" defaultValue={result.title} />
    <input name="content" placeholder="글내용" defaultValue={result.content} />
    <input
      name="_id"
      style={{ display: "none" }}
      defaultValue={result._id.toString()}
    />
    <button type="submit">수정</button>
  </form>
</div>
```

- 해당 게시물 id를 가진 글을 DB에서 가져와 defaultValue안에 넣기
- id 전송 시 toString 사용하기
- display : none으로 id 노출 방지

**MongoDB 데이터 수정**

- pages/api/post/edit
  updateOne으로 db 데이터 수정

```javascript
import { connectDB } from "@/util/database.js";
import { ObjectId } from "mongodb";

export default async function handler(request, response) {
  if (request.method == "POST") {
    let setInfo = { title: request.body.title, content: request.body.content };
    let db = (await connectDB).db("forum");
    let result = await db
      .collection("post")
      .updateOne({ _id: new ObjectId(request.body._id) }, { $set: setInfo });
    console.log(result);

    response.redirect(302, "/list");
  }
}
```

## 게시물 삭제

**use client**   
client component(ListItem)를 만들어 글목록 UI 옮기기

```javascript
<div className="list-bg">
  <ListItem result={result}></ListItem>
</div>
```

use client 사용 시 props로 db데이터 전송

**Ajax 서버 요청**

- api/post/delete

```javascript
import { connectDB } from "@/util/database.js";
import { ObjectId } from "mongodb";

export default async function handler(request, response) {
  if (request.method == "DELETE") {
    let db = (await connectDB).db("forum");
    let result = await db
      .collection("post")
      .deleteOne({ _id: new ObjectId(request.body._id) });
    console.log(result);

    response.status(200).json("delete");
  }
}
```

**삭제 애니메이션 추가**

```javascript
<span
    onClick={(e) =>
      fetch("/api/post/delete", {
        method: "DELETE",
        body: item._id,
      })
      .then((r) => {
        return r.json;
      })
      .then(() => {
        e.target.parentElement.style.opacity = 0;
        setTimeout(() => {
          e.target.parentElement.style.disply = "none";
        }, 1000);
      })
    }
    >
    🗑️
  </span>
```
**query string**   
/url?a=1&b=2&c=3    
-> {a:1, b:2, c:2} 데이터 전송

**URL parameter**  
pages/api/abc/[id].js  
-> url parameter 자리에 집어넣은 문자 출력 가능

### 배포

**build**  
npm run build
-> 코드를 html, js, css 파일로 변환

npm run start  
-> 서버 실행

**Dynamic/Static rendering**
- static (ㅇ)
  - 생성한 html을 그대로 보여준다
  - 빠르게 페이지 전송 가능
  - 함수 사용 불가
- dynamic (λ)
  - 데이터를 가져올 때는 dynamic
  - export const dynamic = 'force-dynamic' 

**캐싱**
- force-cache
```javascript
fetch('/URL', { cache: 'force-cache' }) 
```
- revalidate
캐싱 보관 시간 적용
```javascript
fetch('/URL', { next: { revalidate: 60 } }) 
```
- no-store
```javascript
fetch('/URL', { cache: 'no-store' }) 
```

**페이지 단위 캐싱**
```javascript
export const revalidate = 60;
```

