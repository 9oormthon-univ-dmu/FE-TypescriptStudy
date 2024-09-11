Next.js 기본 구성 (TS 사용x) <br>

page.js : 메인페이지 <br>
layout.js : 메인페이지 감싸는 용도의 페이지 <br>
중복되는 html은 layout.js 파일에 넣어서 사용하기.

Next.js는 실은 page.js를 보여줄 때
옆에 layout.js 파일이 있으면 layout.js 내용 안에 page.js 내용을 담아서 보여줍니다. 예시)<br>
![image](https://github.com/user-attachments/assets/567bc9ee-54a0-4fc1-a882-8127e17417b9)
<br><br>
globals.css : 전체 페이지에 적용되는 css 파일
<br> public 폴더 : 이미지나 static 파일 보관용 <br>
api 폴더 : 서버기능 만드는 곳 <br>
<br>
 <br>
next.config.js : nextjs 설정 파일 <br>
node_modules 폴더 : 설치한 라이브러리 보관용 폴더 <br>
package.json : 설치한 라이브러리 버전 기록용 파일<br>
client/server component, import 문법
