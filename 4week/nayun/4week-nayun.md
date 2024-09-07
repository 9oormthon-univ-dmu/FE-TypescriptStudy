# [Chapter 5 TypeScript Blockchain]
### 타입스크립트 프로젝트 설정
**파일 생성하기**
- npm init -y   
    - package.json 파일 생성
    - main 삭제
    - scripts의 test 삭제
- npm i -D typescript
    - devDependencies에 typescript 설치
- src 폴더 생성 후 index.ts 파일 생성

**파일 설정하기**
- touch tsconfig.json
    - tsconfig.json 파일 생성   

        ```json
        "include": ["src"]
        src의 모든 파일을 확인함

        "compilerOptions": {"outDir": "build"}
        javascript 파일이 생성될 폴더를 build로 지정
        ```
- package.json에 build 스크립트를 tsc로 설정
- npm run build로 컴파일

**target**
```json
"compilerOptions": {
    "outDir": "build",
    "target": "ES6"
}
```
- tsconfig.json의 target으로 자바스크립트 버전 설정
- 일반적으로 ES6 버전 사용

**lib configuration**
```json
"compilerOptions": {
    "outDir": "build",
    "target": "ES6",
    "lib": ["ES6", "DOM"]
}
```
- 타입스크립트에게 사용할 API를 지정해 자동완성 기능을 제공한다

**declaration files (정의 파일)**   
자바스크립트 파일과 모듈을 위한 타입 정의를 작성한다
- myPackage.js의 정의 파일 만들기
    - 보호 활성화
        ```json
        "compilerOptions": {
            "outDir": "build",
            "target": "ES6",
            "lib": ["ES6", "DOM"],
            "strict": true
        }
        ```
    - myPackage.d.ts 파일 생성 후 모듈 설정
        ```typescript
        interface Config {
            url: string
        }

        declare module "myPackage" {
            function init(config: Config): boolean;
            function exit(code:number): number;
        }
        ```
**자바스크립트 파일 불러오기**
- 자바스크립트 허용하기
    ```json
    "compilerOptions": {
        "outDir": "build",
        "target": "ES6",
        "lib": ["ES6", "DOM"],
        "strict": true,
        "allowJS": true
    }
    ```
- JSDoc
    - 코멘트로 이루어진 문법
    - 자바스크립트에 보호 장치 더해줌
        ```typescript
        // @ts-check

        /**
        * Exits thr program
        * @param {number} code 
        * @returns number
        */
        export function exit(code){
            return code + 1;
        }
        ```
### 블록체인 만들기
**효율적인 작업 환경 설정**
- npm run dev로 실행
    ```json
    "scripts": {
        "build": "tsc",
        "dev": "nodemon --exec ts-node src/index.ts",
        "start": "node build/index js"
    }
    ```
**블록체인 만들기**   
블록체인이란 삭제할 수 없고, 추가만 가능한 데이터베이스와 같은 개념이다.
- BlockShpae 인터페이스 만들기
    ```typescript
    interface BlockShape {
        hash: string
        prevHash: string
        height: number
        data: string
    }
    ```
- Block 클래스 만들기
    ```typescript
    class Block implements BlockShape{
        public hash: string
        constructor(
            public prevHash: string,
            public height: number,
            public data: string,

        ){
            this.hash = Block.calculateHash(prevHash, height, data)
        }
        static calculateHash(prevHash: string, height: number, data: string) {
            const toHash = `${prevHash}${height}${data}`
            return crypto.createHash("sha256").update(toHash).digest("hex")
        }
    }
    ```
    - Block의 hash값은 preHash, height, data 값을 이용해 계산된다.   
    - 어떤 컴퓨터에서 생성해도 입력값이 같으면 동일한 해쉬값 문자열이 생성된다.

- Blockchain 클래스 만들기
    ```typescript
    class Blockchain {
        private blocks: Block[]
        constructor(){
            this.blocks = [];
        }
        private getPrevHash(){
            if(this.blocks.length === 0) return ""
            return this.blocks[this.blocks.length - 1].hash
        }
        public addBlock(data: string) {
            const newBlock = new Block(this.getPrevHash(), this.blocks.length + 1, data);
            this.blocks.push(newBlock);
        }
        public getBlocks(){
            return [...this.blocks];
        }

    }   
    ```
    타인이 블록체인을 해킹하여 이상한 값을 추가하지 않도록 새로운 배열을 추가해야 한다. ->  [...this.blocks]

- 결과
    ```powershell
    [
    Block {
        prevHash: '',
        height: 1,
        data: 'First one',
        hash: 'd90f2cc6ecdb63760af30f041a06e85e9a4d3376cccc09ff807e08c749e81ca9'
    },
    Block {
        prevHash: 'd90f2cc6ecdb63760af30f041a06e85e9a4d3376cccc09ff807e08c749e81ca9',
        height: 2,
        data: 'Second one',
        hash: '21625d153b9a2ba0996ac8a8ce85b78d5512a4c0bbf647548b0befab3e9b3cfe'
    },
    Block {
        prevHash: '21625d153b9a2ba0996ac8a8ce85b78d5512a4c0bbf647548b0befab3e9b3cfe',
        height: 3,
        data: 'Third one',
        hash: '33090390c5b209e1796881ef8aa55128e9beab0941cbc6f4989260d6f5bd961b'
    }
    ]
    ```
**Definitely Types**   
타입스크립트로 만들어지지 않은 패키지를 모두 정의해놓은 레포지토리
- 타입 정의로만 이루어져 있다
- JSDoc을 사용해 직접 사람들의 정의하였다
- 콘솔을 통해 설치 가능
    ```powershell
    npm i packageName

    npm i -D @types/packageName
    ```
    패키지를 설치 후 타입 정의 패키지 설치