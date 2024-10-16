## 예약 파일

page, layout와 같이 Nextjs에서 정의해놓은 라우팅 등의 기능을 가진 파일이다.
예약 파일들은 같은 폴더나 하위 폴더의 page.tsx에 적용된다.

### loading.tsx

page를 로딩하는 중에 보여주는 UI
내부적으로 react의 Suspense 컴포넌트를 사용하는 것처럼 page를 감싸서 로딩을 보여준다.

```tsx
<Layout>
  <Error fallback={<div>error.tsx</div>}>
    <Loading fallback={<div>loading.tsx</div>}>
      <div>page.tsx</div>
    </Loading>
  </Error>
</Layout>
```

### error.tsx

에러 페이지를 만들어서 에러가 발생하면 보여준다.
클라이언트 컴포넌트로 만들어 사용해야 한다.
props로 error와 reset함수를 받아와 사용할 수 있다.
error로 에러 메시지를 출력하고 reset함수로 페이지를 다시 로드한다.

```tsx
"use client";
export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => {};
}) {
  return (
    <div>
      <h4>Error!!</h4>
      <button
        onClick={() => {
          reset();
        }}
      >
        새로고침
      </button>
    </div>
  );
}
```

layout.tsx의 에러 체크는 하지 못하기 때문에 app 폴더에 global-error.tsx 파일을 만들어 사용한다.

---

### not-found.tsx

nextjs에는 기본적으로 notfound 페이지가 존재한다.
만약 DB에서 데이터를 불러올 때 notfound를 띄워야 한다면 not-found.tsx 파일을 사용한다.
next/navigation의 notFound함수로 not-found.tsx 파일을 불러온다.

```tsx
// 데이터를 불러오는 페이지
import {notFound} from "next/navigation";

...
if(!data){
	return notFound();
}
```

---

## 배포

배포하기 위해서 프로젝트를 빌드하고 클라우드 서비스 등에 올려서 서버를 실행시킨다.

프로젝트를 빌드 : `npm run build`
빌드한 프로젝트 실행 : `npm run start`

외부 서비스 설정

- 몽고디비에서 접속 가능 IP를 설정해줘야 한다.
- Github의 OAuth 앱 설정에서 Hompage URL을 변경해줘야 한다.

---

## 이미지 업로드 기능

이미지는 서버 컴퓨터의 하드디스크에 저장한다.
클라우드 서버에 배포해서 하드디스크 이용이 어렵다면 AWS-S3와 같은 클라우드 스토리지 서비스를 이용할 수 있다.

### CORS

> Cross-Origin Resource Sharing
> 브라우저가 서로 다른 출처(도메인, 포트)로부터 자원을 로딩하는 것을 허용하도록 허가해주는 HTTP 헤더 기반의 메커니즘.

프론트앤드의 URL 과 다른 백앤드 서버, 클라우드 스토리지 서비스 등을 이용할 때 CORS로 IP, 도메인 등을 허용해 주어야 리소스를 불러올 수 있다.

### 이미지 폼

```tsx
<form action="/api/post/new" method="POST">
  <input name="title" placeholder="글제목" />
  <input name="content" placeholder="글내용" />
  <input type="file" accept="image/*" />
  <button type="submit">전송</button>
</form>
```

선택한 이미지를 바로 보여주는 2가지 방법

1. createObjectURL
2. 이미지를 바로 업로드해서 보여주기

#### 1. createObjectURL

window.URL.createObjectURL 함수에 file을 넣어 이미지URL을 생성한다.

```tsx
"use client";
import { useState } from "react";

export default function ImgInput() {
  const [imageURL, setImageURL] = useState<string | null>();
  const imageChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    if (file) {
      let image = window.URL.createObjectURL(file);
      setImageURL(image);
    }
  };

  return (
    <>
      <h5>createObjectURL</h5>
      <input type="file" accept="image/*" onChange={imageChangeHandler} />
      {imageURL && <img src={imageURL} />}
    </>
  );
}
```

#### 2. 이미지 바로 업로드

이미지를 바로 업로드 하는 방식은 Presigned URL을 사용해서 서버를 거치지 않고 유저가 바로 S3 클라우드로 접근해 이미지를 업로드 한다.

1. 유저가 서버로 이미지를 업로드 하겠다는 GET 요청을 보낸다.
2. 서버는 1분간 유효한 Presigned URL을 발급해준다.
3. 유저가 S3 클라우드로 바로 이미지를 업로드한다.
4. 업로드한 이미지를 보여준다.

aws를 사용하기 위해 aws-sdk를 설치한다.

```bash
npm install aws-sdk
```

Presigned URL을 발급하기 위해 API 서버 코드를 작성한다.

```ts
import aws from "aws-sdk";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // AWS 설정
  aws.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY, // AWS AccessKey
    secretAccessKey: process.env.AWS_SECRET_KEY, // AWS SecretKey
    region: "ap-northeast-2", // 원하는 지역
    signatureVersion: "v4",
  });

  const s3 = new aws.S3();

  // Presigned URL 발급
  const url = await s3.createPresignedPost({
    Bucket: process.env.AWS_BUCKET_NAME, // AWS 버킷 이름
    Fields: { key: req.query.file }, // 선택한 파일명
    Expires: 60, // 유효기간 (초단위)
    Conditions: [
      ["content-length-range", 0, 1048576], //파일용량 1MB 까지 제한
    ],
  });

  res.status(200).json(url);
}
```

