# [Next.js] 4주차 - 게시판 프로젝트

### loading, error, not-found

**로딩, 에러, 404 페이지**

- 로딩: loading.js
- 에러: error.js
- 404: not-found.js

-> 위 페이지들은 모두 상위 페이지에 위치시켜도 적용된다.

### 이미지 업로드

**Presigned URL**  
서버를 거치지 않고 직접 S3에 업로드가 가능한 방식

1. \<input>에서 이미지 고르는 순간 서버에게 GET요청
   (이미지 이름도 함께 전송)

2. 서버에서 검사 후 Presigned URL을 만들어 유저 브라우저로 보냄

3. 유저는 브라우저에서 Presigned URL을 이용해서 S3로 POST요청해서 바로 이미지를 보냄

4. 업로드 성공시 업로드된 이미지의 URL을 \<img src=" ">에 작성

## DarkMode

**cookie**  
브라우저에 존재하는 Cookie 저장소를 사용하여 데이터를 저장

```javascript
document.cookie = "name=vlaue; max-age=3600";
```

value값을 가진 name을 24시간동안 저장

**DarkMode**

```javascript
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DarkMode() {
  let router = useRouter();
  let [emoji, setEmoji] = useState("🌙");

  useEffect(() => {
    let cookieValue = ("; " + document.cookie)
      .split(`; mode=`)
      .pop()
      .split(";")[0];
    if (cookieValue === "") {
      document.cookie =
        "mode=light; max-age=" + 3600 * 24 * 400 + "; path=/; SameSite=Lax";
    } else {
      setEmoji(cookieValue === "light" ? "☀️" : "🌙");
    }
  }, []);

  const toggleDarkMode = () => {
    let cookieValue = ("; " + document.cookie)
      .split(`; mode=`)
      .pop()
      .split(";")[0];
    if (cookieValue === "light") {
      document.cookie =
        "mode=dark; max-age=" + 3600 * 24 * 400 + "; path=/; SameSite=Lax";
      setEmoji("🌙");
    } else {
      document.cookie =
        "mode=light; max-age=" + 3600 * 24 * 400 + "; path=/; SameSite=Lax";
      setEmoji("☀️");
    }
    router.refresh();
  };

  return <span onClick={toggleDarkMode}>{emoji}</span>;
}
```

### middleware

**middleware.js**  
서버 API 실행 or 페이지 로드 전에 코드가 실행된다

- /list 페이지 접속 기록 남기기

```javascript
if (request.nextUrl.pathname == "/list") {
  console.log(new Date().toLocaleString());
  console.log(request.headers.get("sec-ch-ua-platform"));
  return NextResponse.next();
}
```

- 비로그인 유저 /write 페이지 접속 막기

```javascript
if (request.nextUrl.pathname.startsWith("/write")) {
  const session = await getToken({ req: request });
  console.log("세션", session);
  if (session == null) {
    return NextResponse.redirect(new URL("/api/auth/signin", request.url));
  }
}
```

### Server Actions

서버 기능을 page.js에서 모두 해결하기

```javascript
async function handleSubmit(formData) {
  "use server";
  console.log(formData);
  console.log(formData.get("title"));
}
```
서버 기능 작성법
