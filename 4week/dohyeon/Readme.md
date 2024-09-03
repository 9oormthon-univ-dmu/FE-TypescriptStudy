## 4주차 - #5 Typescript Blockchain

### #5 Typescript Blockchain <br>
***
📌 Typescript Settings <br>
✅ npm i -D typescript -> typescript의 Dependencies 폴더생성 <br>
✅ npm init -y -> package.json 초기화 <br>

📌 Targets <br>
✅ target 세팅을 통하여 컴파일 될 자바스크립트의 버전을 명시할 수 있다. <br>
 eg: tsconfig.json > ...
```
"compilerOptions": {
        "outDir" : "build",
        "target" : "ES6"
    }
```
✅ 만약 타겟을 ES3같은 구버전의 자바스크립트로 명시할 시, ES3의 자바스크립트는 애로우 함수가 없으므로, 타입스크립트에서 애로우 함수로 작성했던 코드가 컴파일 되면서 일반적인 함수로 바뀐다. <br>
<br>

📌 Lib configuration <br>
✅ 타입스크립트에게 어떤 API를 사용하고 코드가 어디에서 동작하는지 알려줄 수 있다. <br>
```
 eg: tsconfig.json > ...
    "compilerOptions": {
        "lib" : ["ES6", "DOM"]
    }
```
└ "DOM"을 명시함으로서 코드가 브라우저 환경에서 동작한다는걸 의미함. <br>

📌 정의 파일 (Declaration Files) <br>
✅ 타입스크립트에서 package, library, API등이 타입스크립트가 아닌 자바스크립트로 만들어져있다. 이를 타입스크립트에 설명하기 위해 '타입 정의' 가 필요한 것. <br>
✅ 타입스크립트는 .d.ts 정의파일에서 우리가 사용하는 타입을 찾음 <br>
localStorage 입력 후 ctrl + 마우스 좌클릭으로 .d.ts파일에 접근 가능. <br>
```
 eg: src > index.ts
//myPackage를 node_module로 가정하고 진행

import {init} from "myPackage";
```
```
 eg: myPacakge.d.ts > {} "myPackage"
interface Config {
    url: string;
}

declare module "myPackage" {
    function init(config: Config): boolean
}
```
✅ 두번째, interface를 사용하고 싶을 시엔 implements를 통하여 상속한다. 문법은 동일하다. <br>

📌 type과 interface의 차이점 <br>
✅ type은 interface와 달리 교차 타입, 유니온 타입, 튜플, 기타 고급 타입 등을 지원한다. <br>
✅ type은 새 속성을 추가하기 위해 재선언 될 수 없지만 interface는 그와 관계없이 상속(선언)이 가능하다. <br>
추상 클래스를 type과 interface를 통해 대체 할 수 있으며, 둘 다 typescript에게 객체의 모양을 설명해준다는 점에서 동일하다. (자바에서의 붕어빵 틀 개념) <br>
*** 
