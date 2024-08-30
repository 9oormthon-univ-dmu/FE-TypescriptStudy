# [Chapter 4] Classes And Interface
### classes
private, public, protected는 typescript의 보호장치로, javascript에선 보이지 않는다.  
   
**[private]**   
property를 private로 만들 경우 해당 클래스의 인스턴스나 메소드에서 접근할 수 있고, 다른 자식 클래스에서도 접근할 수 없다.   
   
**[protected]**   
상속된 클래스에서 접근할 수 있다. 

```typescript
  class Player {
    constructor(
      private firstName: string,
      protected lastName: string,
      public nickName: string,
    )
  }
```
### abstract class (추상 클래스)
**abstract class**   
다른 클래스가 상속받을 수 있는 클래스, 직접 새로운 인스턴스를 만들 수 없다. javascript에선 사용하지 않는다.  
  
**abstract method**   
추상 클래스 안에 작성하는 메소드로, 메소드의 argument와 call signiture만 가진다. (인스턴스화 할 수 없다.) 추상 클래스를 상속받는 클래스에서 메소드를 구현해야 한다.
```typescript
  abstract class User{
    class Player {
    constructor(
      private firstName: string,
      private lastName: string,
      public nickName: string,
    )
    abstract getNickName():void
  }

  class Player extends User {
    getNickName() {
      console.log(this.nickName)
    }
  }
```
### 사전 만들기
- 단어 삭제, 업데이트 메소드 작성
- 단어 정의 추가, 수정, 출력 메소드 작성
```typescript
  type Words = {
    [key:string]: string
  }

  class Dict {
    private words: Words
    constructor(){
      this.words = {}
    }
    add(word: Word) {
      if(this.words[word.term] === undefined){
        this.words[word.term] = word.def;
      }
    }
    def(term:string){
      return this.words[term]
    }
    delete(term: string) {
      if(this.words[term] !== undefined){
        delete this.words[term]
      }
    }
    update(word: Word) {
      if(this.words[word.term] !== undefined){
        this.words[word.term] = word.def;
      }
    }
  }

  class Word {
    constructor(
      public term: string,
      public def: string,
    ){}
  }

  const kimchi = new Word("kimchi, "한국의 음식")

  dict.add(kimchi);
  dict.def("kimchi")
```
### Interface
object의 모양을 특정해주기 위해 사용한다. type으로도 작성 가능. 
```typescript
   type Team = "red" | "blue" | "yellow"
   type Health = 1 | 5 | 10

   interface Player {
      nickname: string,
      team: Team,
      health: Health
   ]
```
**interface와 type의 차이점**
- interface는 object만 특정할 수 있다.
- 상속의 방법이 다르다
- 같은 interface를 반복 작성이 가능하다

**implements**
- interface를 상속하면 property를 private로 만들 수 없다
- 추상 클래스 대신 interface를 사용함으로서 파일의 사이즈를 줄인다. (javascript로 컴파일되지 않기 떄문)
- 하나 이상의 interface를 동시에 상속할 수 있다.
```typescript
interface User {
  firstName: string;
  lastName: string;
  sayHi(name: string): string;
  fullName(): string;
}

interface Human {
   health: number
}

class Player implements User, Human {
   constructor(
      public firstName: string,
      public lastName: string.
      public health: number
  ) {}
  fullName() {
      return `${this.firstName} ${this.lastName}`;
  }
  sayHi(name: string) {
      return `Hello ${name}. My name is ${this.fullName()}.`;
  }
}
```
### 다형성, 제네릭, 클래스, 인터페이스
```typescript
interface SStorage<T> {
    [key: string] : T
}

class LocalStorage<T> {
    private storage: SStorage<T> = {}
    set(key:string, value: T){
        this.storage[key] = value;
    }
    remove(key: string) {
        delete this.storage[key]
    }

    get(key: string): T {
        return this.storage[key]
    }
    clear(){
        this.storage = {}
    }
}

const stringStorage = new LocalStorage<string>()

stringStorage.get("key")
stringStorage.set("hello", "howru")

const boolStorage = new LocalStorage<boolean>

boolStorage.get('xxx')
boolStorage.set('hello', true)
```
