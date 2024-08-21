let a = "hello"
a = "bye"
//a = 1   //타입스크립트에선 String으로 생성하면 그 변수는 끝까지 String 타입으로 남아야함. 자바스크립트는 타입의 변경이 가능함

let b : boolean = false   //변수 b가 Boolean임을 TypeScript에게 미리 알려주기

let c = [1, 2, 3]
//c.push('1') //자바스크립트는 숫자 배열에 문자열 추가가 가능하지만 타입스크립트는 불가능함.

//명시적 표현은 최소한으로 하는게 좋음

const player = {
    name : "nico"
}

