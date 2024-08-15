# [Chapter 1] Introdution
### TypeScript
자바스크립트를 기반으로 만들어진 언어로, 자바스크립트가 가지고 있는 여러 문제를 해결하고 보완하기 위해 만들어진 언어이다.
### TypeScript의 장점
- 더 나은 개발자 경험 제공
- 개발자의 실수를 보완
- 더욱 생산적으로 개발 가능
### TypeScript는 어떤 개발자가 사용하면 좋을까?
1. 더 나은 개발 경험과 더 생산적인 개발을 원하는 JS 개발자
2. 타입에 익숙한 개발자
3. 타입 안정성이 없는 JS를 선호하지 않는 개발자
### TypeScript는 왜 만들어졌을까?
**타입안정성**으로 인해 **개발자 경험**을 늘릴 수 있고, 코드 내의 **버그**를 줄일 수 있으며, **런타임 에러**를 줄이고 **생산성**을 늘릴 수 있기 때문!
### JavaScript의 단점
- 개발자가 작성한 잘못된 코드도 허용하여 실행시킨다.   
(에러를 띄우지 않는다)
- 코드를 실행해야 해당 코드의 에러를 띄운다.
***
# [Chapter 2] Overview Of TypeScript
### TypeScript 정의
**TypeScript is JavaScript with syntax for types**   
TypeScript는 타입 체계를 가진 JavaScript다.   
   
**TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale**   
TypeScript는 JavaScript를 기반으로 하는 강타입 프로그래밍 언어로, 어느 규모에서나 더 나은 툴링을 제공한다.
### TypeScript의 작동 방식
- 브라우저는 타입스크립트가 아닌 자바스크립트를 이해하기 때문에 타입스크립트가 먼저 코드를 확인한 다음 자바스크립트로 변환한다.   
- node.js는 타입스크립트와 자바스크립트를 모두 이해한다.
- 타입스크립트의 보호 장치는 타입스크립트 코드를 컴파일한 후 (자바스크립트로 변환하기 전에) 발생한다.
- 타입스크립트 코드에 에러가 있으면 해당 코드는 자바스크립트로 컴파일되지 않는다.
### TypeScript의 타입들
**string**
<pre>
<code>
   let b : string = "banana";
</code>
</pre>

**number**
<pre>
<code>
   let n : number = 6;
</code>
</pre>

**boolean**
<pre>
<code>
   let t : boolean = false;
</code>
</pre>

**array**
<pre>
<code>
   let a : number[] = [1, 2, 3];
   let b : string[] = ["x", "y", "z"];
   let c : boolean[] = [true]
</code>
</pre>

**object**
<pre>
<code>
   type Player = {
      name : string,
      age? : number
   }

   const playerNico : Player = {
      name: "nico"
   }

   const playerLynn : Player = {
      name: "lynn",
      age: 32
   }
</code>
</pre>
