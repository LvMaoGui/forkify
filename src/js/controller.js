import * as model from './model';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultsView from './views/resultsView';
import bookmarksView from './views/bookmarksView';
import paginationView from './views/paginationView';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');

if (module.hot) {
  module.hot.accept();
}

// https://forkify-api.herokuapp.com/v2

const controlRecipes = async function () {
  try {
    // 获取地址中的哈希值
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();
    resultsView.update(model.getSearchResultsPage());
    bookmarksView.update(model.state.bookmarks);

    // 1.加载配方
    await model.loadRecipe(id);
    console.log(model.state.recipe);
    const { recipe } = model.state;
    // 2.渲染配方
    recipeView.render(recipe);
  } catch (error) {
    recipeView.renderMessage();
  }
};

const controlSearchResults = async function () {
  try {
    // 1.获取查询信息
    const query = searchView.getQuery();
    if (!query) return;
    resultsView.renderSpinner();
    // 2.根据查询信息请求数据并存入model的state中
    await model.loadSearchResults(query);
    // 3.渲染结果
    console.log(model.state.search.result);
    resultsView.render(model.getSearchResultsPage());

    // 4.渲染初始分页按钮
    paginationView.render(model.state.search);
  } catch (error) {
    console.error(error.message);
  }
};

const controlPagination = function (goToPage) {
  // 1.渲染新的结果
  resultsView.render(model.getSearchResultsPage(goToPage));
  // 4.渲染新的分页按钮
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // 1.更新用餐人数到状态
  model.updateServings(newServings);
  // 2.更新食谱视图
  // recipeView.render(model.state.recipe)
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // 1.添加/删除 收藏
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else {
    model.deleteBookmark(model.state.recipe.id);
  }

  // 2.更新食谱视图
  recipeView.update(model.state.recipe);

  //3.渲染到收藏食谱视图
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

// 为窗体的哈希值变化与加载事件 注册监听
const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};
init();
