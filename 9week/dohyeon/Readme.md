### 예약 파일
> Next.js에서 정의된 예약 파일들은 `page`와 `layout`처럼 라우팅 등의 기능을 가진다. 같은 폴더나 하위 폴더의 `page.js`에 적용된다.

#### `loading.js`

- 페이지 로딩 중에 보여줄 UI를 표시하며, React의 `Suspense`처럼 동작한다.

```jsx
import React from "react";

function Layout({ children }) {
  return <div>{children}</div>;
}

function Error({ fallback, children }) {
  return <div>{children || fallback}</div>;
}

function Loading({ fallback, children }) {
  return <div>{children || fallback}</div>;
}

export default function Page() {
  return (
    <Layout>
      <Error fallback={<div>에러 발생</div>}>
        <Loading fallback={<div>로딩 중...</div>}>
          <div>페이지 로드 완료</div>
        </Loading>
      </Error>
    </Layout>
  );
}
```

#### `error.js`

- 에러 발생 시 커스텀 에러 페이지를 보여준다. 클라이언트 컴포넌트로 만들어야 하며, `error`와 `reset`을 props로 받는다.
- `reset` 함수로 페이지를 다시 로드할 수 있다.

```jsx
import React from "react";

export default function Error({ error, reset }) {
  return (
    <div>
      <h4>Error: {error.message}</h4>
      <button onClick={() => reset()}>새로고침</button>
    </div>
  );
}
```

#### `not-found.js`

- DB에서 데이터를 가져올 때 `notFound()` 함수로 페이지를 보여줄 수 있다. `next/navigation`에서 불러온다.

```javascript
import { notFound } from "next/navigation";

export default function Page({ data }) {
  if (!data) {
    return notFound();
  }

  return <div>데이터를 성공적으로 불러왔습니다.</div>;
}
```

---

### 배포

프로젝트를 배포하기 위해 빌드한 후 클라우드 서비스에 올려 서버를 실행한다.

- 프로젝트 빌드: `npm run build`
- 빌드한 프로젝트 실행: `npm run start`

**외부 서비스 설정**
- MongoDB의 IP 설정
- GitHub OAuth 설정에서 `Homepage URL` 수정

---

### 이미지 업로드 기능

이미지는 서버에 저장되며, AWS S3 같은 클라우드 스토리지를 사용할 수 있다.

#### 이미지 폼

```html
<form action="/api/post/new" method="POST">
  <input name="title" placeholder="글제목" />
  <input name="content" placeholder="글내용" />
  <input type="file" accept="image/*" />
  <button type="submit">전송</button>
</form>
```

#### `createObjectURL` 사용

이미지 미리보기 구현

```javascript
import React, { useState } from "react";

export default function ImgInput() {
  const [imageURL, setImageURL] = useState(null);

  const imageChangeHandler = (e) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    if (file) {
      const image = window.URL.createObjectURL(file);
      setImageURL(image);
    }
  };

  return (
    <>
      <h5>createObjectURL</h5>
      <input type="file" accept="image/*" onChange={imageChangeHandler} />
      {imageURL && <img src={imageURL} alt="미리보기" />}
    </>
  );
}
```

#### Presigned URL을 사용한 이미지 업로드

AWS S3로 바로 이미지를 업로드하는 방식

```javascript
import aws from "aws-sdk";

export default async function handler(req, res) {
  aws.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: "ap-northeast-2",
    signatureVersion: "v4",
  });

  const s3 = new aws.S3();
  const url = await s3.createPresignedPost({
    Bucket: process.env.AWS_BUCKET_NAME,
    Fields: { key: req.query.file },
    Expires: 60,
    Conditions: [["content-length-range", 0, 1048576]],
  });

  res.status(200).json(url);
}
```

이미지 업로드 시 실행되는 클라이언트 코드:

```javascript
import React, { useState } from "react";

export default function ImgUploader() {
  const [imageURL, setImageURL] = useState(null);

  const handleImageUpload = async (e) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    const filename = encodeURIComponent(file.name);

    const result = await fetch(`/api/post/image?file=${filename}`);
    const { url, fields } = await result.json();

    const formData = new FormData();
    Object.entries({ ...fields, file }).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const uploadResult = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (uploadResult.ok) {
      setImageURL(`${url}/${filename}`);
    } else {
      console.log("이미지 업로드 실패");
    }
  };

  return (
    <>
      <h5>Presigned URL 업로드</h5>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {imageURL && <img src={imageURL} alt="업로드된 이미지" />}
    </>
  );
}
```

---

### 다크모드

다크모드를 LocalStorage나 Cookie에 저장해서 관리한다. 쿠키는 유효기간 설정이 가능하며, 페이지 요청 시 모드를 불러올 수 있다.

```javascript
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DarkMode() {
  const router = useRouter();

  useEffect(() => {
    const mode = getCookie("mode") || "light";
    document.cookie = `mode=${mode}; max-age=${60 * 60 * 24 * 400}`;
  }, []);

  const toggleMode = () => {
    const mode = getCookie("mode");
    const newMode = mode === "light" ? "dark" : "light";
    document.cookie = `mode=${newMode}; max-age=${60 * 60 * 24 * 400}`;
    router.refresh();
  };

  return <button onClick={toggleMode}>🌙</button>;
}

function getCookie(name) {
  const cookies = document.cookie.split("; ");
  for (let cookie of cookies) {
    const [key, value] = cookie.split("=");
    if (key === name) return value;
  }
}
```

---

### 미들웨어

요청과 응답 사이에 동작하는 미들웨어 코드를 작성할 수 있다. `middleware.js` 파일을 루트 또는 `src` 폴더에 생성한다.

```javascript
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  if (req.nextUrl.pathname.startsWith("/write")) {
    const session = await getToken({ req });
    if (session) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect("/api/auth/signin");
    }
  }
}
```

---

### Server Actions

Next.js 13.4.0 이상부터 제공되는 API 서버 기능을 `page.js` 내에서 구현할 수 있다.

```javascript
import { revalidatePath } from "next/cache";

export default async function Write() {
  async function handleSubmit(formData) {
    "use server";
    console.log(formData.get("title"));
    revalidatePath("/write");
  }

  return (
    <div>
      <form action={handleSubmit}>
        <input name="title" />
        <button type="submit">등록</button>
      </form>
    </div>
  );
}
```
