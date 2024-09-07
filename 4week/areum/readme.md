## 타입스크립트로 블록체인 만들기

### 프로젝트 세팅

1. package.json 생성

    `npm init -y`

2. **devDependencies**에 Typescript 설치

    `npm i -D typescript`

3. tsconfig.json 생성

    타입스크립트의 컴파일 설정을 정의해놓는 파일

    프로젝트를 컴파일 하는 데 필요한 루트 파일, 컴파일러 옵션 등을 지정

    - include : 컴파일하고 싶은(TS) 모든 디렉터리
    - compilerOptions :
        - outDir : 컴파일한 파일(JS)이 생성될 디렉터리
        - target : JS 버전 지정 (ES6 권장)
        - lib : target 런타임 환경 지정
            ```json
            "complierOptions": {
            	"lib" : ["ES6", "DOM"]
            }
            ```
        - strict : 엄격한 타입 검사 옵션 활성화
            ```json
            "complierOptions": {
            	"strict": true
            }
            ```
        - allowJS : 타입스크립트에서 JS 파일을 사용할 수 있도록 허용
            ```json
            "complierOptions": {
            	"allowJS": true
            }
            ```
        - esModuleInterop : ES6 모듈 사양을 준수하여 CommonJS 모듈을 정상적으로 가져올 수 있게 함

4. package.json 수정

    ```json
    "scripts" : {
    	"build": "tsc"
    }
    ```

### 정의 파일 (Declaration File)

자바스크립트 코드의 모양을 타입스크립트에 설명해주는 파일 (.d.ts)

(직접 정의 파일을 작성할 일은 많이 없음)

<br/>

### JSDoc

코멘트로 이루어진 문법

함수 바로 위에 코멘트 작성

-   **@ts-check**
    타입스크립트한테 JS 파일을 확인하라고 알리는 것
-   **@param**
    매개변수 타입 설정
-   **@returns**
    리턴 값 타입 설정

```tsx
//@ts-check
/**
 * Initializes the project
 * @param {object} config
 * @param {boolean} config.debug
 * @param {string} config.url
 * @returns boolean
 */
export function init(config) {
    return true;
}

/**
 * Exits the program
 * @param {number} code
 * @returns number
 */
export function exit(code) {
    return code + 1;
}
```

<br/>

### ts-node

빌드 없이 타입스크립트 파일을 빠르게 실행 가능

-   설치 `npm i -D ts-node`

-   package.json scripts에 `"dev" : "ts-node src/index"` 추가

### nodemon

자동으로 커맨드를 재실행하기 때문에 서버를 재시작할 필요가 없어짐

-   설치 `npm i nodemon`

-   package.json scripts에 `"dev" : "nodemon --exec ts-node src/index.ts"` 로 수정

<br/>

### Definitely Typed

https://github.com/DefinitelyTyped/DefinitelyTyped

npm에 존재하는 거의 모든 패키지들에 대해 타입 정의가 되어있음

패키지 설치 후 `npm i -D @types/[패키지명]`

<br/>

---

<br/>

### 블록체인

보호하고 싶은 데이터가 들어있는 여러 개의 블록이 해시값으로 사슬처럼 묶여있는 것

<br/>

**Hash**

블록의 고유 서명

데이터가 변하지 않으면 해시값도 변하지 않음(결정론적)

<br/>

\*최종 코드는 실습파일에..
