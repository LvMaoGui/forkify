import View from './view';
import icons from 'url:../../img/icons.svg'; // parcel v2

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');

  _message = '食谱已上传成功~ :)'

  _window = document.querySelector('.add-recipe-window');

  _overlay = document.querySelector('.overlay');

  _btnOpen = document.querySelector('.nav__btn--add-recipe');

  _closeOpen = document.querySelector('.btn--close-modal');

  constructor() {
    super();

    this._addHandlerShowWindow();
    this._addHandlerHiddemWindow();
  }

  toggleWindow() {
    debugger;
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }

  _addHandlerHiddemWindow() {
    this._closeOpen.addEventListener('click', this.toggleWindow.bind(this));
    // 点击遮罩层退出
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)]
      const data = Object.fromEntries(dataArr)
      console.log(data)
      handler(data)
    });
  }

  _generateMarkup() {}
}

export default new AddRecipeView();
