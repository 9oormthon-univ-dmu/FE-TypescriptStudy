## 3주차 - Classes And Interfaces

### 클래스

```tsx
class Player {
  constructor(
    private firstName: string,
    private lastName: string,
    public nickname: string
  ) {}
}

const areum = new Player("areum", "cho", "앎");

```
>위 코드에서 private은 JavaScript로 컴파일 시 사라짐 <br/>
>=> private 키워드는 오로지 TypeScript가 보호해주기 위해서만 사용됨

#### 접근 제한자
- **public**: 모든 외부에서 접근 가능 (기본값)
- **private**: 선언한 클래스 내에서만 접근 가능
- **protected**: 선언한 클래스와 자식 클래스에서 접근 가능

#### 추상 클래스와 추상 메소드

```tsx
abstract class User {
  constructor(
    protected firstName: string,
    protected lastName: string,
    protected nickname: string
  ) {}

  abstract getNickName(): void; // 추상 메소드

  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}

class Player extends User {
  getNickName() {
    console.log(this.nickname);
  }
}

const areum = new Player("areum", "cho", "앎");

```
- **추상 클래스**: 다른 클래스가 상속받을 수 있지만 직접 인스턴스를 생성할 수 없음
- **추상 메소드**: 추상 클래스를 상속받는 모든 클래스가 구현해야 하는 메소드
  - 추상 클래스 안에서는 추상 메소드를 만들 수 있음
  - argument의 이름과 타입, 함수의 리턴 타입 정의
 
<br/>

### 단어 사전 예제

```tsx
type Words = {
	[key:string]: string 
	// 제한된 양의 property 혹은 key를 가지는 타입을 정의해주는 방법
	// property에 대해서 미리 알진 못하지만 타입만 알고 있을 경우 사용
}

let dict : Words = {
	"potato": "food"
}

class Dict {
	private words: Words
	constructor() {
		this.words = {}
	}
	add(word:Word){ // 단어 추가
		if(this.words[word.term] === undefined){ //아직 사전에 존재하지 않음
			this.words[word.term] = word.def
		}
	}
	def(term:string){ // term을 이용해 단어를 불러옴
		return this.words[term]
	}
	update(word: Word) { //수정
		if (this.words[word.term] !== undefined) {
			this.words[word.term] = word.def
		}
	}
	del(term: string) { //삭제
		if(this.words[term] !== undefined) {
			delete this.words[term];
		}
	}
}

class Word {
	constructor(
		public term: string,
		public def : string
	){}
}

const kimchi = new Word("kimchi", "한국 음삭")

const dict = new Dict()

dict.add(kimchi)
dict.def("kimchi")

```

<br/>

---
<br/>

### 인터페이스(Interface)

```tsx
type Team = "red" | "blue" | "yellow";
type Health = 1 | 5 | 10;

interface Player {
  nickname: string;
  team: Team;
  health: Health;
}

const areum: Player = {
  nickname: "areum",
  team: "blue",
  health: 10
};

```
**type의 용도**
  - 객체 형태 정의
  - 타입 alias 만들기
  - 타입을 특정 값으로 제한

❗️**interface**는 오직 객체의 형태를 정의할 때만 사용

<br/>

#### 인터페이스 특징
- 객체 지향 프로그래밍의 개념을 활용하여 디자인 됨
- Property들을 축적시킬 수 있음

```tsx
interface User {
  name: string;
}

interface User {
  lastName: string;
}

interface User {
  health: number;
}

const areum: User = {
  name: "areum",
  lastName: "cho",
  health: 10
};

```

<br/>

### 추상 클래스와 인터페이스
- 표준화된 property와 메소드를 갖도록 해주는 청사진을 만들기 위해 추상클래스 사용
- 자바스크립트에는 abstract의 개념이 없음 => 일반 클래스로 변환
- 인터페이스는 컴파일 시 JS로 바뀌지 않고 사라짐 => 가벼움

<br/>

#### 인터페이스 구현 예시

```tsx
interface User {
  firstName: string;
  lastName: string;
  sayHi(name: string): string;
  fullName(): string;
}

class Player implements User {
  constructor(
    public firstName: string,
    public lastName: string
  ) {}

  fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  sayHi(name: string) {
    return `Hello ${name}. My name is ${this.fullName()}.`;
  }
}

```

> **implements**
> - 클래스를 인터페이스에 맞춰 구현할 때 사용
> - 여러 인터페이스를 상속 받을 수 있어 다양한 기능을 결합할 수 있음.


#### 인터페이스와 추상 클래스의 차이
1. **접근 제한자**
    - 인터페이스: `public`만 사용 가능
    - 추상 클래스: `private`, `protected`, `public` 모두 사용 가능
2. **다중 상속**
    - 인터페이스: 여러 인터페이스를 구현할 수 있어 다양한 기능을 조합할 수 있음
    - 추상 클래스: 하나의 클래스만 상속할 수 있지만, 코드 재사용을 위한 구현이 가능.

