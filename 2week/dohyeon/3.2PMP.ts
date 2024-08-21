//Polymorphism 다형성
//Polymorphism이란 여러가지 다른 구조를 의미함

type SuperPrint = {
    <TypePlaceholder>(arr:TypePlaceholder[]): TypePlaceholder
    (arr:boolean[]): void
    //(arr:string[]):void // 이렇게 작성은 불가능

}

const superPrint: SuperPrint = (arr) => {
    arr.forEach(i => console.log(i))
}

const a = superPrint([1, 2, 3, 4])
const b = superPrint([true, false, true])
const c = superPrint(["a", "b", "c"])
const d = superPrint([1, 2, true, false, "hello"])

//concrete type이란 우리가 전부터 봐왔던 number void boolean 같은 타입들을 말함.

//generic이란 타입의 placeholder 같은거다. 타입을 미리 알 수 없을 때 사용한다. 사용시 타입스크립트가 타입을 유추해서 유추한 타입으로 사용함.