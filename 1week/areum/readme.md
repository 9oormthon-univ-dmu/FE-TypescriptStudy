## 1주차 - INTRODUCTION & OVERVIEW OF TYPESCRIPT

### Typescript란?
Javascript는 매우 유연하여 실행 전 에러 감지 불가   
이러한 문제를 보완하기 위해 만들어진 자바스크립트 기반 언어

#### 타입 안정성
- 코드에 버그 감소
- 런타임 에러 줄어듦
- 생산성 향상

### 타입 시스템
1. 변수 선언 시 타입 명시적 정의
```typescript
let a : boolean = false
```
2. 변수만 선언하여 타입을 추론하게 함
```typescript
let b = "hello"
```

### Types of TS
- 숫자 : number
- 문자열 : string
- 배열 : array[]
- 논리 : boolean
- 튜플 : tuple


#### 변수 타입 할당

```typescript
type Player = {
  name:string,
  age?:number // optional
}
const nico : Player = {
  name:"nico"
}
const lynn : Player = {
  name:"lynn",
  age:12
```

#### 함수 return 타입 할당
```typescript
type Player = {
  name:string,
  age?:number
}
function playerMaker1(name:string) : Player {
  return {
    name
  }
}

const playerMaker2 = (name:string) : Player => ({name}) // 화살표 함수 사용

const nico = playerMaker1("nico")
nico.age = 12
```
-------   

#### any
아무 타입이나 될 수 있음
Typescript로부터 빠져나오고 싶을 때 사용

#### unknown
변수의 타입을 미리 알지 못 할 떄 사용
타입 확인 과정 필요
```typescript

let a : unknown;

if(typeof a === 'number'){
  let b = a + 1
}

```

#### void
아무것도 return 하지 않는 함수
따로 지정해줄 필요 X
```typescript
function hello() {
  console.log("yee")
}
```
> function hello() : void

#### never
함수가 절대 return하지 않을 때(exception이 발생할 때)
```typescript
function hello(name:string|number){
  if(typeof name === "string"){
    name // string
  } else if (typeof name === "number"){
    name // number
  } else {
    name // never
  }
}
```

