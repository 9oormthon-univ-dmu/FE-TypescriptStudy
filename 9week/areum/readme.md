## 로딩 및 에러 처리

### 1. 로딩 중 UI (loading.js)

- **목적**: 페이지 이동 시 사용자에게 로딩 중임을 알리는 UI 제공
- **사용법**: `page.js` 옆에 `loading.js` 파일 생성, UI 작성
- **코드 예시**:
    
    ```jsx
    export default function Loading() {
      return <h4>로딩중임</h4>;
    }
    
    ```
    
- **기능**: 페이지가 로드되기 전, 로딩 UI가 자동으로 표시됨.

### 2. 에러 처리 (error.js)

- **목적**: 페이지 로드 중 에러 발생 시 에러 메시지를 사용자에게 알림
- **사용법**: `page.js` 옆에 `error.js` 파일 생성, 에러 발생 시 표시할 UI 작성
- **코드 예시**:
    
    ```jsx
    'use client';
    export default function Error({ error, reset }) {
      return (
        <div>
          <h4>오 이런 에러남</h4>
          <button onClick={() => reset()}>다시 시도</button>
        </div>
      );
    }
    
    ```
    
- **기능**: 에러가 발생하면 `error.js`가 렌더링되며, `reset()`을 통해 페이지를 다시 로드 가능.

### 3. 404 페이지 처리 (not-found.js)

- **목적**: 잘못된 URL로 접근 시 404 에러 메시지를 표시
- **사용법**: `not-found.js` 파일을 생성하여 404 페이지 작성
- **코드 예시**:
    
    ```jsx
    export default function NotFound() {
      return <h4>404 에러임, 그건 없는 페이지임</h4>;
    }
    
    ```
    
- **기능**: `notFound()` 호출 시 404 페이지가 자동으로 렌더링됨.

---


### AWS Elastic Beanstalk

- **장점**: EC2 인스턴스 자동 생성, npm 자동 실행, 자동 확장
- **특징**: 관리가 쉬워 배포에 용이

### Vercel

- **장점**: GitHub 푸시만으로 자동 배포, 무료로 100GB 트래픽 제공
- **특징**: 외부 DB 및 스토리지 필요

---

## 이미지 업로드

### 1. AWS S3 설정 및 Access 키 발급

- **버킷 생성 후 권한 및 CORS 설정**:
    
    ```json
    {
      "AllowedHeaders": ["*"],
      "AllowedMethods": ["PUT", "POST"],
      "AllowedOrigins": ["*"],
      "ExposeHeaders": ["ETag"]
    }
    
    ```
    

### 2. 클라이언트에서 Presigned URL 요청

- **글 작성 페이지에서 이미지 선택 후 S3 업로드**:
    
    ```jsx
    <input type="file" accept="image/*" onChange={
            async (e) => {
              let file = e.target.files[0]
              let filename = encodeURIComponent(file.name)
              let res = await fetch('/api/post/image?file=' + filename)
              res = await res.json()
              
              //S3 업로드
              const formData = new FormData()
              Object.entries({ ...res.fields, file }).forEach(([key, value]) => {
                formData.append(key, value)
              })
              let 업로드결과 = await fetch(res.url, {
                method: 'POST',
                body: formData,
              })
              console.log(업로드결과)
    
              if (업로드결과.ok) {
                setSrc(업로드결과.url + '/' + filename)
              } else {
                console.log('실패')
              }
              
            }
          } />
    ```
    

### 3. 서버에서 Presigned URL 발급

- **AWS S3 Presigned URL 발급 API**:
    
    ```jsx
    import aws from 'aws-sdk';
    export default async function handler(req, res) {
      aws.config.update({
        accessKeyId: process.env.ACCESS_KEY,
        secretAccessKey: process.env.SECRET_KEY,
        region: 'ap-northeast-2',
      });
      const s3 = new aws.S3();
      const url = await s3.createPresignedPost({ Bucket: process.env.BUCKET_NAME, Fields: { key: req.query.file }, Expires: 60 });
      res.status(200).json(url);
    }
    
    ```
    

---

## 다크모드

### 1. 다크모드 버튼 만들기

- **목표**: 다크모드 전환 버튼 구현
- **코드 예시**:
    
    ```jsx
    'use client';
    export default function DarkMode() {
      let [mode, setMode] = useState('light');
      return <button onClick={() => setMode('dark')}>다크모드</button>;
    }
    
    ```
    

### 2. 상태 저장 (localStorage / 쿠키 사용)

- **localStorage 사용**:
    
    ```jsx
    useEffect(() => {
      const mode = localStorage.getItem('mode') || 'light';
      setMode(mode);
    }, []);
    
    ```
    
- **Cookies 사용**:
    
    ```jsx
    document.cookie = 'mode=dark; max-age=3600';
    
    ```
    

### 3. 쿠키 기반 다크모드 상태 유지

- **서버에서 쿠키 값 읽기**:
    
    ```jsx
    import { cookies } from 'next/headers';
    
    export default function RootLayout({ children }) {
      let cookie = cookies().get('mode');
      return <body
          className={
              cookie?.value === 'dark' ? 'dark-mode' : ''}>
                  {children}
    </body>;
    }
    
    ```
