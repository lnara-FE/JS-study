import { $ } from './utils/dom.js';
import { store } from './store/index.js';

// step3 요구사항 구현을 위한 전략 - 서버와의 통신을 통해 메뉴 관리하기
// TODO 서버 요청 부분
// - [O] 웹 서버를 띄운다.
// - [O] 서버에 새로운 메뉴명이 추가될 수 있도록 요청한다.
// - [O] 서버에 카테고리별 메뉴 리스트를 불러온다.
// - [O] 서버에 메뉴가 수정될 수 있도록 요청한다.
// - [O] 서버에 메뉴의 품절 상태가 토글 될 수 있도록 요청한다.
// - [O] 서버에 메뉴가 삭제 될 수 있도록 요청한다.

const BASE_URL = 'http://localhost:3000/api';

const MenuApi = {
  async getAllMenuByCategory(category) {
    const response = await fetch(`${BASE_URL}/category/${category}/menu`)
    return response.json();
  },

  async createMenu(category, name) {
    const response = await fetch(`${BASE_URL}/category/${category}/menu`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });
    if (!response.ok) {
      console.error('에러가 발생했습니다.');
    }
  },

  async updateMenu(category, name, menuId) {
    const response = await fetch(`${BASE_URL}/category/${category}/menu/${menuId}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });
    if (!response.ok) {
      console.error('에러가 발생 했습니다.');
    }
    return response.json();
  },

  async toggleSoldOutMenu(category, menuId) {
    const response = await fetch(`${BASE_URL}/category/${category}/menu/${menuId}/soldout`, {
      method: 'PUT',
    });
    if (!response.ok) {
      console.error('에러가 발생 했습니다.');
    }
  },

  async deletMenu(category, menuId) {
    const response = await fetch(`${BASE_URL}/category/${category}/menu/${menuId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      console.error('에러가 발생 했습니다.');
    }
  },
};

function App() {
  this.menu = {
    espresso: [],
    frappuccino: [],
    blended: [],
    teavana: [],
    desert: [],
  };
  this.currentCategory = 'espresso';
  this.init = async () => {
    this.menu[this.currentCategory] = await MenuApi.getAllMenuByCategory(
      this.currentCategory
    );
    render();
    initEventListeners();
  };

  const render = () => {
    const template = this.menu[this.currentCategory].map((menuItem, index) => {
      return `
        <li data-menu-id="${menuItem.id}" class="menu-list-item d-flex items-center py-2">
          <span class="w-100 pl-2 menu-name ${menuItem.isSoldOut ? 'sold-out' : ''}">${menuItem.name}</span>
          <button
          type="button"
          class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button"
          >
          품절
          </button>
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
    const menuCount = this.menu[this.currentCategory].length;
    $('.menu-count').innerText = `총 ${menuCount} 개`;
  };

  const addMenuName = async () => {
    if ($('#menu-name').value === ''){
      alert('값을 입력해주세요.');
      return;
    }
    const menuName = $('#menu-name').value;
    await MenuApi.createMenu(this.currentCategory, menuName); //메뉴 추가
    this.menu[this.currentCategory] = await MenuApi.getAllMenuByCategory(
      this.currentCategory
    ); //전체 메뉴 리스트 불러오기
    render();
    $('#menu-name').value = '';
  };

  const updateMenuName = async (e) => {
    const menuId = e.target.closest("li").dataset.menuId;
    const $menuName = e.target.closest('li').querySelector('.menu-name');
    const updatedMenuName = prompt('메뉴명을 수정하세요.', $menuName.innerText);
    await MenuApi.updateMenu(this.currentCategory, updatedMenuName, menuId);
    this.menu[this.currentCategory] = await MenuApi.getAllMenuByCategory(
      this.currentCategory
    );
    render();
  };

  const removeMenuName = async (e) => {
    if (confirm('정말 삭제하시겠습니다?')) {
      const menuId = e.target.closest("li").dataset.menuId;
      await MenuApi.deletMenu(this.currentCategory, menuId);
      this.menu[this.currentCategory] = await MenuApi.getAllMenuByCategory(
        this.currentCategory
      );
      render();
    };
  };

  const soldOutMenu = async (e) => {
    const menuId = e.target.closest("li").dataset.menuId;
    await MenuApi.toggleSoldOutMenu(this.currentCategory, menuId);
    this.menu[this.currentCategory] = await MenuApi.getAllMenuByCategory(
      this.currentCategory
    );
    render();
  };

  const initEventListeners = () => {
    $('#menu-list').addEventListener('click', (e) => {
      if (e.target.classList.contains('menu-edit-button')) {
        updateMenuName(e);
        return; //if문이 여러개 있는 경우, 조건이 충족하여 다음 조건문 실행이 필요 없는 경우에 추가하면 불필요한 연산이 줄어듬
      }
  
      if (e.target.classList.contains('menu-remove-button')) {
        removeMenuName(e);
        return;
      }
  
      if (e.target.classList.contains('menu-sold-out-button')) {
        soldOutMenu(e);
        return;
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
  
    $('nav').addEventListener('click', async (e) => {
      const isCategoryButton = e.target.classList.contains('cafe-category-name')
      if (isCategoryButton) {
        const categoryName = e.target.dataset.categoryName;
        this.currentCategory = categoryName;
        $('#category-title').innerText = `${e.target.innerText} 메뉴 관리`;
        this.menu[this.currentCategory] = await MenuApi.getAllMenuByCategory(
          this.currentCategory
        );
        render();
      }
    });
  };
}

const app = new App();
app.init();