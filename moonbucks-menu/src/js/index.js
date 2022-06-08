// step1 요구사항 구현을 위한 전략
// TODO 메뉴 추가
// - [O] 메뉴의 이름을 입력 받고 엔터키 입력으로 추가된다.
// - [O] 메뉴의 이름을 입력 받고 확인 버튼을 클릭하면 메뉴를 추가된다.
// - [O] 추가되는 메뉴의 마크업은 ‘<ul id=”menu-list” class=”mt-3 pl-0”></ul>’ 안에 삽입해야 한다.
// - [O] 총 메뉴 갯수를 count하여 상단에 보여준다.
// - [O] 메뉴가 추가되고 나면, input은 빈 값으로 초기화된다.
// - [O] 사용자 입력값이 빈 값이라면 추가되지 않는다.
// TODO 메뉴 수정
// - [O] 메뉴의 수정 버튼 클릭 이벤트를 받고, 메뉴 수정하는 모달창(prompt)이 뜬다.
// - [O] 모달창에서 신규 메뉴명을 입력 받고, 확인 버튼을 누르면 메뉴가 수정된다.
// TODO 메뉴 삭제
// - [O] 메뉴 삭제 버튼 클릭 이벤트를 받고, 메뉴 삭제 컨펌 모달창(confirm)이 뜬다.
// - [O] 확인 버튼을 클릭하면 메뉴가 삭제된다.
// - [O] 총 메뉴 갯수를 count하여 상단에 보여준다.

const $ = (selector) => document.querySelector(selector);

function App() {
  const updateMenuCount = () => {
    const menuCount = $('#menu-list').querySelectorAll('li').length;
    $('.menu-count').innerText = `총 ${menuCount} 개`;
  };

  const addMenuName = () => {
    if ($('#menu-name').value === ''){
      alert('값을 입력해주세요.');
      return;
    }
    const menuName = $('#menu-name').value;
    const menuItemTemplate = (menuName) => {
      return `
        <li class="menu-list-item d-flex items-center py-2">
          <span class="w-100 pl-2 menu-name">${menuName}</span>
          <button
          type="button"
          class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
          >
          수정
          </button>
          <button
          type="button"
          class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
          >
          삭제
          </button>
        </li>`;
    }
    $('#menu-list').insertAdjacentHTML('beforeend', menuItemTemplate(menuName));
    updateMenuCount();
    $('#menu-name').value = '';
  };

  const updateMenuName = (e) => {
    const $menuName = e.target.closest('li').querySelector('.menu-name');
    const updatedMenuName = prompt('메뉴명을 수정하세요.', $menuName.innerText);
    $menuName.innerText = updatedMenuName;
  };

  const removeMenuName = (e) => {
    if (confirm('정말 삭제하시겠습니다?')) {
      e.target.closest('li').remove();
      updateMenuCount();
    }
  };

  $('#menu-list').addEventListener('click', (e) => {
    if (e.target.classList.contains('menu-edit-button')) {
      updateMenuName(e);
    }

    if (e.target.classList.contains('menu-remove-button')) {
      removeMenuName(e);
    }
  });

  $('#menu-form').addEventListener('submit', (e) => {
    e.preventDefault();
  });

  $('#menu-submit-button').addEventListener('click', addMenuName);

  $('#menu-name').addEventListener('keypress', (e) => {
    if(e.key !== 'Enter') {
      return;
    }
    addMenuName();
  });
}
App();