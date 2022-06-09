// step2 요구사항 구현을 위한 전략 - 상태 관리로 메뉴 관리하기
// TODO localStorage Read & Write
// - [O] localStorage에 데이터를 저장한다.
//  - [O] 메뉴를 추가할 때 
//  - [O] 메뉴를 수정할 때 
//  - [O] 메뉴를 삭제할 때 
// - [O] localStorage에 있는 데이터를 읽어온다.

const $ = (selector) => document.querySelector(selector);

const store = {
  setLocalStorage(menu) {
    localStorage.setItem("menu", JSON.stringify(menu));
  },
  getLocalStorage() {
    return JSON.parse(localStorage.getItem("menu"));
  },
};

function App() {
  // 상태 변하는 데이터, 이 앱에서 변하는 것이 무엇인가 - 메뉴명
  this.menu = []; // 초기화를 하지 않으면 어떤 데이터가 올지 몰라 push method 사용 불가, 다른 사람과 협업을 할 때 어떤 상태로 관리가 되는지 명확해짐
  this.init = () => {
    if (store.getLocalStorage().length > 1) {
      this.menu = store.getLocalStorage();
    }
    render();
  };

  const render = () => {
    const template = this.menu.map((menuItem, index) => {
      return `
        <li data-menu-id="${index}" class="menu-list-item d-flex items-center py-2">
          <span class="w-100 pl-2 menu-name">${menuItem.name}</span>
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
    }).join('');

    $('#menu-list').innerHTML = template;
    updateMenuCount();
  }

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
    this.menu.push({ name: menuName });
    store.setLocalStorage(this.menu);
    render();
    $('#menu-name').value = '';
  };

  const updateMenuName = (e) => {
    const menuId = e.target.closest("li").dataset.menuId;
    const $menuName = e.target.closest('li').querySelector('.menu-name');
    const updatedMenuName = prompt('메뉴명을 수정하세요.', $menuName.innerText);
    this.menu[menuId].name = updatedMenuName;
    store.setLocalStorage(this.menu);
    $menuName.innerText = updatedMenuName;
  };

  const removeMenuName = (e) => {
    if (confirm('정말 삭제하시겠습니다?')) {
      const menuId = e.target.closest("li").dataset.menuId;
      this.menu.splice(menuId, 1);
      store.setLocalStorage(this.menu);
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

const app = new App();
app.init();