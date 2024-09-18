### 1. **Next.js 기본 구성 정리 (TypeScript 사용하지 않음)**

#### **Client & Server Components**

- **Client Components**
  - **클라이언트 사이드에서 실행**되는 컴포넌트입니다.
  - 브라우저에서만 동작하는 로직(예: 이벤트 핸들러, 상태 관리)을 처리할 때 사용합니다.
  - `use client`를 컴포넌트 상단에 명시하여 선언합니다.

  ```jsx
  // 클라이언트 컴포넌트
  'use client';
  
  import { useState } from 'react';
  
  export default function Counter() {
    const [count, setCount] = useState(0);
  
    return (
      <button onClick={() => setCount(count + 1)}>
        {count}
      </button>
    );
  }
  ```

- **Server Components**
  - **서버 사이드에서 실행**되는 컴포넌트입니다.
  - 데이터베이스에서 데이터를 가져오거나, 서버에서만 접근 가능한 로직을 처리할 때 사용합니다.
  - 기본적으로 `Server Components`는 별도의 명시 없이 사용됩니다.

  ```jsx
  // 서버 컴포넌트
  export default function Home() {
    const data = fetch('https://api.example.com/data').then(res => res.json());
  
    return <div>{data.title}</div>;
  }
  ```

### **요약**
- **page.js**: 메인 페이지 컴포넌트
- **layout.js**: 메인 페이지를 감싸는 레이아웃
- **globals.css**: 전체 페이지에 적용되는 CSS 파일
- **public 폴더**: 정적 파일 보관용 폴더
- **api 폴더**: 서버 사이드 API 파일
- **next.config.js**: 프로젝트 설정 파일
- **node_modules 및 package.json**: 패키지 관리
- **Client/Server Components**: 클라이언트와 서버에서 각각 동작하는 컴포넌트

---

### 2. 리액트에서 `useState`와 배열을 사용하는 방법

---

#### ✅ **상품 3개의 수량을 저장하는 상태(state) 생성하기**
```jsx
export default function List() {
  let 상품 = ['Tomatoes', 'Pasta', 'Coconut'];
  let [수량, 수량변경] = useState([0,0,0]); // 초기 수량 3개의 배열로 관리
  return (
    <div>
      <h4 className="title">상품목록</h4>
      
      <span>{수량[0]}</span>
      <button>+</button>
      <span>{수량[1]}</span>
      <button>+</button>
      <span>{수량[2]}</span>
      <button>+</button>
    </div>
  )
}
```
- `useState`는 배열도 받을 수 있습니다.
- 여기서는 `상품 3개` 각각의 수량을 배열 `[0,0,0]`로 저장합니다.

---

#### ✅ **첫 번째 상품의 수량 증가 버튼 기능 추가**
```jsx
export default function List() {
  let 상품 = ['Tomatoes', 'Pasta', 'Coconut'];
  let [수량, 수량변경] = useState([0,0,0]);
  
  return (
    <div>
      <h4 className="title">상품목록</h4>

      <span>{수량[0]}</span>
      <button onClick={() => { 
        let copy = [...수량]; // 수량 배열을 복사
        copy[0]++; // 첫 번째 상품의 수량 증가
        수량변경(copy); // 변경된 배열로 상태 업데이트
      }}>+</button>
    </div>
  )
}
```
- **배열 복사**: `...` 문법을 사용해 새로운 배열을 생성한 후, 수량을 증가시킵니다.
- **왜 복사가 필요한가?**
  - 리액트는 기존 state와 새로운 state를 비교해서 같다면 업데이트를 하지 않음.
  - 배열이나 객체는 참조 값만 비교하므로, 내용만 변경하고 그대로 전달하면 참조는 동일하므로 업데이트가 발생하지 않음.
  - **복사본**을 만들어서 참조값을 다르게 해야 리액트에서 업데이트가 발생하기 때문에 배열 복사를 사용함.



#### ✅ **배열/객체의 상태 관리 방법**
- **복사와 수정 예시**
  ```javascript
  let copy = [...수량];  // 배열 복사
  copy[0]++;             // 수량 증가
  수량변경(copy);         // 변경된 배열로 상태 업데이트
  ```
- **참조값 복사로는 업데이트가 되지 않는 예시**
  ```javascript
  let copy = 수량;  // 참조값만 복사
  copy[0]++;        // 수량을 변경해도 기존 배열과 참조값이 같기 때문에 리액트가 인식하지 못함
  수량변경(copy);   // 업데이트가 일어나지 않음
  ```

---

### **요약**
- 리액트에서 배열/객체로 된 상태를 변경하려면 **독립적인 카피본**을 만들어서 수정해야 한다.
- `...` 문법을 사용해 배열/객체의 독립적인 복사본을 생성할 수 있다.
- 리액트는 참조값을 비교해 상태 변경 여부를 결정하므로, 같은 참조값을 가진 배열/객체로는 상태 변경이 발생하지 않는다.


