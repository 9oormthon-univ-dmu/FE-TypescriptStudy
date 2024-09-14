# [Next.js] 1주차
### Next.js를 많이 쓰는 이유
1. **Server-side Rendering**   
    html 웹 페이지를 서버에서 만들어서 전송

    **Client-side Rendering**의 단점?   
    - 구글 검색 노출이 오래 걸림
    - 첫 페이지 로딩 속도 저하
    
    => **결과적으로 사이트 수익성에 영향을 미침**
2. 쉬운 개발 난이도
3. 풀스텍 프레임워크   
    프론트엔드(react) + 백엔드로 기존 프론트엔드 개발자가 쉽게 입문할 수 있다.
4. 기타 장점
    - 파일과 폴더만으로 페이지 생성
    - 서버, DB 연동, 회원 인증 난이도 낮음
    - 클라이언트 사이드 렌더링도 가능
    - 자바스크립트가 안들어간 빠른 페이지 작성 가능
    - 서버 데이터 캐싱 가능
    - 폰트, 이미지 최적화

**Next.js의 단점**
- 폴더 기반 라우팅으로 예약 파일이 많아 큰 프로젝트에는 적합하지 않다
- 클라이언트 컴포넌트와 서버 컴포넌트를 구분해서 작성해야 함 (js 파일이 많아짐)
- 풍부한 서버 기능 X

### 개발 환경 세팅
**프로젝트 생성**   
```powershell
npx create-next-app@latest
```
기본 강의에서 **typescript**를 사용하여 진행

### 페이지 레이아웃
```typescript
export default function Home() {
  let name = 'yoon';
  let link = 'https://naver.com';
  return (
    <div>
      <h3 className="title">쿠팡프레시</h3>
      <p className="title-sub"><a href={link} target="_blank">by dev {name}</a></p>
    </div>
  );
}
```
### 라우팅
**Next.js 자동 라우팅**
- app 폴더 아래에 list 폴더 생성
- page.js 작성 후 페이지 작성
- 자동으로 url과 페이지 완성

**Navbar**
- 페이지 이동 링크는 \<Link> 사용   
```typescript
import Link from "next/link";
```
- 중복되는 html은 layout.js에 작성   

**layout.js**
- page.js는 layout.js에 담긴다
- 상위 폴더에 layout.js가 있으면 또 담긴다

### map
```typescript
export default function List() {
  let products = ["tomato", "pasta", "coconut"];
  return (
    <div>
      <h3 className="title">상품목록</h3>
      <div>
        {products.map((product, i) => {
          return <div className="food" key={i}>{`${product} $40`}</div>;
        })}
      </div>
    </div>
  );
}
```

### 이미지 넣기
```typescript
<div>
  {products.map((product, i) => {
    return (
      <div className="food" key={i}>
        <div>
            <img src={`food${i}.png`} className="food-img" alt="food" />
          </div>
        <div>{`${product} $40`}</div>
      </div>
    );
  })}
</div>
```

**layout shift 방지**   

Image 컴포넌트 사용   
-> 외부 이미지는 width, height 속성 필요, next.config.js 셋팅 필요
```typescript
import Image from "next/image";
import foodImg from "/public/food0.png"
...
<div>
  {products.map((product, i) => {
    return (
      <div className="food" key={i}>
        <div>
            <Image src={foodImg} className="food-img" alt="food" />
          </div>
        <div>{`${product} $40`}</div>
      </div>
    );
  })}
</div>
```

### Component
코드를 축약하고 재사용하기 위해 사용

**server component**  
일반적으로 작성한 컴포넌트   

**client component**   
'use client'를 추가한 컴포넌트

**server VS client**   
- server는 html에 자바스크립트 기능 작성 불가 (useState 등 불가능)
- server는 로딩이 빠르고, 검색 엔징 노출이 유리하다

-> 큰 페이지는 server, js 기능 필요한 곳에만 client 

### props
부모 컨포넌트의 데이터를 자식 컴포넌트에게 전송하는 것   
```typescript
export default function Cart() {
  return (
    <div>
      <CartItem />
      <CartItem />
      <Btn color="blue" />
    </div>
  );
}

type BtnProps = {
  color: string;
};

function Btn(props: BtnProps) {
  return <button style={{ background: props.color, color: "white" }}>버튼임</button>;
}
```