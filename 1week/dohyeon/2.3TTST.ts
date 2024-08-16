//ReadOnly속성추가
const numbers : readonly number[] = [1, 2, 3, 4]
// numbers.push(1)  //readonly이기 때문에 push가 불가능함

const names : readonly string[] = ["1", "2"]
//이 readonly속성은 JavaScript에선 사용이 불가능함

//Tuple 사용 
const player: [string, number, boolean] = ["nico", 1, true]
player[0] = "hi"

//readOnly + Tuple 
const p1 : readonly [string, number, boolean] = ["hyn", 1, true]
// p1[0] = "hi" //readonly이기 때문에 에러 발생

let a : undefined = undefined
let b : null = null
//선택적 타입은 undefined가 될 수 있다.

//any타입
let A = [] //-> any사용시 자바스크립트와 다를게 없게 됨

const c : any[] = [1, 2, 3, 4]
const d : any = true
c + d
//이 경우 오류가 발생하지 않음. any를 지울시 오류가 발생

