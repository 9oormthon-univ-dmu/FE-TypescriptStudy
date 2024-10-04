## Ajax 요청으로 데이터 불러오기

> React의 Hook과 Ajax 요청을 통해 서버에서 데이터를 불러올 수 있다.
> client components에서 Ajax 요청을 사용하면 검색 노출이 어렵다는 단점이 있다. (SEO 최적화 X)

```tsx
// client components에서만 사용이 가능하다.
"use client";

export default function Like() {
  const [likes, setLikes] = useState<number>(0);

  // 서버에서 데이터를 불러오는 함수
  const loadData = async () => {
    const result = await fetch("/api/likes", {
      method: "GET", //header, body ...
    });
    setLikes(result);
  };

  // Like 컴포넌트가 랜더링이 완료되면 실행된다.
  useEffect(() => {
    loadData();
  }, []);

  return <div>{likes}</div>;
}
```

---

### Ajax 기능

> 두 번째 인자로 요청에 대한 Object를 담아 상세한 설정이 가능하다.

- method : POST / GET / PUT / DELETE 요청 방식 설정
- header : 헤더를 설정한다.
- body : 데이터 추가 - JSON.stringify(dataObject) 함수를 통해 전송해야 한다.

> 요청이 끝나면 요청 완료 대한 처리와 오류처리를 할 수 있다.

- `.then`을 붙여서 요청이 정상적으로 끝났을 경우 처리를 한다.
- `.catch`를 붙여서 요청에 오류가 났을 경우 처리를 한다.

```tsx
fetch("/API_URL", {
  method: "POST",
  header: { "Content-Type": "application/json" },
  body: JSON.stringify({ likes: 10, views: 20 }),
})
  .then((res) => {
    if (res.status == 200) {
      // 서버가 정상적으로 요청 처리
    } else {
      // 서버가 에러 코드 전송
    }
  })
  .catch((err) => {
    // 요청에 실패함 (인터넷 문제 등)
  });
```

---

## 서버 컴포넌트에서 데이터 불러오기

> 서버 컴포넌트에서 데이터를 불러와 자식 클라이언트 컴포넌트에 데이터를 넘겨주는 방식이 있다.
> 검색 노출도 쉽게 가능하고 자식 컴포넌트에서 JS를 사용할 수도 있다.

```tsx
// 부모 서버 컴포넌트
export default function Post() {
  // db에서 데이터를 불러온다.
  const db = (await connectDB).db("forum");
  let result = await db
    .collection("post")
    .findOne({ _id: new ObjectId(postId) });

  return (
    <div>
      ...
      <Like postLikes={result.likes} />
    </div>
  );
}
```

```tsx
// 자식 클라이언트 컴포넌트
'use client'

export default function Like({postLikes}:{postLikes:number}){
	return <div>{postLikes}</div>;
```

---

## 서버로 데이터 전송

> body를 사용하는 방법 이외에도 query-string과 path-parameter를 이용하는 방법이 있다.
> 두 방법 다 데이터를 불러오는 방법은 req.query를 사용한다.

---

### query-string

> query-string으로 보내진 요청은 서버에서 res.query로 받아와 처리한다.

```ts
// 클라이언트 요청
fetch("/api/...?name=something");

// 서버 응답
const { name } = req.query;
```

---

### path-parameter

> path-param으로 보내진 요청은 서버에서 응답 받을 폴더/파일의 이름을 대괄호로 감싸서 사용한다.
> dynamic routing 방법하고 비슷하다.

`pages/api/.../[name].ts` : path-param 을 name이라는 이름으로 받기 위해 파일 이름을 설정한다.

```ts
// 클라이언트 요청
fetch("/api/.../something");

// 서버 응답
const { name } = req.query;
```

---

## Static / Dynamic rendering

> 페이지를 배포하기 위해서는 빌드를 해서 Next 문법을 Javascript로 바꿔줘야 한다.
> 만들어진 페이지마다 렌더링 방법이 다르다

- Static randering ( O ) : 기본 설정, 빌드시 만들어진 html 페이지 그대로 보낸다.
- Dynamic rendering ( $\lambda$ ) : 유저가 페이지 접속시 마다 html을 새로 만들어서 보낸다.

* Dynamic rendering은 아래의 함수를 사용하면 자동으로 설정된다.
  - fetch('/', {cache: 'no-store' })
  - useSearchParams()
  - cookies()
  - haeders()
  - dynamic routing

---

### 강제로 렌더링 방법을 설정하기

> 미리 정해진 예약어를 사용해서 렌더링 방법을 설정한다.

- `export const dynamic = 'force-dynamic'` : Dynamic rendering 으로 설정
- `export const dynamic = 'force-static'` : Static rendering 으로 설정

---

### 캐싱

> 로딩 속도를 높이기 위해 페이지, 요청 결과 등을 저장해 두고 재사용 할 수 있다.

- `fetch('/', {cache: 'force-cache});` : API 요청 결과 캐싱 (옵션이 없어도 자동으로 캐싱 된다.)
- `fetch('/', {cache: 'no-store'});` : 캐싱을 하지 않는다. (Dynamic rending)
- `fetch('/', {next: {revalidate: 60}});` : 60초마다 캐시 데이터를 갱신한다.

> 페이지 전체에 revalidate 예약어를 사용해 매 시간마다 갱신시킬 수 있다.

`export const revalidate = 60` : 60초마다 페이지단위로 데이터를 갱신한다.

---
