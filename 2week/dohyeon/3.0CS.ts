//Call Signatures

//const add = (a:number, b:number) => a+b   //원래는 이렇게 작성하는데
//이런식으로 함수를 만들기 전에 Signature를 먼저 만들어서 타입을 설명해주고,
type Add = (a:number, b:number) => number;

//이렇게 축약해서 사용하는게 가능
const add:Add = (a, b) => a + b

//프로그램을 디자인하면서 타입을 먼저 생각하고 구현하는게 포인트