이미지를 선택하면 이미지를 업로드 하는 코드.

```tsx
<>
  <h5>Presigned URL</h5>
  <input
    type="file"
    accept="image/*"
    onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) return;

      let file = e.target.files[0];
      let filename = encodeURIComponent(file.name);

      let result = await fetch(`/api/post/image?file=${filename}`);
      let jsonResult = await result.json();

      // S3 업로드 폼 생성
      const formData = new FormData();
      Object.entries({ ...jsonResult.fields, file }).forEach(([key, value]) => {
        formData.append(key, value as string);
      });

      // S3 업로드 결과
      let uploadResult = await fetch(jsonResult.url, {
        method: "POST",
        body: formData,
      });
      if (uploadResult.ok) {
        // imageURL 변경
        setImageURL(uploadResult.url + "/" + filename);
      } else {
        console.log("이미지 불러오기 실패");
      }
    }}
  />
  {imageURL && <img src={imageURL} />}
</>
```

---

## 다크모드

다크 모드 여부를 브라우저의 LocalStorage, Cookie 에 저장해서 사용한다.

- Local Storage : 5mb까지 반영구적으로 데이터를 저장한다.
- Session Storage : 브라우저를 끄면 데이터가 사라진다.
- Cookies : 50개 4kb까지 저장 가능, 유효 기간 설정이 가능하다.
  GET, POST 요청시 자동으로 서버로 보내진다.

클라이언트 컴포넌트에서 사용해야 하며, 서버에서 실행될 수 있으니 useEffect 훅으로 감싸서 사용한다.

```ts
useEffect(() => {
  if (typeof window != "undefined") {
    localStorage.setItem("name", "value");
  }
}, []);
```

컴포넌트 렌더링이 진행되고 localStroage를 가져오기 때문에 라이트 모드가 먼저 렌더링되 페이지가 깜빡거리게 보일 수 있다. Cookies를 사용해서 페이지 요청시 다크모드 데이터를 가져와 바로 렌더링 해준다.

cookies로 모드를 불러와 클래스를 변경해 css를 적용한다.

```ts
import {cookeis} from "next/headers";
...
let mode = cookies().get("mode").value;
...
<body className={mode == "dark" ? "dark-mode" : ""}>
...
</body>
```

다크 모드를 변경하는 버튼
쿠키를 변경해 모드를 전환한다. 쿠키는 덮어쓰기로 변경한다.

```tsx
"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DarkMode() {
  let router = useRouter();

  const getCookieValue = (cookieName: string) => {
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {
      const [name, value] = cookie.split("=");
      if (name == cookieName) return value;
    }
  };

  // 쿠키가 없다면 라이트 모드로 추가
  useEffect(() => {
    let mode = getCookieValue("mode");

    if (!mode) {
      // max-age로 유효기간 설정 (초단위)
      document.cookie = `mode=light; max-age=${60 * 60 * 24 * 400}`;
    }
  }, []);

  // 쿠키 전환을 통한 모드 변경
  const onClickHandler = () => {
    let mode = getCookieValue("mode");

    if (mode == "light") {
      document.cookie = `mode=dark; max-age=${60 * 60 * 24 * 400}`;
      router.refresh();
    } else {
      document.cookie = `mode=light; max-age=${60 * 60 * 24 * 400}`;
      router.refresh();
    }
  };

  return (
    <>
      <button onClick={onClickHandler}>🌙</button>
    </>
  );
}
```

---

## 미들웨어

요청과 응답 사이에 코드를 집어넣어 실행시킬 수 있다.
app폴더가 있는 루트, src 폴더에 middleware.ts 파일을 생성한다.
페이지별로 분기처리해 코드를 실행시킬 수 있다.

```ts
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  // write 페이지에 들어갈 때 유저 확인
  if (req.nextUrl.pathname.startsWith("/write")) {
    const session = await getToken({ req: req });
    if (session) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(req.nextUrl.origin + "/api/auth/signin");
    }
  }
}
```

## Server actions

코딩의 편의성을 위해 API 서버의 기능을 page.tsx에서 모두 만들어 사용할 수 있다.
NextJS 13.4.0 버전 이상에서 사용할 수 있는 기능이다.
~~php가 되어간다고 까였다.~~

---

next.config.js 파일에 serverActions 사용을 true로 해준다.

```js
const nextConfig = {
  experimental: {
    serverActions: true,
  },
};
```

---

"use server" 를 붙인 handler 함수를 API 서버처럼 실행시킨다.
handler 함수의 인자로 formData를 받아 사용할 수 있다.
handler 함수는 async 붙여줘야 한다.

revalidatePath / revalidateTag 등을 사용해 새로고침 할 수 있다.

```ts
import { revalidatePath } from "next/cache";

export default async function Write2() {
  async function handleSubmit(formData: FormData) {
    "use server";
    console.log(formData.get("title"));
    // 페이지 새로고침
    revalidatePath("/write2");
  }

  return (
    <div>
      {/* 서버 함수 등록 */}
      <form action={handleSubmit}>
        <input name="title"></input>
        <button type="submit">등록</button>
      </form>
    </div>
  );
}
```

클라이언트 컴포넌트로 사용하려면 handler 함수를 다른 파일로 빼야 하는데 이러면 API 서버를 만드는 것과 다름이 없어진다.
