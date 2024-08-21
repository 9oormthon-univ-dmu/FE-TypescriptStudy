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

   
   **객체를 return하는 함수 만들기**
   
   function playerMaker(name: string) : Player {
      return {
         name
      }
   }

   const nico = playerMaker("nico")
   nico.age = 12
</code>
</pre>

**tuple**   
배열의 서브 타입, 크기와 타입이 고정된 배열
<pre>
<code>
   const player: [string, number, boolean] = ["nico", 1, true]
</code>
</pre>

**undefined, null**   
<pre>
<code>
   let a : undefined = undefined
   let b : null = null
</code>
</pre>

**any**   
비어있는 값들은 기본적으로 any 타입을 가진다, TypeScript의 보호장치를 벗어나기 위한 타입
<pre>
<code>
   const a : any[] = [1, 2, 3, 4]
   const b : any[] = true
   a + b (에러 발생 X)
</code>
</pre>

**unknown**   
<pre>
<code>
   let a : unknown
   
   if(typeof a === "number"){
      let b = a + 1
   }

   if(typeof a === "string"){
      let b = a.toUpperCase()
   }
</code>
</pre>

**void** 
return값이 없는 함수의 타입, 따로 지정할 필요는 없다
<pre>
<code>
   function hello(){
      console.log("X")
   }
</code>
</pre>

**never**
return하지 않고 오류를 발생시키는 함수의 타입
<pre>
<code>
   function hello() : never{
      throw new Error("xxx")
   }

   function hello(name : string | number) {
      if(typeof name === "string"){
         name (-> string)
      } else if(typeof name === "number){
         name (-> number)
      } else{
         name (-> never)
      }
   }
</code>
</pre>

### 타입에 속성 추가하기

**readonly**
<pre>
<code>
   const numbers : readonly number[] = [] 
</code>
</pre>
