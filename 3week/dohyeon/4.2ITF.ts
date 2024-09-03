type Nickname = string
type Health = number
type Friends = Array<string>
type Player = {
    nickname: Nickname,
    healthBar: Health
}
const nico: Player = {
    nickname: "nico",
    healthBar: 10
}

type Team = "red" | "blue" | "yellow"
type Health2 = 1 | 5 | 10
//concrete 타입의 특정 값 작성도 가능, 이런 경우엔 지정해둔 값만 선택이 가능(red, blue, yellow)
type Player2 = {
    nickname: string,
    team: Team,
    health2 : Health 
}

const hyeon: Player2 = {
    nickname:"dohyeon",
    team: "red", //여기에 pink등 지정하지 않은 값을 사용 할 시 오류 발생
    health2 : 1
}

/*
인터페이스는 클래스와 동일한 코드로 작동하지만, 객체의 모양을 특정해준다는 점에서 차별을 둔다.
type 키워드는 interface 키워드에 비해 더욱 활용할 수 있는 게 많다.
ex) interface Hello = string 같은 코드는 작성이 불가능함.
*/

//1번(interface 사용)
interface User {
    name: string
}

interface Player3 extends User {
}

const hyeon2 : Player3 = {
    name: "dohyeon2"
}

//2번 type키워드 사용
type User2 = {
    name: string
}

type Player4 = User &  {
}

const hyeon3 : Player4 = {
    name: "dohyeon3"
}
//readonly 사용도 가능
//interface를 같은 이름으로 중첩해서 만들경우 typescript 내에서 자동으로 합쳐줌
