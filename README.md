# GitHub Repo View

> 특정 깃헙 레파지토리([angular-cli](https://github.com/angular/angular-cli))의 이슈 목록과 상세 내용을 확인
>
> ### 🌍 [배포링크](https://watch-githubrepoview.netlify.app/)

<br/>

## 📖 목차

- [구현기능](#-구현-기능)
- [기술스택](#-기술-스택)
- [구현방법](#-구현-방법) 
- [폴더구조](#-폴더-구조)
- [컨벤션](#컨벤션)
- [프로젝트 설치 및 실행](#프로젝트-설치-및-실행)

</br>

## 🚀 구현 기능
- 공통
  - Context API를 활용한 API 연동
  - 데이터 요청 중 로딩 표시
  - 에러 화면 구현
- 공통 헤더
  - Organization Name / Repository Name이 표시
- 이슈 목록 화면
  - open 상태의 이슈 중 코멘트가 많은 순으로 정렬
  - 각 행에 이슈번호, 이슈제목, 작성자, 작성일
  - 다섯번째 셀에 원티드 광고 출력
  - 화면을 아래로 스크롤 할 시 이슈 목록 추가 로딩 (인피니티 스크롤)
- 이슈 상세 화면
  - 이슈의 상세 내용 표시
  - 이슈번호, 이슈제목, 작성자, 작성일, 코멘트 수, 작성자 프로필 이미지, 본문 표시

</br>

## ✏ 기술 스택 
 JavaScript / React / Axios / styled-components / React-Markdown / React-Icons
 
 </br>
 
## ✔ 구현 방법
 ### Context API 와 useReducer 를 활용하여 전역상태 관리
 - 이슈 관련 데이터들을 Context API와 useReducer 를 활용하여 전역상태를 관리했습니다. axios 비동기부분의 로딩, 데이터, 에러 관련 공통 코드들을 각각 모듈화 후 활용했습니다.
 https://github.com/k-watch/GithHubRepoView/blob/99dc23e3bc55d104e890d3ea933b061934e7f9b4/src/modules/context/IssueContext.js#L19-L47 
 ### 인피니티 스크롤
 - IntersectionObserver 로 인피니티 스크롤을 구현했습니다. 기존에 getBoundingClientRect 를 통한 스크롤 이벤트는 호출시 값(top, right 등)을 정확히 읽어들이기 위해 큐를 flush하고 스타일을 적용하여 다 수의 reflow를 발생시켰습니다. 이러한 reflow를 방지하고자 IntersectionObserver 를 사용하여 뷰포트와 설정한 요소의 교차점을 관찰하도록 설정했습니다.  
 https://github.com/k-watch/GithHubRepoView/blob/99dc23e3bc55d104e890d3ea933b061934e7f9b4/src/modules/hooks/useInfiniteScroll.js#L3-L39
 ### 데이터 요청 중 로딩 표시
 - 데이터 요청 중 로딩중일 때 로딩 컴포넌트를 호출해 표시해주었습니다.
 https://github.com/k-watch/GithHubRepoView/blob/003a1e1e09520973f2a1c4a243e3b9300f47179d/src/components/common/Loading.jsx#L4-L28

</br>

## 📚 폴더 구조

```jsx
📂 src
├── 📂 api
│   ├── 📂 common
│   │   └── 📄 url // URL 상수 관리
│   ├── 📂 issue
│   │   └── 📄 issue 
│   └── 📄 index
├── 📂 component
│   ├── 📂 common
│   │   ├── 📄 BannerItem
│   │   └── 📄 Loading
│   ├── 📂 issue
│   │   ├── 📄 IssueContent
│   │   ├── 📄 IssueHeader
│   │   ├── 📄 IssueItem
│   │   └── 📄 IssueList
├── 📂 modules
│   ├── 📂 context
│   │   └── 📄 IssueContext
│   ├── 📂 hooks
│   │   └── 📄 useInfiniteScroll // IntersectionObserver 이용한 무한 스크롤링
│   └── 📄 asyncActionUtils asnyc // 초기화, 로딩, 성공, 실패 관리
├── 📂 pages
│   ├── 📄 IssueContentPage
│   └── 📄 IssueListPage
├── 📂 router
│   └── 📄 Router
├── 📂 styles
│   ├── 📄 GlobalStyle
│   ├── 📄 mixin
│   └── 📄 theme
├── 📄 App
└── 📄 index
```

</br>

## 컨벤션
| 커밋명      | 내용                                             |
| ----------- | ------------------------------------------------ |
| ✨ feat     | 파일, 폴더, 새로운 기능 추가                     |
| 🐛 fix      | 버그 수정                                        |
| 💄 style    | 코드 스타일 변경                                 |
| 🛠 refactor | 코드 리팩토링                                    |
| 📝 docs     | 문서 생성, 추가, 수정(README.md)                 |

</br>

## 프로젝트 설치 및 실행
1. GitHub Rest API 횟수 제한을 해제하기 위해 개인 토큰 발급 뒤 root 경로에 .env 파일을 생성하고 아래 내용을 추가합니다.
```command
REACT_APP_ACCESS_TOKENS='발급받은 토큰'
```
2. cmd 창에 아래 command 입력해주세요.
```command
$ npm install
$ npm start
```
