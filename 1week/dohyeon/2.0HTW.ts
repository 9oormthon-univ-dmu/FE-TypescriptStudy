//How Typescript Works

const nico = {
    nickname : "nick"
}

//nico.hello()    //이 객체 타입에 hello는 존재하지 않다고 컴파일 전에 미리 알려줌

//[1, 2, 3, 4] + false    //객체 + false는 불가능하다고 미리 알려줌

function divide(a, b) {
    return a / b
}

//divide("hello") //divide는 인자가 2개가 필요한데, 하나만 넣었다고 에러가 표시됨

const player = {
    age : 12
}

//player.age = false  //숫자에서 boolean 타입으로 변경이 불가능하다고 에러를 표시