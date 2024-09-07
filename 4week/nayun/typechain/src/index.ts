import {init, exit} from "./myPackage";

class Block {
    constructor(private data: string){}
    static hello() {
        return "hi";
    }
}



init({
    url: "nayun.com",
    debug: true
})

exit(1)