//Generics를 요구한 대로 signature를 생성하는 도구라고 생각하기
type SuperPrint = <T, M>(a: T[], b:M) => T
const superPrint: SuperPrint = (a) => a[0]

const a = superPrint([1,2,3], "x")
//타입스크립트는 제네릭을 처음 인식했을 때와 제네릭의 순서를 기반으로 제네릭의 타입을 추측함