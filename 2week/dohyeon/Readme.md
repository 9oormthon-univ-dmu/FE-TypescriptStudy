## 2주차 - #3 Functions

### #3 Functions - Call Signatures & Polymolphism <br>
📌 Call Signatures <br>
✅ Call Signature는 지정한 코드의 변수나 함수의 타입을 알려준다. <br>
✅ 타입 지정하지 않아도 타입스크립트가 해당 코드의 타입을 추론해서 적용해줌 <br>
✅ 프로그램을 디자인하면서 타입을 먼저 생각하고 구현하는게 포인트 <br>
<hr>

📌 Overloading <br>
✅ 오버로딩은 여러 Call Signatures가 있는 함수이다. <br>
✅ 외부 라이브러리나 API 사용시에 자주 사용된다. <br>
<hr>

📌 Polymorphism <br>
Polymorphism(다형성)은 여러가지의 다른 구조를 의미한다. (함수 형태라고 하면, number, void, boolean과 같은걸 의미함) <br>

📌 Generics <br>
✅ Generic 타입은 함수나 클래스의 선언 시점이 아닌, 사용 시점에 타입을 선언할 수 있는 방법을 제공한다.
✅ 타입의 placeholder같은 역할이며, 타입을 미리 알 수 없을 때 사용되고, 사용할 시에 타입스크립트가 코드를 분석하여 타입을 유추해, 유추한 타입으로 자동변경된다.  <br>
