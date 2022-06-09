<p align="middle">
  <img width="200px;" src="./src/images/moonbucks.png"/>
</p>
<h2 align="middle">JS 문벅스 카페메뉴 앱</h2>
<p align="middle">Vanilla JS로 구현 하는 상태관리가 가능한 카페메뉴 앱</p>
<p align="middle">
  <img src="https://img.shields.io/badge/version-1.0.0-blue?style=flat-square" alt="template version"/>
  <img src="https://img.shields.io/badge/language-html-red.svg?style=flat-square"/>
  <img src="https://img.shields.io/badge/language-css-blue.svg?style=flat-square"/>
  <img src="https://img.shields.io/badge/language-js-yellow.svg?style=flat-square"/>
  <a href="https://github.com/blackcoffee-study/js-lv1-book-manual/blob/main/LICENSE" target="_blank">
    <img src="https://img.shields.io/github/license/blackcoffee-study/moonbucks-menu.svg?style=flat-square&label=license&color=08CE5D"/>
  </a>
</p>

### 🎯 step1 요구사항 구현을 위한 전략 - 돔 조작과 이벤트 핸들링으로 메뉴 관리하기

요구사항을 먼저 체크하고 정리해 여행 계획을 짜는 것 처럼 순서를 정해야한다.

목적을 명확하게 체크하지  않으면 길을 잃을 수 있다.

---

TODO 메뉴 추가
- 메뉴의 이름을 입력 받고 엔터키 입력으로 추가된다.
- 추가되는 메뉴의 마크업은 ‘<ul id=”espresso-menu-list” class=”mt-3 pl-0”></ul>’ 안에 삽입해야 한다.
- 총 메뉴 갯수를 count하여 상단에 보여준다.
- 메뉴가 추가되고 나면, input은 빈 값으로 초기화된다.
- 사용자 입력값이 빈 값이라면 추가되지 않는다.
<br>

TODO 메뉴 수정
- 메뉴의 수정 버튼 클릭 이벤트를 받고, 메뉴 수정하는 모달창이 뜬다. 
(브라우저에서 제공하는 ‘propmt’ 인터페이스를 활용)
- 모달창에서 신규 메뉴명을 입력 받고, 확인 버튼을 누르면 메뉴가 수정된다.
<br>

TODO 메뉴 삭제
- 메뉴 삭제 버튼 클릭 이벤트를 받고, 메뉴 삭제 컨펌 모달창이 뜬다. 
(브라우저에서 제공하는 ‘confirm’ 인터페이스를 활용)
- 확인 버튼을 클릭하면 메뉴가 삭제된다.
- 총 메뉴 갯수를 count하여 상단에 보여준다.
<br>

### 🎯 step2 요구사항 구현을 위한 전략 - 상태 관리로 메뉴 관리하기

---

TODO localStorage Read & Write
- localStorage에 데이터를 저장한다.
    
    ```jsx
    // "key", "value" 형태로 데이터 저장
    // localStorage에 데이터를 저장할 떄는 string 형태만 가능 (JSON.stringify)
    // 데이터를 배열로 담을 때 처음에 초기화를 해주는 이유는 어떤 데이터가 올지 모르는 경우 push 메서드를 사용할 수 없음
    localStorage.setItem("menu", "espresso")
    ```
    
- localStorage에 있는 데이터를 읽어온다.
    ```jsx
    // 데이터를 문자열로 가져오면 map 함수를 돌릴 수 없어 JSON 객체 형태로 반환해줘야함 (JSON.parse)
    localStorage.getItem("menu")
    ```
<br>

TODO 카테고리별 메뉴판 관리
- 에스프레소 메뉴판 관리
- 프라푸치노 메뉴판 관리
- 블렌디드 메뉴판 관리
- 티바나 메뉴판 관리
- 디저트 메뉴판 관리

TODO 페이지 접근시 최초 데이터 Read & Rendering
- 페이지에 최초로 로딩될 때 localStorage에 에스프레소 메뉴를 읽어온다.
- 에스프레소 메뉴를 페이지에 그려준다.
<br>

TODO 품절 상태 관리
- 품절 버튼을 추가한다.
- 품절 버튼을 클릭하면 localStorage에 상태값이 저장된다.
- 클릭 이벤트에서 가장 가까운 li 태그의 class 속성 값에 sold-out을 추가한다.
<br>
