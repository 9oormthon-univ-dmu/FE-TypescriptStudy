## Token, Session, JWT

> 로그인 기능에서 사용자의 로그인 기록을 저장하여 편하게 사용할 수 있도록 한다.

- 사용자가 가입하면 서버는 사용자의 ID, Password 등의 정보를 DB에 저장한다.
- 로그인 하면 DB에서 사용자 정보를 비교해 확인하고 KEY를 발급한다.
- 발급된 KEY는 사용자가 가지고 다른 여러가지 요청을 보낼 때 같이 보낸다.

---

KEY는 Session 방식과 Token을 사용하는 방식으로 나뉜다.

- Session : 서버에서 로그인 정보를 저장하고 사용자에게 session ID를 발급해주는 방식
  - 장점 : 요청마다 로그인 상태를 엄격하게 확인한다.
  - 단점 : DB 조회를 많이 한다.
- Token (JWT) : 사용자에게 로그인 정보를 암호화한 Token을 보내주고, 요청마다 Token을 받아 확인한다.
  - Token을 암호화 할 때 비밀 키를 추가해 위조를 확인할 수 있다.
  - 장점 : 요청을 처리할 때 DB를 조회하지 않는다.
  - 단점 : token을 훔쳐가면 강제로 로그아웃 시킬 수 없다.

---

## OAuth

> OAuth는 다른 사이트에 로그인하여 사용 권한, 회원 정보 등을 빌려온다.
> 회원가입, 로그인을 다른 사이트의 정보로 하는 소셜 로그인을 만들 수 있다.
> Google, Facebook, Kakao 등 다양한 OAuth를 사용할 수 있다.

NextJS에는 NextAuth.js 라이브러리를 사용해 쉽게 구현 가능하다.

- 장점 : 아이디/비번 로그인 구현, 사용자 정보를 DB에 보관 가능
- 단점 : 아이디/비번 옵션을 사용하면 JWT로 제한된다. (보안 문제)

---

## 소셜 로그인

> next-auth를 사용해 Github 계정을 연결한 소셜 로그인을 구현한다.
> next-auth는 기본적으로 JWT 방식을 사용한다.

---

깃허브의 OAuth를 사용하기 위해 OAuth App을 등록해야 한다.

1. github 로그인
2. Settings - Developer Settings - OAuth Apps 로 들어가 App을 추가한다.
3. url은 nextjs에서 사용하는 url을 작성한다 (개발중인 url은 localhost:3000)

---

