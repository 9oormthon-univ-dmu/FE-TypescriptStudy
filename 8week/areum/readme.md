## Next.js 회원기능

### 회원기능 동작방식

1. 회원가입 시 아이디/비번 DB에 저장
2. 로그인 시 유저가 아이디/비번을 서버에 전송
3. 서버는 DB에서 일치 여부 확인 후, 일치할 경우 **입장권** 발급
    - 로그인이 필요한 서버기능이 있을 때
    - 유저가 서버에 GET/POST로 데이터 요청 시 입장권도 함께 제시
    - 서버는 입장권 확인 후 데이터나 페이지 보내줌

### 1. Session

-   로그인 성공 시, DB나 메모리에 session id와 다른 정보들울 기록해둠
-   유저에게는 id만 보내줌
-   id로 DB에 조회하여 데이터를 보내줌

장점 - 유저의 요청마다 로그인 상태 체크 가능

단점 - DB 부담이 큼 (redis 같은 DB 사용으로 입출력을 빠르게 함)

<br/>

### 2. Token (JWT; JSON Web Token)

-   로그인 성공 시, DB에 저장하지 않고 정보를 암호화해서 Access Token 발급
-   GET/POST 요청 시 Access Token에 있는 내용 확인 후 통과

장점 - DB 조회할 필요가 없어서 유저가 많거나 마이크로서비스 운영 시 편함

단점 - 토큰을 탈취 당했을 때 막을 방법이 없음

<br/>

### 소셜로그인

### OAuth (Open Authorization)

다른 사이트 회원정보를 가져와 회원가입 시 사용할 수 있게함

<br/>

**Next-Auth (Auth.js) 라이브러리**

JWT 또는 OAuth를 사용하여 회원기능을 쉽게 만들 수 있게 도와주는 라이브러리

DB adapter 기능을 이용하면 DB에 session을 저장해두고 유저 관리 가능

아이디/비번으로 로그인하는 경우 session 방식 사용 불가능

⇒ 개발자가 직접 아이디/비번을 관리하면 복잡하고 보안이슈가 생길 수 있음

<br/>

**NextAuth 라이브러리 셋팅**

라이브러리 설치 `npm install next-auth`

`pages/api/auth/[...nextauth].js` 에 다음 코드 작성

```jsx
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions = {
    providers: [
        GithubProvider({
            clientId: "Github에서 발급받은ID",
            clientSecret: "Github에서 발급받은Secret",
        }),
    ],
    secret: "jwt생성시쓰는암호",
};
export default NextAuth(authOptions);
```

<br/>

**OAuth + session**

MongoDB adapter 설정

`npm install @next-auth/mongodb-adapter`

```jsx
// [...nextauth].js

import { connectDB } from "@/util/database";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions = {
  (...생략...)
  adapter : MongoDBAdapter(connectDB),
};

export default NextAuth(authOptions);
```

설정 이후 추가된 MongoDB 컬렉션

-   sessions : 현재 로그인 된 유저 세션 정보
-   users : 가입된 유저들을 이메일로 구분하여 보관
-   accounts : 유저 계정 정보 보관

<br/>

### JWT 사용

Next-auth 설정 파일에 `Credentials provider` 추가

⇒ 강제로 JWT 방식만 사용

<br/>

### Refresh Token

Access Token이 긴 만료 기간을 가지게 되면 탈취 당했을 때 대응할 수 없음

⇒ Access Token의 만료 기간을 짧게 유지하고, 상대적으로 긴 만료 시간을 가지는 Refresh Token을 통해 토큰을 재발급 받아 사용자가 로그인을 유지할 수 있게 함
