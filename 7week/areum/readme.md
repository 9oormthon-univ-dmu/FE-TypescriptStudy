## Ajax

`fetch()` 함수 사용하여 서버로 GET, POST, PUT, DELETE 요청 가능

새로고침 없이 요청을 보낼 수 있음

-   예시

```jsx
<button onClick={() => fetch("/URL")}>🗑️</button>
```

-   응답 처리

```jsx
<button
    onClick={() => {
        fetch("/URL").then(() => {
            console.log("완료");
        });
    }}
>
    🗑️
</button>
```

-   POST 요청

```jsx
<button
    onClick={() => {
        fetch("/URL", { method: "POST", body: JSON.stringify({ message: "안녕" }) });
    }}
>
    🗑️
</button>
```

-   서버에서 보낸 결과가 object, array 일 때

```jsx
fetch("/URL")
    .then((r) => r.json())
    .then((result) => {
        console.log(result);
    });
```

-   예외처리

```jsx
fetch("/URL")
    .then((r) => {
        if (r.status == 200) {
            return r.json();
        } else {
            // 서버에서 에러 코드 전송 시 실행할 코드
        }
    })
    .then((result) => {
        // 성공 시 실행할 코드
    })
    .catch((error) => {
        // 인터넷 문제 등으로 실패 시 실행할 코드
        console.log(error);
    });
```

**서버로 array, object 전송하기**

-   JSON.stringify: 객체를 JSON 문자열로 변환.
-   JSON.parse: JSON 문자열을 객체로 변환.

```jsx
const jsonString = JSON.stringify({ name: "kim" }); // '{"name":"kim"}'
const obj = JSON.parse('{"name":"kim"}'); // { name: 'kim' }
```

## GET 요청으로 데이터 전송

-   URL에 데이터를 포함시켜 전송
-   주로 간단한 데이터 전송 시 사용
-   민감한 정보나 긴 데이터 전송 시에는 POST 요청을 사용하는 것이 좋음

### 1. Query String

URL에 물음표를 붙이고 데이터 이름=값 형태로 작성하여 데이터 전송

`/어쩌구?a=1&b=2&c=3` ⇒ 서버로 { a : 1, b : 2, c : 3 } 이렇게 전송됨

### 2. URL parameter 사용

/api/delete/[id].js 이렇게 파일을 생성하고

/api/delete/어쩌구 경로로 GET, POST 요청 등을 하는 경우
[id].js 안의 코드가 실행됨

## Rendering 방식

1. Static Rendering
    - 기본적으로 Static Rendering으로 페이지를 보여줌
    - npm run build 시 생성된 HTML 페이지를 그대로 사용자에게 전송
    - 페이지 전송 속도가 매우 빠름 (유저가 100명 들어와도 페이지를 새로 만들지 않음)
2. Dynamic Rendering
    - `fetch`, `useSearchParams`, `cookies`, `headers`, [dynamic route] 등을 사용할 경우 Dynamic Rendering으로 작동
    - 유저가 페이지에 접근할 때마다 서버에서 HTML 페이지를 다시 생성
    - 서버 부하가 증가할 수 있으므로 주의 필요

### Rendering 방식 강제 변경

-   기본값 `export const dynamic = 'auto'`
-   강제로 Dynamic Rendering을 사용 `export const dynamic = 'force-dynamic'`
-   강제로 Static Rendering을 사용 `export const dynamic = 'force-static'`

## 캐싱

데이터를 잠깐 저장해두고 재사용

비용 절약 + 속도 향상에 도움

Next.js에서는 페이지 캐싱과 GET 요청 캐싱을 쉽게 구현 가능

### GET 요청 결과 캐싱

```jsx
let result = await fetch("/api/어쩌구", { cache: "force-cache" });
```

캐싱된 결과는 서버 API 또는 DB 응답을 기다리지 않고 빠르게 반환

**관련 옵션**

-   `fetch('/URL', { cache: 'force-cache' })`: 캐싱 기능 사용
-   `fetch('/URL', { next: { revalidate: 60 } })`: 60초 동안 캐싱된 결과 사용. 60초 후 새로 요청
-   `fetch('/URL', { cache: 'no-store' })`: 매번 새 데이터 요청. 실시간 데이터가 중요할 때 사용

### 페이지 단위 캐싱

**revalidate 옵션**

-   페이지 단위로 캐싱을 원할 경우, 페이지 파일 위쪽에 revalidate 변수 설정

```jsx
export const revalidate = 60;
```

⇒ 페이지를 60초 동안 캐싱하며, 방문자가 있을 때만 페이지 재생성

### On-demand Revalidation

-   특정 URL에 대해 강제로 캐시를 새로 만들 수 있음
-   예를 들어, /list 페이지에 새 글이 추가되었을 때, 캐시를 새로 생성하여 사용자에게 즉시 반영할 수 있음
