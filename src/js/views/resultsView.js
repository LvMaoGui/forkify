import View from './view';
import icons from 'url:../../img/icons.svg'; // parcel v2

class ResultsView extends View{
  _parentElement = document.querySelector('.results')
  _errorMessage = '没有找到你查找的食谱，请重试'
  _message = ''

  _clear(){
    this._parentElement.innerHTML = ''
  }

  _generateMarkup(){
    const markup = this._data.map(this._generateMarkupPreview).join('');
    return markup
  }

  _generateMarkupPreview(result){
    return `
      <li class="preview">
        <a class="preview__link preview__link--active" href="#${result.id}">
          <figure class="preview__fig">
            <img src="${result.image}" alt="${result.title}" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${result.title}</h4>
            <p class="preview__publisher">${result.publisher}</p>
            <div class="preview__user-generated">
              <svg>
                <use href="${icons}#icon-user"></use>
              </svg>
            </div>
          </div>
        </a>
      </li>
    `
  }
}

export default new ResultsView()