type Add = {
    (a:number, b:number) : number
    (a:number, b:string) : number
}

const add: Add = (a, b) => {
    if(typeof b === "string") return a
    return a + b
}
//오버로딩은 여러 Call signatures가 있는 함수이다.

//overloading 예시
type Config = {
    path : string,
    state : object
}
type Push = {
    (path: string): void
    (config: Config): void
}

const push: Push = (config)=> {
    if(typeof config === "string") { console.log(config) }
    else {
    console.log(config.path)}
}

//다른 CS에 파라미터 개수도 다른 예제
type ex2 = {
    (a:number, b:number) :number
    (a:number, b:number, c:number): number
}

const ex: ex2 = (a, b, c?:number) => {
    if(c) return a+b+c
    return a + b
}
//마지막에 적힌 c파라미터가 옵션이란 것을 알려줘야 하기 때문에 ?:number 라고 명시해야함.

ex(1, 2)
ex(1, 2, 3)