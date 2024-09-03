## 4주차 - #5 Typescript Blockchain

### #5 Typescript Blockchain <br>
***
📌 Typescript Settings <br>
✅ npm i -D typescript -> typescript의 Dependencies 폴더생성 <br>
✅ npm init -y -> package.json 초기화 <br>
<br>

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
└ localStorage 입력 후 ctrl + 마우스 좌클릭으로 .d.ts파일에 접근 가능. <br>
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
<br>
📌 JSDoc <br>
✅ JSDoc은 comment, 즉 주석으로 이루어진 문법이다. 입력값, 타입등 많은걸 지정해줄 수 있음. <br>
✅ 타입스크립트의 코드작성 없이 주석만 작성하여 자바스크립트 코드가 타입스크립트의 보호를 받을 수 있음. <br>
```
 eg: tsconfig.json > ...
"compilerOptions": {
        "allowJs": true
    }
```
```
//@ts-check
/**
 * Initializes the project (프로젝트를 초기화함)
 * @param {object} config
 * @param {boolean} config.debug 
 * @param {string} config.url
 * @returns {boolean}
 */
export function init(config) {
    return true;
}
```
<br>
📌 DefinitelyTyped  <br>
✅ DefinitelyTyped는 여러 개발자들이 참여한 레포인데, 소스코드 분석을 통해 어떤 코드가 어떤식으로 동작하는지를 확인하고 타입스크립트에게 그 패키지가 어떤 역할을 하는지 설명하는 것. (.d.ts 파일을 생성함) <br>
*** 
