# [Chapter 3] Functions
### call signitures
함수를 어떻게 호출해야하는지(파라미터 타입, 리턴 타입)를 알려주는 기능
<pre>
<code>
  type Add = (a:number, b:number) => number;
  const add:Add = (a, b) => a + b
</code>  
</pre>
### overloading
함수가 서로 다른 여러 개의 call sigitures를 가지고 있을 때 발생한다
<pre>
<code>
  type Config = {
    path: string, 
    state: object
  }
  
  type Push = {
    (path:string):void
    (config: Config): void
  }

  const push:Push = (config) => {
    if(typeof config === "string") console.log(config)
    else console.log(config.path)
  }
</code>
</pre>

<pre>
<code>
  type Add = {
    (a:number, b:number):number
    (a:number, b:number, c:number):number
  }

  const add:Add = (a, b, c?:number) => {
    if(c) return a + b + c
    return a + b
  }
</code>
</pre>
### polymorphism(다형성)
generic은 placeholder를 사용하여 다형성을 call signiture로 보여준다
<pre>
<code>
  type SuperPrint = {
    <TypePlaceholder>(arr:TypePlaceholder[]):TypePlaceholder

    const superPrint:superPrint = (arr) => arr[0]

    const a = superPrint([1,2,3,4])    /*number*/
    const b = superPrint([true, false, true])    /*boolean*/
    const c = superPrint(["a", "b", "c"])    /*string*/
    const d = superPrint([1,2,true,"hello"])    /*number | boolean | string*/
  }
</code>
</pre>
### Generics(제네릭)
요구하는 call signiture을 생성하는 도구
<pre>
<code>
  type SuperPrint = {
    <T, M>(a:T[], b:M):T

    const superPrint:superPrint = (a) => a[0]

    const a = superPrint([1,2,3,4], "x")
  }
</code>
</pre>

<pre>
<code>
  type Player<E> = {
    name: string,
    extraInfo: E
  }

  type NicoExtra = {
    favFood: string
  }

  type NicoPlayer = Player<NicoExtra>

  const nico: NicoPlayer = {
    name: "nico",
    extraInfo: {
      favFood: "kimchi"
    }
  }
</code>
</pre>
