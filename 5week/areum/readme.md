## Next.js로 웹서비스 만들기 - Part 1 : 애플후레시

### Server-Side Rendering (SSR)

서버에서 HTML을 생성하여 클라이언트로 전송하는 방식

- **장점**
    - 가벼움
    - 구글 검색 노출이 쉬움 (SEO 최적화)
    - 페이지 로딩 속도가 빠름
    - 일부 필요한 곳에만 Client-Side Rendering 가능
- **단점**
    - 복잡한 상태 관리나 상호작용이 필요한 경우 유연성이 부족

### Client-Side Rendering (CSR)

브라우저에서 HTML을 실시간으로 생성하는 방식

- **장점**
    - 페이지 전환이 부드러움
    - 시각적으로 예쁜 사이트 구현 가능
- **단점**
    - 구글 검색 노출이 어려움 (SEO에 불리함)
    - 초기 페이지 로딩 속도가 느림
    - 수익성에 악영향을 줄 수 있음

### Next.js의 단점

- 폴더 기반 라우팅으로 인해 큰 프로젝트에서 구조가 복잡해질 수 있음
- 리액트의 미완성된 문법을 도입하여 개발 과정이 번거로울 수 있음
- WebSocket, WebRTC와 같은 기능을 사용할 때 별도의 서버 구축이 필요함
- 프레임워크 자체의 버그가 간혹 발생함

---

### 개발환경 셋팅

### Next.js 프로젝트 생성

```bash
npx create-next-app@latest

```

- **page.js**: 메인 페이지 파일 (React 문법 사용)
- **layout.js**: `page.js`를 감싸는 파일로, `<head>` 부분이나 상단 메뉴 등을 정의
- **globals.css**: 모든 페이지에 적용될 스타일 정의
- **[페이지명].module.css**: 특정 페이지에만 적용될 스타일 정의
- **api 폴더**: 서버 기능을 위한 API 엔드포인트 정의
- **public 폴더**: 이미지나 폰트 파일 저장

---

### Routing

### 일반적인 웹 서버

- 서버에서 라우팅 코드 작성 필요

### Next.js 자동 라우팅

1. `app` 폴더 안에 폴더를 생성
2. 폴더 안에 `page.js` 파일 생성 후 HTML 작성

⇒ 자동으로 URL과 페이지가 생성됨

### 레이아웃 작동 방식

반복적으로 보여줘야 할 HTML UI는 최상단 `layout.js` 파일에 작성

- `/cart`로 접속 시 장바구니 페이지

```jsx
// cart/page.js
import Link from "next/link";

export default function Cart() {
    return (
        <div>
            <h1>장바구니입니다</h1>
        </div>
    );
}

```

- `/cart/payment`로 접속 시 결제 페이지

```jsx
// cart/payment/page.js
export default function Payment() {
    return (
        <div>
            <h1>결제페이지입니다</h1>
        </div>
    );
}

```

- `cart` 페이지와 `payment` 페이지 모두 공통으로 노출될 내용은 `layout.js`에 작성

```jsx
// layout.js
import "./globals.css";

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <div>
                    <p>현대카드 무이자이벤트중</p>
                </div>
                {children}
            </body>
        </html>
    );
}

```

---

### 컴포넌트

### Server Component

- 페이지 로드시 자바스크립트가 별로 필요하지 않아 빠름
- HTML 안에 자바스크립트를 넣을 수 없으며, `useState`, `useEffect` 같은 훅 사용 불가

### Client Component

- HTML 안에 자바스크립트를 포함하여 기능 개발 가능
- 불필요한 자바스크립트가 페이지 용량을 키워 로딩 속도를 느리게 할 수 있음

⇒ **권장**: 큰 페이지는 Server Component로 만들고, 자바스크립트 기능이 필요한 부분만 Client Component로 개발
