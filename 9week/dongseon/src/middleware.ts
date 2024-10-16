import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  // console.log(req.nextUrl);
  // console.log(req.cookies);
  // console.log(req.headers.get("user-agent"));

  // NextResponse.next(); // 통과
  // NextResponse.redirect("URL"); // URL로 이동
  // NextResponse.rewrite("URL"); // 다른 페이지로 이동 (주소창은 그대로)

  // if (req.nextUrl.pathname.startsWith("/list")) {
  //   console.log(new Date());
  //   console.log(req.headers.get("sec-ch-ua-platform")); // 유저의 os 정보 출력
  //   return NextResponse.next(); // 통과
  // }

  if (req.nextUrl.pathname.startsWith("/write")) {
    const session = await getToken({ req: req });
    // 유저가 있으면
    if (session) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(req.nextUrl.origin + "/api/auth/signin");
    }
  }
}
