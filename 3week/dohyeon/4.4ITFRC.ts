// type Player = "1" | "2"

type PlayerA = {
    firstName : string
}
interface PlayerB {
    firstName: string
}
class User implements PlayerA {
    constructor(
        public firstName: string
    ){}
}
