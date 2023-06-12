import View from './view';
import PreviewView from './previewView';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = '没有找到你查找的食谱，请重试';
  _message = '';

  _generateMarkup() {
    const markup = this._data.map(result => PreviewView.render(result, false)).join('');
    return markup;
  }
}

export default new ResultsView();
