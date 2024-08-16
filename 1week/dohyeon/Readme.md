## 1주차 - #1 Introduction & #2 Overview Of Typescript
<hr>
### #1 Introduction - Why not JavaScript
✅ TypeScript의 타입 안정성: Typescript의 타입 안정성은 개발자 경험을 향상시키고, 버그를 줄이며, 런타임 오류를 최소화하고 생산성을 높인다. 
✅ JavaScript의 유연성: 개발자가 잘못된 코드를 작성하더라도 오류를 발생시키지 않고 컴파일 하기 때문에 추후에 예상하지 못한 오류를 발견 할 수 있다. 
✅ JavaScript의 오류 방지 부족: JavaScript에선 잘못된 타입을 제대로 처리하지 않고 컴파일을 진행하기 때문에 오류를 빠르게 발견하기 어려운 반면에 TypeScript는 이를 방지한다. 
✅ 런타임 오류: JavaScript는 오류가 런타임에서 발생하도록 허용하여, 코드가 이미 사용 중일 때 문제를 발견하는 경우가 많은 반면, TypeScript는 코드가 작성되고 미리 오류를 보여준다. 
✅ TypeScript의 장점: TypeScript는 Boolean 값을 배열에 더하는 것과 같은 올바르지 않은 코드 작성을 사전에 방지해주고, 함수 사용 및 객체 속성을 올바르게 강제함으로서 사전에 오류를 방지해주는 장점이 있다. 
<hr>
### #2 Overview Of Typescript - Types of TS
TypeScript는 기본적으로 Type을 먼저 명시해준다는 점에서 특수성을 가진다.

📌 Type 시스템은 두가지 경우로 나뉘는데 :
└ 변수 선언 시 타입을 정의하는 명시적 정의(Explicit Types)
└ 변수만 생성하고 타입을 TypeScript가 추론하는 내포적 정의 (Implicit Types) 로 나뉜다.

📌 Types of TS(기본)
✅ 배열: array[]
✅ 숫자: number
✅ 문자열: string
✅ 논리: boolean
✅ 튜플: Tuple

✅ undefined, null, any:
any: 아무 타입
undefined: 선언X 할당X
null: 선언O 할당X

✅ unknown, void, never:
unknown: 변수의 타입을 미리 알지 못 할 때 사용
void: 아무것도 return하지 않는 함수를 대상으로 사용
never: 함수가 절대 return하지 않는 경우에 사용
