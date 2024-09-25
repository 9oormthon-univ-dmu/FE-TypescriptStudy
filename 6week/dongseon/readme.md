---
layout: post
title: NextJS 2
tags:
  - NextJS
  - Typescript
  - React
description: NextJS 게시판 만들기
image: /images/nextjs_logo.webp
comments: true
---

## MongoDB - Atlas

> 데이터를 영구적으로 저장하기 위해서 데이터베이스를 사용한다.

- **MongoDB** : NoSQL 데이터베이스, 문서 기반(Document-Oriented) 데이터 저장 방식으로, JSON 형태로 데이터를 저장한다.
- Collections이라는 폴더 구조로 이루어져 있고, Document 파일을 만들어서 데이터를 저장한다.

+ **MongoDB Atlas** : MongoDB의 클라우드 데이터베이스 서비스다.
무료 버전의 DB를 생성하여 간편하게 데이터베이스를 배포할 수 있다.

---

> MongoDB Atlas에서 데이터를 저장하기 위해서는 계정을 생성하고 DB를 만들어야 한다.

1. [Atlas](https://cloud.mongodb.com/) 사이트에서 계정을 생성한다.
2. 새로운 Project를 생성하고 무료 버전의 Cluster를 만들어준다. 
	- Cluster : DB를 배포해주는 클라우드 서버의 단위이다.
3. Cluster에 데이터를 저장할 Database를 만들어준다.

## NextJS - MongoDB 연결하기

프로젝트에서 MongoDB를 사용하기 위해 라이브러리를 설치한다.
`npm install mongodb`

DB와의 연결은 서버가 실행될 때 한 번만 하기 위해서 utils 파일로 만들어준다.
- connectDB 변수를 만들어서 필요할 때 마다 불러서 사용한다.
- 전역객체 global에 전역변수로 connectDB를 저장해서 보관한다.

```typescript
// MongoClient 타입을 지정하기 위해 import
import { MongoClient } from "mongodb";

const url ="MongoDB 접속 URL";
let connectDB: Promise<MongoClient>;
  
// 전역객체 타입 지정
declare global {
  var _mongo: Promise<MongoClient>;
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongo) {
    global._mongo = new MongoClient(url).connect();
  }
  connectDB = global._mongo;
} else {
  connectDB = new MongoClient(url).connect();
}

export { connectDB };
```

#### 전역객체 global - 타입애러

> 타입스크립트 컴파일러가 전역객체의 프로퍼티인 `global._mongo`의 타입을 인식하지 못하는 문제가 있다.
```
Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature.ts(7017)
```

> global의 프로퍼티 타입을 정의해서 문제를 해결했다.

```typescript
declare global {
  var _mongo: Promise<MongoClient>;
}
```

---

## 데이터 불러오기

> 사용할 데이터를 불러오기 위해서 임시 데이터를 DB에 추가한다.
- Atlas 사이트에서 Database - Browse Collections로 들어가 Collection을 선택한다.
- INSERT DOCUMENT 버튼을 눌러 데이터를 추가해준다.

---

### 리스트 페이지

> 데이터를 불러올 페이지를 만들고 코드를 작성한다.
- connectDB를 불러와서 DB를 선택해준다.
	- connectDB를 사용하는 코드는 보안상의 이유로 서버 컴포넌트에서만 사용한다.
- async - await을 사용해서 데이터를 불러오는 시간을 기다려준다.
- try - catch로 데이터를 불러오는 코드를 묶어서 애러처리를 해주었다.

```tsx
import { connectDB } from "@/utils/database";

export default async function List() {
  let data;
  try {
    // 서버 컴포넌트 안에서만 사용한다. (보안)
    const db = (await connectDB).db("forum");
    // 원하는 collection의 대이터를 불러온다.
    data = await db.collection("post").find().toArray();
  } catch (err) {
    console.error(err);
    return <div>DB error</div>;
  }

  // 찾아온 data를 map 함수를 돌려 컴포넌트로 만든다.
  return (
    <div className="list-bg">
      {data.map((d, key) => (
        <div className="list-item" key={key}>
          <h4>{d.title}</h4>
          <p>{d.content}</p>
        </div>
      ))}
    </div>
  );
}
```

---

### 상세 페이지

> 리스트에서 원하는 정보를 클릭하면 상세 페이지로 넘어온다.
> URL 이동을 구현하기 위해서는 dynamic route와 Link를 사용한다.

#### dynamic route

 > 폴더 구조를 사용하여 Path Variable을 라우팅 할 수 있게 해준다.

- `/detail/contentID` URL로 상세 페이지에 접근할 수 있도록 하기 위해 폴더를 만들어준다.
- `app/detail/[contentID]` : path variable을 폴더로 만들어 이름을 대괄호(`[]`)로 감싸준다.
- `/detail/*`로 오는 모든 요청은 `app/detail/[contentID]/page.tsx`로 넘겨진다.

--- 

#### Link, next/navigation

> 페이지를 옮겨다니기 위해 a태그 대신에 Next에서 만든 Link를 사용한다.
> URL을 활용하는 다양한 함수들이 담긴 `next/navigation` 라이브러리를 사용할 수도 있다.

- **Link** - 서버 컴포넌트에서 사용
	- `import Link from 'next/link';`
	- 페이지 미리 로딩하는 **prefetch**기능이 내장되어있다.
	- `<Link prefetch={false}/>` : prefetch을 막는다.

- **next/navigation** - 클라이언트 컴포넌트에서 사용
	- useRouter : URL을 변경해주는 함수다.
	- router 객체를 만들어 사용한다. `const router = useRouter();`
		- router.push(url) : 해당 url로 이동
		- router.back() : 이전페이지
		- router.forward() : 다음페이지
		- router.refresh() : 새로고침 (리랜더링)
		- router.prefetch(url) : 페이지 미리 로딩
	
	+ usePathname() : 현재 URL을 불러오는 함수
	+ useSearchParams() : search parameter (query string)를 불러오는 함수
	+ useParams() : path parameter (dynamic route)를 불러오는 함수

\+ next/navigation을 서버 컴포넌트에서 사용하기 위해서는 따로 클라이언트 컴포넌트 파일을 만들어서 서버 컴포넌트에 불러와 사용한다.

---

#### props

> path variable을 확인하기 위해 컴포넌트의 props를 활용한다.
> props.params에서 dynamic router에서 설정한 contentID를 불러온다.
> 해당 contentID에 맞는 데이터를 findOne 함수를 활용해 DB에서 찾아온다.

```tsx
import { connectDB } from "@/utils/database";
import { ObjectId } from "mongodb";

// props의 타입을 지정
type propsType = { params: { contentID: string } };

export default async function Detail(props: propsType) {
  const contentID = props.params.contentID;
  let data;

  // contentID를 ObjectId로 만들어서 DB에서 찾아온다.
  try {
    const db = (await connectDB).db("forum");
    data = await db
      .collection("post")
      .findOne({ _id: new ObjectId(contentID) });
  } catch (err) {
    console.error(err);
    return <div>DB error</div>;
  }

  // 데이터가 없으면 notfound를 출력한다.
  if (!data) {
    return <div>notfound contentID : {contentID}</div>;
  }

  // data가 비어있는 null값이 올 수 있어서 ?를 붙인다.
  return (
    <>
      <div>
        <h4>상세 페이지</h4>
        <h4>{data?.title}</h4>
        <p>{data?.content}</p>
      </div>
    </>
  );
}
```


## 데이터 추가하기

> DB에 데이터를 추가하기 위해서 데이터를 안전하게 넣어줄 서버를 만들어야 한다.
> form을 작성해 서버에 POST 요청을 보낸다. (생략)

### 서버

> 서버를 만드는 위치를 선택해서 api 폴더를 생성해준다.

- /app/api : 새로운 방식 (버그가 많다)
- /app/pages/api : 이전에 사용하던 방식

---

> api 폴더 안에 ts파일을 만들면 해당 파일의 이름으로 자동으로 라우팅을 해준다.
> /api/test로 요청을 보내면 test.ts 파일의 코드를 실행시켜준다.

```tsx
// request, response의 타입을 지정하기 위해 import
import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/utils/database";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { title, content } = req.body;

	// title, content에 입력한 값이 없다면 오류를 반환한다.
    if (title === "" || content === "") {
      return res.status(400).send("title or content is not filled");
    }

	// DB에 데이터 저장
    let data;
    try {
      const db = (await connectDB).db("forum");
      data = await db.collection("post").insertOne({
        title: title,
        content: content,
      });
    } catch (err) {
      console.error(err);
    }

	// 응답 - 클라이언트를 /list 페이지로 돌려보낸다.
    return res.status(201).redirect("/list");
  }
}
```