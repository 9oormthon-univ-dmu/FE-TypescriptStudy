//다형성, 제네릭, 클래스 그리고 인터페이스 구현하기
interface SStorage<T> {
    [key:string] : T
}

//제네릭을 사용해서 로컬스토리지에서 어떻게 파일을 저장하는지 형식만 구현
class LocalStorage<T> {
    private storage: SStorage<T> = {}
    //set 메서드 생성
    set(key:string, value: T){
        this.storage[key] = value;
    }
    remove(key:string) {
        delete this.storage[key]
    }

    get(key:string): T {
        return this.storage[key]
    }
    clear(){
        this.storage = {}
    }
}
/* Generic을 생성한 뒤 클래스로 보내고,
클래스에서 제네릭을 인터페이스로 보낸 뒤에,
인터페이스에서 제네릭을 사용 */


const stringStorage = new LocalStorage<string>() 
//이부분에서 타입스크립트가 미리 지정해두었던 concrete 타입으로 변경해줌

stringStorage.get("key")
stringStorage.set("hello", "howru")

const boolStorage = new LocalStorage<boolean>

boolStorage.get('ue')
//return값이 boolean으로 반환됨
boolStorage.set('ue', true)