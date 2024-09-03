## 4주차 - #5 Typescript Blockchain

### #5 Typescript Blockchain <br>
***
📌 Typescript Settings <br>
✅ npm i -D typescript -> typescript의 Dependencies 폴더생성 <br>
✅ npm init -y -> package.json 초기화 <br>

📌 Targets <br>
✅ target 세팅을 통하여 컴파일 될 자바스크립트의 버전을 명시할 수 있다. <br>
 eg: 
```
"compilerOptions": {
        "outDir" : "build",
        "target" : "ES6"
    }
```
<br>
✅ 만약 타겟을 ES3같은 구버전의 자바스크립트로 명시할 시, ES3의 자바스크립트는 애로우 함수가 없으므로, 타입스크립트에서 애로우 함수로 작성했던 코드가 컴파일 되면서 일반적인 함수로 바뀐다. <br>

📌 타입스크립트에서 클래스는 값이면서 동시에 타입으로 쓰일 수 있고, 클래스를 선언하는 방식은 두가지로 나뉜다. <br>
└ type 키워드 사용하기 <br>
└ Interfaces 사용하기 <br>

✅ 첫번째, 타입을 사용하고 싶을 시엔 type 키워드를 사용한다. 이 경우 아래의 옵션들로 나뉜다. <br>
└ 객체의 모양을 설명하기 <br>
└ type alias를 생성하기 <br>
└ 타입을 특정한 값으로 변경하기 <br>

✅ 두번째, interface를 사용하고 싶을 시엔 implements를 통하여 상속한다. 문법은 동일하다. <br>

📌 type과 interface의 차이점 <br>
✅ type은 interface와 달리 교차 타입, 유니온 타입, 튜플, 기타 고급 타입 등을 지원한다. <br>
✅ type은 새 속성을 추가하기 위해 재선언 될 수 없지만 interface는 그와 관계없이 상속(선언)이 가능하다. <br>
추상 클래스를 type과 interface를 통해 대체 할 수 있으며, 둘 다 typescript에게 객체의 모양을 설명해준다는 점에서 동일하다. (자바에서의 붕어빵 틀 개념) <br>
*** 
