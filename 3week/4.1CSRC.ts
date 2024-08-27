//단어사전만들기
//단어추가, 검색, 삭제기능을 사진 메서드 생성
type Words = {
    [key:number]: string
}

// let dict :Words = {
//     1 : "food"
// }

//제한된 양의 property / key의 타입을 명시.

class Dict {
    private words: Words
    constructor(){
        this.words = {}
    }
    add(word: Word){
        if(this.words[word.term] === undefined){
            this.words[word.term] = word.def;
        }
    }
    def(term:string) {
        return this.words[term]
    }
    del(word: Word) {
        if(this.words[word.term] !== undefined) {
            delete this.words[word.term];
        }
    }
    update(word: Word) {
        if(this.words[word.term] !== undefined) {
            this.words[word.term] = word.def;
        }
    }
}

class Word {
    constructor(
        public term: string,
        public def: string
    ) {}
}

const kimchi = new Word("kimchi", "한국의 음식")

const dict = new Dict()
dict.add(kimchi)

dict.add(kimchi);
dict.def("kimchi")

//클래스를 타입처럼 사용할 수 있음