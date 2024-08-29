# [Chapter 4] Classes And Interface
### classes
private, public, protected는 typescript의 보호장치로, javascript에선 보이지 않는다.  
   
**private**   
property를 private로 만들 경우 해당 클래스의 인스턴스나 메소드에서 접근할 수 있고, 다른 자식 클래스에서도 접근할 수 없다.   
   
**protected**   
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
- Dict: 단어 삭제, 업데이트 메소드 작성
- Word: 단어 정의 추가, 수정, 출력 메소드 작성
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
  }

  class Word {
    constructor(
      public term: string,
      public def: string,
    )
  }

  const kimchi = new Word("kimchi, "한국의 음식")

  dict.add(kimchi);
  dict.def("kimchi")
```

