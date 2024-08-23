## 2주차 - Functions

<br/>

### Call Signatures
<br/>

```tsx
type Add = (a: number, b: number) => number; //Call Signature

const add: Add = (a, b) => a + b;
```
<br/>

- 함수의 매개변수와 반환 값의 타입을 미리 지정하는 형태
- 프로그램을 디자인할 때 타입을 먼저 정의한 후, 코드를 구현할 수 있음
- 타입 지정과 함수 구현을 분리해서 작성할 수 있는 장점이 있음
<br/>

---
<br/>

### 오버로딩 (Overloading)
<br/>

- 함수가 서로 다른 여러 개의 Call Signatures를 가질 때 발생
- 외부 패키지나 라이브러리에서 많이 사용
- 다양한 방식으로 호출할 수 있는 함수를 지정할 수 있음

<br/>

```tsx
type Add = {
	(a: number, b: number): number;
	(a: number, b: string): number;
}

const add: Add = (a, b) => a + b; // Error
```
**Error**: `Operator '+' cannot be applied to types 'number' and 'string | number'.`

<br/>

#### 예시 1) 파라미터 타입이 다른 경우
```tsx
type Config = {
	path: string;
	state: object;
};

type Push = {
	(path: string): void;
	(config: Config): void;
};

const push: Push = (config) => {
	if (typeof config === "string") {
		console.log(config);
	} else {
		console.log(config.path, config.state);
	}
};
```
<br/>

#### 예시 2) 파라미터 개수가 다른 경우
```tsx
type Add = {
	(a: number, b: number): number;
	(a: number, b: number, c: number): number;
};

const add: Add = (a, b, c?: number) => { 
	if (c) return a + b + c;
	return a + b;
};
```
여기서 `c`는 옵션, 아마도 `number`일 것이다라고 알려주기

<br/>

---

<br/>

### 다형성 (Polymorphism)
- 여러 타입을 받아드림으로써 여러 형태를 가지는 것
```tsx
type SuperPrint = {
	(arr: number[]): void
	(arr: boolean[]): void
	(arr: string[]): void
}

const superPrint: SuperPrint = (arr) => {
	arr.forEach(i => console.log(i))
}

superPrint([1, 2, 3, 4])
superPrint([true, false, true])
superPrint("a", "b", "c"])
```
위 방법은 모든 가능성을 다 조합해서 만들어야하기 때문에 좋지 않음 <br/>
=> **`generics`** 사용

<br/>

--- 

<br/>

### 제네릭 (Generics)
- **Type Placeholder**
- 타입스크립트에서 타입 추론을 가능하게 함
- Call Signature 작성 시, 들어올 확실한 타입을 모를 때 사용
- 다양한 타입에서 작동할 수 있는 컴포넌트 생성 가능
- 제네릭을 통해 인터페이스, 함수 등의 재사용성을 높일 수 있음

<br/>

```tsx
type SuperPrint = {
	<T>(arr: T[]): T;
};

const superPrint: SuperPrint = (arr) => arr[0];

superPrint([1, 2, 3, 4]);
superPrint([true, false, true]);
superPrint(["a", "b", "c"]);
superPrint([1, 2, true, false]);
```

> 제네릭은 선언 시점이 아니라 생성 시점에 타입을 명시하여 하나의 타입만이 아닌 다양한 타입을 사용할 수 있도록 하는 기법이다

<br/>

#### any와 generic의 차이
> `any`는 타입스크립트의 보호 기능을 무시하고 타입 검사에서 제외 <br/>
> `generic`은 다양한 타입을 받을 수 있도록 추론하여 알맞게 대체

<br/>


#### 여러 개의 제네릭
타입스크립트는 제네릭의 사용 시점과 순서를 기반으로 타입 추론
```tsx
type SuperPrint = {
	<T, M>(arr: T[], b: M): T;
};

const superPrint: SuperPrint = (arr) => arr[0];

superPrint([1, 2, 3, 4], "d");
superPrint([true, false, true], 1);
superPrint(["a", "b", "c"], true);
superPrint([1, 2, true, false], []);
```
<br/>

#### Generic 사용 예시
```tsx
function superPrint<T>(arr: T[]): T {
	return arr[0];
}

superPrint([1, 2, 3, 4]);
superPrint([true, false, true]);
superPrint(["a", "b", "c"]);
superPrint([1, 2, true, false]);
```
>함수로 만들어 사용
<br/>

```tsx
type Player<E> = {
	name: string;
	extraInfo: E;
};

type NicoPlayer = Player<{ favFood: string }>;

const nico: NicoPlayer = {
	name: "nico",
	extraInfo: {
		favFood: "kimchi",
	},
};
```
>제네릭을 사용해 타입을 생성하거나 확장할 수 있음

