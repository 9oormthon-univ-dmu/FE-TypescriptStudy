//변수에 타입 할당하는 법
let a : number[] = [1, 2];
let b : string[] = ["i1", "1"];
let c : boolean[] = [true];

const player = {
    name : "nico"
}

//객체 player는 name을 모두 가지고 있지만 age는 가지고 있을 수도, 없을 수도 있을 경우엔
const playerNico : {
    name : string,
    age? : number
} = {
    name : "nico"
}

const playerLynn : {
    name : string,
    age? : number
} = {
    name : "lynn"
} //하지만 이런 경우에 동일 객체 생성시 중복으로 작성해야 할게 많아짐. 그러므로 따로 type Player를 작성

type Age = number;
type Name = string;
type Player = {
    name : Name,
    age? : Age
}

const hyn : Player = {
    name :"hyn"
}

//함수에 타입할당
function playerMaker(name:string) : Player {
    return {
        name : name
    }
}

const nico = playerMaker("nico")
nico.age = 12

//arrow 함수일경우
const plyMaker = (name:string) : Player => ({name}) 