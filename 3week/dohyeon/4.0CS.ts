class Player {
    constructor(
        private firstName: string,
        private lastName: string,
        public nickname: string
    ) {}
}

const nico = new Player("nico", "las", "니꼬");
nico.nickname;

//private, public, abstract, protected 속성에 대해 배움
//추상클래스는 클래스를 상속 받는 클래스, 하지만 새 인스턴스 생성은 x

abstract class User {
    constructor(
        private firstName: string,
        private lastName: string,
        public nickname: string
    ) {}
    getFullName(){
        return `${this.firstName} ${this.lastName}`
    }
}

class Player2 extends User {
}

const nico2 = new Player2("nico", "las", "니꼬");
/* const nico = new User("nico","las", "니꼬"); 
Cannot create an instance of an abstract class.ts(2511)
*/

nico2.getFullName()

/*추상 클래스 내에서는 추상 메소드 생성이 가능하지만, 
구현은 불가하고 메소드의 Call Signature만 요약해서 작성
*/
