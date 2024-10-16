// github oauth
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

// session login
import { connectDB } from "@/utils/database";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";

// id/pwd login
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { JWT } from "next-auth/jwt";

import { User, Session, SessionStrategy } from "next-auth";

type Role = "admin";
type JWTUser = {
  name?: string;
  email?: string;
  role?: Role;
};

type RoleUser = User & {
  role?: Role;
};

type RoleSession = Session & {
  user?: {
    role?: Role;
  };
};

export const authOptions = {
  providers: [
    // github oauth
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),

    // id/pwd login
    CredentialsProvider({
      //1. 로그인페이지 폼 자동생성해주는 코드
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
        role: { label: "", type: "hidden" },
      },

      //2. 로그인요청시 실행되는코드
      //직접 DB에서 아이디,비번 비교하고
      //아이디,비번 맞으면 return 결과, 틀리면 return null 해야함

      async authorize(
        credentials: Record<"email" | "password" | "role", string> | undefined
      ): Promise<RoleUser | null> {
        let db = (await connectDB).db("forum");

        // email 비교
        let user = await db
          .collection("user_cred")
          .findOne({ email: credentials?.email });
        if (!user) {
          console.log("해당 이메일은 없음");
          return null;
        }

        // password 비교
        if (credentials?.password) {
          const pwcheck = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (!pwcheck) {
            console.log("비번틀림");
            return null;
          }
        }

        if (user.role === "admin") {
          return {
            name: user.name,
            email: user.email,
            role: user.role,
          } as RoleUser;
        }

        // User 타입으로 변환해서 return
        return {
          name: user.name,
          email: user.email,
        } as RoleUser;
      },
    }),
  ],

  //3. jwt 써놔야 잘됩니다 + jwt 만료일설정
  // string "jwt"의 타입을 SessionStrategy로 변환
  session: {
    strategy: "jwt" as SessionStrategy,
    maxAge: 30 * 24 * 60 * 60, //30일
  },

  callbacks: {
    //4. jwt 만들 때 실행되는 코드
    //user변수는 DB의 유저정보담겨있고 token.user에 뭐 저장하면 jwt에 들어갑니다.
    jwt: async ({ token, user }: { token: JWT; user: RoleUser }) => {
      if (user) {
        token.user = {
          name: user.name,
          email: user.email,
          role: user.role,
        } as JWTUser;
      }
      return token;
    },
    //5. 유저 세션이 조회될 때 마다 실행되는 코드
    session: async ({
      session,
      token,
    }: {
      session: RoleSession;
      token: JWT;
    }) => {
      session.user = token.user as JWTUser;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  adapter: MongoDBAdapter(connectDB),
};

export default NextAuth(authOptions);
