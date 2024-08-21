//변수의 타입을 미리 알지 못 할 때 unknown을 사용함
let a : unknown;
if(typeof a === 'number'){
    let b = a+1
}
if(typeof a === 'string'){
    let b = a.toUpperCase();
}

//void는 아무것도 return하지 않는 함수를 대상으로 사용함
function hello(){
    console.log('x')
}

//never는 함수가 절대 return하지 않는 경우에 사용함
function hello2(name:string|number):never{
    throw new Error("xxx")
}

function hello3(name:string|number){
    if(typeof name === 'string'){
        name    //여긴 string
    } else if (typeof name === "number"){
        name    //여긴 number
    } else {
        name    //여기서 name은 never 절대 사용되지 않기 때문
    }
}