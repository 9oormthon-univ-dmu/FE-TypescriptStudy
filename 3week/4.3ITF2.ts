abstract class User {
    constructor(
        public firstName: string,   //protected로 작성시 implements 단계에서 오류 발생
        public lastName: string
    ) {}
    abstract sayHi(name: string): string
    abstract fullName(): string
}
/* 구현 x, 클래스가 따라야할 틀만 제시. 
그러므로 User클래스를 상속 할 시엔 
sayHi와 fullName함수를 구현해야하고 firstName, lastName을 가져야함 */

//1. extends 사용
class Player extends User {
    fullName(){
        return `${this.firstName} ${this.lastName}`
    }
    sayHi(name: string){
        return `Hello ${name}. My name is ${this.fullName}` 
    }
}

//2. implements 사용
interface Human {
    health:number
}

class Player2 implements User, Human {
    constructor(
        public firstName:string,
        public lastName:string,
        public health: number
    ) {}
    fullName(){
        return `${this.firstName} ${this.lastName}`
    }
    sayHi(name: string){
        return `Hello ${name}. My name is ${this.fullName}` 
    }
}

function makeUser(user: User){
    return "hi"
}

makeUser({
    firstName:"nico",
    lastName:"las",
    fullName: () => "xx",
    sayHi: (name) => "string"
})
//interface를 반환하는 경우엔 new User와 같이 새로 생성 할 필요 x