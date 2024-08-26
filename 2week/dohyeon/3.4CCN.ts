//제네릭을 만드는 경우보다 생성되어있는 제네릭을 사용할 경우가 더 많을 것이다.
function superPrint<T>(a: T[]){
    return a[0]
}

const a = superPrint([1,2,3,4])
//타입스크립트가 스스로 타입을 유추하도록 코딩하는게 더 좋음

//Player는 E라는 제네릭을 받음
type Player<E> = {
    name: string
    extraInfo: E
}

type NicoExtra = {
    favFood: string
}

type NicoPlayer = Player<NicoExtra>

const nico: NicoPlayer = {
    name : "nico",
    extraInfo: {
        favFood: "kimchi"
    }
}

const lynn : Player<null> = {
    name:"lynn",
    extraInfo:null
}

type A = Array<number>

let b : A = [1, 2, 3, 4]

function printAllNumbers(arr: number[]){
    
}