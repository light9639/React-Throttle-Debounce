# 💫 React의 Throttle, Debounce를 활용하여 만든 예제 파일.
:octocat: 바로가기 : https://light9639.github.io/React-Throttle-Debounce/

![light9639 github io_React-Throttle-Debounce_ (1)](https://user-images.githubusercontent.com/95972251/217757133-c713d999-46d5-4011-8898-9697892ee336.png)

:sparkles: 💫 React의 Throttle, Debounce를 활용하여 만든 예제 파일. :sparkles:
## :tada: React 프로젝트 생성
- React 생성
```bash
npm create-react-app my-app
# or
yarn create react-app my-app
```

- vite를 이용하여 프로젝트를 생성하려면
```bash
npm create vite@latest
# or
yarn create vite
```
- 터미널에서 실행 후 프로젝트 이름 만든 후 React 선택, Typescirpt-SWC 선택하면 생성 완료.
## :rocket: React-Router-Dom 설치
- React-Router-Dom 설치 명령어
```bash
$ npm install react-router-dom
# or
$ yarn add react-router-dom
```

## ✒️ main.tsx, App.tsx 수정 및 작성
### :zap: main.tsx
- `HashRouter`를 import한 후 `<HashRouter></HashRouter>` 컴포넌트로 `<App />`을 감싸면 `/#/{링크명}`으로 페이지 이동이 가능하다.
- `/#/{파일명}`으로 이동시키려는 이유는 `github.io`에서 링크를 이동하다 새로고침을 할 경우 `404` 페이지가 뜨기 때문이다.
```typescript
import { HashRouter } from 'react-router-dom'

<HashRouter>
  <App />
</HashRouter>
```
### :zap: App.tsx
```typescript
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Debounce from '@components/Debounce'
import Throttle from '@components/Throttle'
import { Link, Routes, Route } from 'react-router-dom'

export default function App(): JSX.Element {
  return (
    <div className="App">
      <div>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>React Debounce, Throttle</h1>
      <div className="card">
        <div className='Menu'>
          <Link to="/">Debounce</Link>
          <Link to="/Throttle">Throttle</Link>
        </div>
        <Routes>
          <Route path="/" element={<Debounce />} />
          <Route path="Throttle" element={<Throttle />} />
        </Routes>
      </div>
    </div>
  )
}
```
## 📝 components 파일 속 Debounce.tsx, Throttle.module.css, Throttle.tsx 수정 및 작성
### :zap: Debounce.tsx
- 일반적인 `onChange` 문법을 사용하면 input에 한글자씩 입력하면 콘솔창에 출력된다.
- 그러나 `Debounce`를 사용하면 input에서 입력이 완료되면 콘솔창에 출력된다.
```typescript
import React, { useState, useEffect } from "react";

export default function Debounce(): JSX.Element {
    const [value1, setValue1] = useState<string>("");
    const [value2, setValue2] = useState<string>("");

    const handleChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue1(e.target.value);
    }

    const handleChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue2(e.target.value);
    }

    useEffect(() => {
        console.log("일반입력:", value1);
    }, [value1]);

    useEffect(() => {
        const debounce = setTimeout(() => {
            console.log("디바운스 입력:", value2);
        }, 1000);
        return () => clearTimeout(debounce);
    }, [value2]);

    return (
        <React.Fragment>
            <div className="InputBox">
                {/* input에 한글자씩 입력하면 콘솔창에 출력 */}
                일반 입력 : <input value={value1} onChange={handleChange1} />
            </div>
            <div className="InputBox">
                {/* input에서 입력이 완료되면 콘솔창에 출력 */}
                디바운스 입력 : <input value={value2} onChange={handleChange2} />
            </div>
        </React.Fragment>
    );
}
```
### :zap: Throttle.module.css
- `Throttle` 컴포넌트에 `CSS` 추가
```css
.book {
    display: flex;
    margin: 25px auto;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    height: 500px;
    width: 350px;
    background-color: #3b82f6;
    overflow-y: scroll;
}

.page {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #eff6ff;
    height: 100px;
    width: 100px;
    margin-bottom: 10px;
    border-radius: 10%;
    color: #000;
}
```
### :zap: Throttle.tsx
- `throttle`를 사용하여 스크롤을 내릴때마다 총 100개의 반복문 중 5개씩만 생성되도록 설정함.
```typescript
import React, { useState, useEffect } from "react";
import styles from './Throttle.module.css'

export default function Throttle(): JSX.Element {
    const [page, setPage] = useState<number>(10);
    const [books, setBook] = useState<number[]>([]);
    const [throttle, setThrottle] = useState<boolean>(false);

    // 스크롤을 내리면 100개의 box를 5개씩 추가로 생성한다.
    const handleScroll = () => {
        if (throttle) return;
        if (!throttle) {
            setThrottle(true);
            setTimeout(async () => {
                if (page >= 100) setPage(page);
                else setPage((page) => page + 5);
                setThrottle(false);
            }, 300);
        }
    };

    useEffect(() => {
        setBook(
            Array.from({ length: page }, (_, idx) => idx + 1)
        );
    }, [page]);

    return (
        <div className={styles.book} onScroll={handleScroll}>
            <div>
                {books.map((page, idx) => (
                    <div className={styles.page} key={idx}>
                        {page}
                    </div>
                ))}
            </div>
        </div>
    );
}
```
