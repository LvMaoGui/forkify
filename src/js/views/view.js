import icons from 'url:../../img/icons.svg'; // parcel v2

class View {
  _data;
  render(data) {
    if(!data || (Array.isArray(data) && data.length === 0)) return this.renderError()

    this._data = data;
    const markup = this._generateMarkup();
    // 将容器中的内容清空
    this._clear();
    // 将html脚本插入容器中进行渲染
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
  }

  renderError(message = this._errorMessage) {
    const markup = `
      <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = `
      <div class="message">
        <div>
          <svg>
            <use href="${icons}#icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  
  renderSpinner() {
    const markup = `
      <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>
    `;
    // 先清空内容
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}

export default View