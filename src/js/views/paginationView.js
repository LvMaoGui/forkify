import View from './view';
import icons from 'url:../../img/icons.svg'; // parcel v2

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  _generateMarkup() {
    debugger
    // 当前显示页
    const curPage = this._data.page;
    // 总页数
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // 处于第一页，还有其他页
    if (curPage === 1 && numPages > 1) {
      return this._generateMarkupButton(null, curPage + 1);
    }
    // 处于第一页，没有其他页
    if (curPage === 1 && numPages <= 1) {
      return this._generateMarkupButton();
    }
    // 最后一页
    if (curPage === numPages && numPages > 1) {
      return this._generateMarkupButton(curPage - 1);
    }
    // 其他页面
    if (curPage < numPages) {
      return this._generateMarkupButton(curPage - 1,curPage + 1);
    }
  }

  _generateMarkupButton(left, rigth){
    if(left && rigth){
      return `
      <button data-goto="${left}" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${left}</span>
      </button>
      <button data-goto="${rigth}" class="btn--inline pagination__btn--next">
          <span>Page ${rigth}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
      </button>
      `
    }
    if(left && !rigth){
      return `
      <button data-goto="${left}" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${left}</span>
      </button>
      `
    }
    if(!left && rigth){
      return `
      <button data-goto="${rigth}" class="btn--inline pagination__btn--next">
        <span>Page ${rigth}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
    </button>
      `
    }
    return ''
  }

  addHandlerClick(handler){
    // 将点击事件监听注册到父元素上 使用事件委托来执行
    this._parentElement.addEventListener('click',function(event){
      // 获取到触发点击事件的按钮 触发源又可能是btn元素的子元素 此处需要使用closest来匹配
      const btn = event.target.closest('.btn--inline');
      if(!btn) return
      const goToPage  = +btn.dataset.goto;
      handler(goToPage)
    })
  }
}

export default new PaginationView();
