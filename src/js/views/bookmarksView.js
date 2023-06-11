import View from './view';
import PreviewView from './previewView';
import icons from 'url:../../img/icons.svg'; // parcel v2

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = '还未收藏食谱，立即添加一个你喜欢的食谱到收藏吧 ;)';
  _message = '';

  _generateMarkup() {
    const markup = this._data.map(bookmark => PreviewView.render(bookmark, false)).join('');
    return markup;
  }

}

export default new BookmarksView();