pages/api/auth/**\[...nextauth].ts** 파일을 만들어서 설정 코드를 작성한다.

```ts title:"[...nextauth].ts"
import NextAuth from "next-auth";
// Github OAuth를 사용
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

\+ Id, Secret 등 민감한 정보는 .env 환경변수를 이용해 숨김 처리한다.

---

로그인, 로그아웃 기능을 만들기 위해서는 next-auth/react의 signIn, signOut 함수를 활용하면 된다.
signIn 함수가 실행되면 깃허브 로그인 페이지로 이동한다.

```tsx title:"login/logout"
"use client";
import { signIn } from "next-auth/react";

export default function LoginBtn() {
  return (
    <button
      onClick={() => {
        signIn();
      }}
    >
      login
    </button>
  );
}
```

---

Login을 하면 Logout 버튼과 사용자 정보를 출력하기 위해서 navbar를 수정한다.

```tsx title:"layout.tsx"
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function Layout({
...
let session = await getServerSession(authOptions);

return
	...         
	// session.user.name 있을 경우 logout / 없을 경우 login
	{session?.user?.name ? (
		<div>
			{session.user.name}
			<LogoutBtn />
		</div>
	) : (
		<LoginBtn />
	)}
```

---

### Session을 사용하는 방법

> session 방식으로 연결하기 위해서 adapter 설정을 해줘야 한다.
> mongodb-adapter를 설치한다. (다른 DB를 사용하는 경우 DB에 맞는 adapter를 사용)

```bash title:"install"
// mongodb-adapter를 사용하기 위해 mongodb 4 버전을 사용한다.
npm install mongodb@4
npm install @next-auth/mongodb-adapter
```

---

adapter를 option으로 추가해준다.

```ts title:"mongoDB adapter"
...
import { connectDB } from "@/utils/database";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";

export const authOptions = {
  providers: [
    GithubProvider({
		clientId: 'Github에서 발급받은ID',
		clientSecret: 'Github에서 발급받은Secret',
    }),
  ],
	secret : 'jwt생성시쓰는암호'
	adapter: MongoDBAdapter(connectDB),
};
...
```

session 방식을 사용하면 mongoDB에는 **accounts, sessions, users** collection이 만들어진다.
한 명의 사용자가 여러가지의 OAuth를 사용해 가입할 수 있어서 collection을 나누어 사용한다.
(email이 같으면 같은 사용자로 판단한다.)

- sessions : 로그인된 사용자 session 정보를 저장한다.
- users : 가입된 사용자 정보를 저장한다.
- accounts : 가입된 사용자의 계정 정보를 저장한다.

\+ mongodb url에서 DB를 선택할 수 있다. (`<DBNAME>`에 원하는 DB입력)
`mongodb+srv://itismilob:<db_password>@cluster0.cnlia.mongodb.net/<DBNAME>?retryWrites=true&w=majority&appName=Cluster0`

---

### 본인 글 수정/삭제

> 글을 작성할 때 글쓴이 정보 저장한다.
> 글을 수정/삭제 할 때 글쓴이 본인이 맞는지 확인한다.

사용자 정보를 직접 보내지 않고 getServerSession을 사용해서 받아온다.

```tsx title:"write 페이지 사용자 정보 저장"
...
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    // 유저 로그인 확인
    let session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(403).send("User has to log in");
    }
    // 유저 정보 body에 추가
    req.body.author = session.user?.email;
    console.log(req.body);

    // 유저 입력 데이터 확인
    const { title, content } = req.body;
    if (title === "" || content === "") {
      return res.status(400).send("title or content is not filled");
    }

    try {
      const db = (await connectDB).db("forum");
      await db.collection("post").insertOne(req.body);
    } catch (err) {
      console.log("# DB error\n" + err);
    }

    res.status(201).redirect("/list");
  }
}
```

---

## ID/Password 를 사용하는 방법

> 회원가입 페이지를 만들어 사용자의 ID/Password를 받아 DB에 저장한다.
> 사용자 계정 정보를 암호화해 저장하는 api를 만든다. (bcrypt 사용)

bcrypt를 설치한다.

```bash title:"bcrypt install"
npm install bcrypt
npm install -D @types/bcrypt
```

---

nextauth 설정 파일에 작성한다.

```ts title:"id/password"
// github oauth
import NextAuth, { User, SessionStrategy, Session } from "next-auth";
import GithubProvider from "next-auth/providers/github";

// session login
import { connectDB } from "@/utils/database";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";

// id/pwd login
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { JWT } from "next-auth/jwt";

// jwt.user, session.user의 타입을 맞춰주기 위해서 사용
type JWTUser = {
	name?: string | null | undefined;
	email?: string | null | undefined;
};

export const authOptions = {
	providers: [
		// github oauth
		...

		// id/pwd login
		CredentialsProvider({
			// 1. 로그인페이지 폼 자동생성해주는 코드
			name: "credentials",
			credentials: {
				email: { label: "email", type: "text" },
				password: { label: "password", type: "password" },
			},

			// 2. 로그인요청시 실행되는코드
			// DB에서 email, password 비교
			async authorize(credentials) {
				let db = (await connectDB).db("forum");

				// email 비교
				let user = await db
					.collection("user_cred")
					.findOne({ email: credentials?.email });
				if (!user) {
					console.log("email notfound");
					return null;
				}

				// password 비교
				if (credentials?.password) {
					const pwcheck = await bcrypt.compare(
						credentials.password,
						user.password
					);
					if (!pwcheck) {
						console.log("wrong password");
						return null;
					}
				}

				// User 타입으로 변환해서 return
				return {
					name: user.name,
					email: user.email,
				} as User;
			},
		}),
	],

	// 3. jwt 설정 + jwt 만료일설정
	// string "jwt"의 타입을 SessionStrategy로 변환
	session: {
		strategy: "jwt" as SessionStrategy,
		maxAge: 30 * 24 * 60 * 60, //30일
	},

	callbacks: {
		// 4. jwt 만들 때 실행되는 코드
		// DB의 유저 정보를 token에 저장
		jwt: async ({ token, user }: { token: JWT; user: User }) => {
			if (user) {
				token.user = {
					name: user.name,
					email: user.email,
				} as JWTUser;
			}
			return token;
		},

		//5. 유저 세션이 조회될 때 마다 실행되는 코드
		session: async ({ session, token }: { session: Session; token: JWT }) => {
			session.user = token.user as JWTUser;
			return session;
		},
	},
	...
};

export default NextAuth(authOptions);
```

---

## refresh token

> 유효기간을 짧게 하고 유효기간이 지난 Token을 자동으로 재발급 해주는 방법이 있다.
> 유효기간이 지나면 재발급용 Token을 서버로 보내 새로운 refresh token을 발급받는다.

- refresh token을 DB에도 저장해서 도난 등을 감지할 수 있다.
- Session을 쓰는 방식과 유사하지만 DB조회 횟수가 적다.

---

## 댓글 저장

> 글에 댓글을 작성하는 기능을 만든다.
> 댓글을 저장하는 DB를 따로 만들고 댓글 데이터에 글 ID를 추가해서 서로 연결해준다.

댓글 저장

```ts title:"댓글 저장"
const saveData = {
  content: comment,
  parentID: new ObjectId(parentID),
  author: session.user?.email,
};

try {
  const db = (await connectDB).db("forum");
  await db.collection("comment").insertOne(saveData);
} catch (err) {
  console.log("# DB error\n" + err);
}
```

---

댓글 조회

```ts title:"댓글 조회"
const db = (await connectDB).db("forum");
let result = await db
  .collection("comment")
  .find({ parentID: new ObjectId(id as string) })
  .toArray();
```

---
